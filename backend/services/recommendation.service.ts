import { getRepository, MoreThan, Not } from 'typeorm';
import { Product } from '../models/product';

/** 관련 상품 최대 개수 */
const RELATED_LIMIT = 5;

interface IScoreMappedProduct {
  score: number;
  product: Product;
}

const getPopularProducts = async () => {
  try {
    const productRepository = getRepository(Product);
    const pivotDate = new Date(new Date().setHours(0, 0, 0, 0));
    const products = await productRepository.find({
      where: {
        createdAt: MoreThan(pivotDate),
      },
      relations: ['category', 'photos'],
      order: {
        views: 'DESC',
        likes: 'DESC',
      },
      take: 10,
    });

    return products;
  } catch (err) {
    throw err;
  }
};

const getRelatedProducts = async (productId: number) => {
  try {
    const productRepository = getRepository(Product);

    const pivotProduct = await productRepository.findOneOrFail({
      select: ['id', 'categoryId'],
      where: { id: productId },
    });
    const candidates = await productRepository.find({
      where: { id: Not(pivotProduct.id), categoryId: pivotProduct.categoryId },
      relations: ['category', 'photos'],
    });

    /** 조회수 및 좋아요를 기준으로 점수 계산 */
    const scoreMapProducts: IScoreMappedProduct[] = [];
    candidates.forEach((product) => {
      let score = 0.6 * product.likes + 0.4 * product.views;
      score = Math.round(score * 1e2) / 1e2;
      scoreMapProducts.push({ score, product });
    });

    /** 점수 높은 순으로 정렬 후 상위 n개 반환 */
    scoreMapProducts
      .sort((a, b) => b.score - a.score)
      .splice(RELATED_LIMIT - 1);

    return scoreMapProducts;
  } catch (err) {
    throw err;
  }
};

export { getPopularProducts, getRelatedProducts };
