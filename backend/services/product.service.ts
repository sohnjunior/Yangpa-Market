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

const getAllProducts = async () => {
  try {
    const productRepository = getRepository(Product);
    const products = await productRepository.find({
      relations: ['seller', 'photos', 'category'],
      order: {
        createdAt: 'DESC',
      },
    });

    return products;
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
  options: { name: string; price: number; description: string }
) => {
  try {
    const productRepository = getRepository(Product);

    await productRepository.update(productId, options);
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

const searchProductsWithKeyword = async (keywords: string[]) => {
  try {
    const productSet = new Map<number, Product>();
    const productRepository = getRepository(Product);

    for (const keyword of keywords) {
      const products = await productRepository.find({
        where: { name: Like(keyword) },
        relations: ['category', 'photos'],
      });

      for (const product of products) {
        if (!productSet.has(product.id)) productSet.set(product.id, product);
      }
    }

    const serialized: Product[] = [...productSet.values()];

    return serialized;
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
