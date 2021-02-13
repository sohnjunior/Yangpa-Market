import express from 'express';
import * as RecommendationController from '../../controllers/recommendation.controller';

const router = express.Router();

router.get('/', RecommendationController.getPopularProducts);
router.get('/:id', RecommendationController.getRelatedProducts);

export default router;
