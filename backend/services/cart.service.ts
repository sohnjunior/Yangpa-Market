import { getRepository } from 'typeorm';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

const addProductToCart = async (userId: number, productID: number) => {
  try {
    const cartRepository = getRepository(Cart);
    const productRepository = getRepository(Product);

    const [cart, product] = await Promise.all([
      cartRepository.findOne({
        where: { ownerId: userId },
        relations: ['products'],
      }),
      productRepository.findOne({ id: productID }),
    ]);

    if (!cart) throw new Error('존재하지 않는 장바구니입니다.');
    if (!product) throw new Error('존재하지 않는 상품입니다.');

    cart.products.push(product);
    await cartRepository.save(cart);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCartProducts = async (userId: number) => {
  try {
    const cartRepository = getRepository(Cart);

    const cart = await cartRepository.findOneOrFail({
      where: { ownerId: userId },
      relations: ['products', 'products.photos', 'products.category'],
    });
    const cartProducts = cart.products;

    return cartProducts;
  } catch (err) {
    throw err;
  }
};

const deleteCartProduct = async (userId: number, productId: number) => {
  try {
    const cartRepository = getRepository(Cart);

    const cart = await cartRepository.findOneOrFail({
      where: { ownerId: userId },
      relations: ['products'],
    });

    cart.products = cart.products.filter((product) => product.id !== productId);
    await cartRepository.save(cart);
  } catch (err) {
    throw err;
  }
};

export { addProductToCart, getCartProducts, deleteCartProduct };
