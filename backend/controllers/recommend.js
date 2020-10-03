const RecommendService = require('../services/recommend');

const getPopularProducts = async (req, res, next) => {
  const popularProducts = await RecommendService.getPopularProducts();

  res.json({ result: popularProducts });
};

const getRelatedProducts = async (req, res, next) => {
  const { id: productID } = req.params;
  const relatedProducts = await RecommendService.getRelatedProducts(productID);

  res.json({ result: relatedProducts });
};

module.exports = { getPopularProducts, getRelatedProducts };
