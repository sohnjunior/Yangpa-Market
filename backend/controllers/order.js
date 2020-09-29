const OrderService = require('../services/order');

const getSalesHistory = async (req, res, next) => {
  try {
    const { email } = req.query;
    const productsOnSale = await OrderService.getSaleProducts(email);

    res.json({ products: productsOnSale });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getPurchases = async (req, res, next) => {
  try {
    const { email } = req.query;
    const purchaseHistory = await OrderService.getPurchaseHistory(email);

    res.json({ infos: purchaseHistory });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getPurchaseRequests = async (req, res, next) => {
  try {
    const { email } = req.query;

    const [orders, productInfos] = await OrderService.getPendingPurchases(
      email
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
    const { id } = req.params;
    await OrderService.rejectPurchase(id);

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
