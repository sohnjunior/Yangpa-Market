const OrderService = require('../services/order');

const getSalesHistory = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const productsOnSale = await OrderService.getSaleProducts(userID);

    res.json({ products: productsOnSale });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getPurchases = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const purchaseHistory = await OrderService.getPurchaseHistory(userID);

    res.json({ infos: purchaseHistory });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getPurchaseRequests = async (req, res, next) => {
  try {
    const { id: userID } = req.decoded;
    const [orders, productInfos] = await OrderService.getPendingPurchases(
      userID
    );

    res.json({ orders: orders, products: productInfos });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const approvePurchase = async (req, res, next) => {
  try {
    const { postId } = req.body;
    await OrderService.approvePurchase(postId);

    res.json({ msg: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const rejectPurchase = async (req, res, next) => {
  try {
    const { id: orderID } = req.params;
    await OrderService.rejectPurchase(orderID);

    res.json({ msg: 'success' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getSalesHistory,
  getPurchases,
  getPurchaseRequests,
  approvePurchase,
  rejectPurchase,
};
