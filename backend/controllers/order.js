const OrderService = require('../services/order');
const { HTTP400Error } = require('../utils/errors');

const getOrderHistory = async (req, res, next) => {
  try {
    const { status } = req.query;
    const { id: userID } = req.decoded;

    let resObj = null;
    switch (status) {
      case 'sale': {
        const productsOnSale = await OrderService.getSaleHistory(userID);
        resObj = { products: productsOnSale };
        break;
      }
      case 'purchased': {
        const purchaseHistory = await OrderService.getPurchaseHistory(userID);
        resObj = { infos: purchaseHistory };
        break;
      }
      case 'pending': {
        const [orders, products] = await OrderService.getPendingHistory(userID);
        resObj = { orders: orders, products: products };
        break;
      }
      default:
        next(new HTTP400Error('알 수 없는 쿼리 값입니다'));
    }
    res.status(200).json(resObj);
  } catch (err) {
    next(err);
  }
};

const approveOrder = async (req, res, next) => {
  try {
    const { id: orderID } = req.params;
    await OrderService.approveOrder(orderID);

    res.status(200).json({ status: 'ok', message: 'success' });
  } catch (err) {
    next(err);
  }
};

const rejectOrder = async (req, res, next) => {
  try {
    const { id: orderID } = req.params;
    await OrderService.rejectOrder(orderID);

    res.status(200).json({ status: 'ok', message: 'success' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrderHistory,
  approveOrder,
  rejectOrder,
};
