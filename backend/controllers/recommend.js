const RecommendService = require('../services/recommend');

const getPopularProducts = async (req, res, next) => {
  try {
    const popularProducts = await RecommendService.getPopularProducts();

    res.status(200).json({
      status: 'ok',
      message: '실시간 인기 상품 조회 성공',
      result: popularProducts,
    });
  } catch (err) {
    next(err);
  }
};

const getRelatedProducts = async (req, res, next) => {
  try {
    const { id: productID } = req.params;

    const relatedProducts = await RecommendService.getRelatedProducts(
      productID
    );

    res
      .status(200)
      .json({
        status: 'ok',
        message: '연관 상품 조회 성공',
        result: relatedProducts,
      });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPopularProducts, getRelatedProducts };
