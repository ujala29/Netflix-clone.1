import express from 'express'
import { getTrendingTv, getTvTrailer, getTvDetails, getsimilarTv, getTvcategory } from '../controllers/tv.controller.js'
const router = express.Router()
router.get('/trending', getTrendingTv)
router.get('/:id/trailer', getTvTrailer);
router.get('/:id/details', getTvDetails);
router.get('/:id/similar', getsimilarTv);

router.get('/:cateorgy', getTvcategory);

export default router;
