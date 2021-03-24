import { User } from '../models/user';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { getRepository, Like } from 'typeorm';
import * as PhotoService from './photo.service';

const createProduct = async (
  userID: number,
  categoryType: string,
  productName: string,
  description: string,
  price: number,
  photoNames: string[]
) => {
  try {
    const categoryRepository = getRepository(Category);
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    const category = await categoryRepository.findOneOrFail({
      type: categoryType,
    });
    const seller = await userRepository.findOneOrFail({ id: userID });
    const productPhotos = PhotoService.createPhotos(photoNames);
    const product = productRepository.create({
      name: productName,
      description,
      price,
      seller,
      category,
      photos: productPhotos,
    });

    await productRepository.save(product);
  } catch (err) {
    throw err;
  }
};

const getAllProducts = async (category: string, skip: number, take: number) => {
  try {
    const categoryRepository = getRepository(Category);
    const productRepository = getRepository(Product);

    const targetCategory = await categoryRepository.findOneOrFail({
      type: category,
    });
    const [products, count] = await productRepository.findAndCount({
      where: { categoryId: targetCategory.id },
      relations: ['seller', 'photos', 'category'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });

    return [products, count];
  } catch (err) {
    throw err;
  }
};

const getProduct = async (productId: number) => {
  try {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOneOrFail({
      where: { id: productId },
      relations: ['seller', 'category', 'photos'],
    });

    productRepository.increment({ id: productId }, 'views', 1);

    return product;
  } catch (err) {
    throw err;
  }
};

const updateProduct = async (
  productId: number,
  options: {
    name: string;
    price: number;
    description: string;
    category: string;
    photoNames: string[];
  }
) => {
  try {
    const productRepository = getRepository(Product);
    const categoryRepository = getRepository(Category);

    const productExists = await productRepository.findOneOrFail({
      id: productId,
    });
    const category = await categoryRepository.findOneOrFail({
      type: options.category,
    });

    await PhotoService.deletePhotos(productId);
    const productPhotos = PhotoService.createPhotos(options.photoNames);
    await productRepository.save({
      ...productExists,
      name: options.name,
      price: options.price,
      description: options.description,
      category,
      photos: productPhotos,
    });
  } catch (err) {
    throw err;
  }
};

const deleteProduct = async (productId: number) => {
  try {
    const productRepository = getRepository(Product);

    await productRepository.softDelete(productId);
  } catch (err) {
    throw err;
  }
};

const searchProductsWithKeyword = async (
  keyword: string,
  skip: number,
  take: number
) => {
  try {
    const productRepository = getRepository(Product);

    const [products, totalCount] = await productRepository.findAndCount({
      where: { name: Like(`%${keyword}%`) },
      relations: ['seller', 'category', 'photos'],
      skip,
      take,
    });

    return [products, totalCount];
  } catch (err) {
    throw err;
  }
};

const increaseLikeOfProduct = async (productID: number) => {
  try {
    const productRepository = getRepository(Product);

    await productRepository.increment({ id: productID }, 'likes', 1);
  } catch (err) {
    throw err;
  }
};

export {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProductsWithKeyword,
  increaseLikeOfProduct,
};
