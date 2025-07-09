import express from 'express'
import { getTrendingmovie ,getmovieTrailer,getmovieDetails,getsimilarmovies,getmoviescategory} from '../controllers/movie.controller.js'
const router = express.Router()
router.get('/trending',getTrendingmovie)
router.get('/:id/trailer',getmovieTrailer);
router.get('/:id/details',getmovieDetails);
router.get('/:id/similar',getsimilarmovies);

router.get('/:cateorgy',getmoviescategory);

export default router;
