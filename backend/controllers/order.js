const OrderService = require('../services/order');

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
        throw new Error('unknown status');
    }
    res.json(resObj);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const approveOrder = async (req, res, next) => {
  try {
    const { id: orderID } = req.params;
    await OrderService.approveOrder(orderID);

    res.json({ msg: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const rejectOrder = async (req, res, next) => {
  try {
    const { id: orderID } = req.params;
    await OrderService.rejectOrder(orderID);

    res.json({ msg: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getOrderHistory,
  approveOrder,
  rejectOrder,
};
