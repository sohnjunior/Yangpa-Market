import { getRepository } from 'typeorm';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { User } from '../models/user';
import * as CartService from './cart.service';

const getSaleHistory = async (userId: number) => {
  try {
    const productRepository = getRepository(Product);

    const productsOnSale = await productRepository.find({
      where: { sellerId: userId },
      relations: ['photos', 'category'],
    });

    return productsOnSale;
  } catch (err) {
    throw err;
  }
};

const getPurchaseHistory = async (userId: number) => {
  try {
    const orderRepository = getRepository(Order);

    const approvedOrders = await orderRepository.find({
      where: { buyerId: userId, isApproved: true },
      relations: [
        'product',
        'product.seller',
        'product.photos',
        'product.category',
      ],
    });
    const pendingOrders = await orderRepository.find({
      where: { buyerId: userId, isApproved: false },
      relations: [
        'product',
        'product.seller',
        'product.photos',
        'product.category',
      ],
    });

    return { pendingOrders, approvedOrders };
  } catch (err) {
    throw err;
  }
};

const getOrderRequestHistory = async (userId: number) => {
  try {
    const productRepository = getRepository(Product);
    const orderRepository = getRepository(Order);

    const productsSaleByUser = await productRepository.find({
      sellerId: userId,
      isSold: false,
    });

    const pendingOrders: Order[] = [];
    for (const product of productsSaleByUser) {
      const orders = await orderRepository.find({
        where: { productId: product.id, isApproved: false },
        relations: ['buyer', 'product'],
      });
      pendingOrders.push(...orders);
    }

    return pendingOrders;
  } catch (err) {
    throw err;
  }
};

const createOrder = async (targetProductIds: number[], buyerEmail: string) => {
  try {
    const orderRepository = getRepository(Order);
    const userRepository = getRepository(User);

    const buyer = await userRepository.findOneOrFail({ email: buyerEmail });

    const orders = targetProductIds.map((productId: number) =>
      orderRepository.create({
        productId,
        buyer,
      })
    );

    orderRepository.save(orders);

    const cartProductDeletionPromises = targetProductIds.map(
      (productId: number) => CartService.deleteCartProduct(buyer.id, productId)
    );

    await Promise.all(cartProductDeletionPromises);
  } catch (err) {
    throw err;
  }
};

const approveOrder = async (orderId: number) => {
  try {
    const productRepository = getRepository(Product);
    const orderRepository = getRepository(Order);

    const requestedOrder = await orderRepository.findOneOrFail({
      select: ['id', 'isApproved', 'productId'],
      where: { id: orderId },
    });

    // TODO: 트랜잭션 적용
    await Promise.all([
      productRepository.update(requestedOrder.productId, { isSold: true }),
      orderRepository.update(requestedOrder.id, { isApproved: true }),
    ]);
  } catch (err) {
    throw err;
  }
};

const rejectOrder = async (orderId: number) => {
  try {
    const orderRepository = getRepository(Order);

    await orderRepository.softDelete(orderId);
  } catch (err) {
    throw err;
  }
};

const deleteOrder = async (orderId: number) => {
  try {
    const orderRepository = getRepository(Order);

    await orderRepository.softDelete(orderId);
  } catch (err) {
    throw err;
  }
};

export {
  getSaleHistory,
  getPurchaseHistory,
  getOrderRequestHistory,
  createOrder,
  approveOrder,
  rejectOrder,
  deleteOrder,
};
