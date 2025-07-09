import express, { Router } from 'express';

import{searchMovies,searchPerson,searchTv,getsearchHistory ,removeitemfromSearchHistory} from '../controllers/search.controller.js';

 const router = express.Router();

router.get('/person/:query',searchPerson);
router.get('/movie/:query',searchMovies);
router.get('/tv/:query',searchTv);
router.get('/history',getsearchHistory);
router.delete('/history/:id',removeitemfromSearchHistory);
export default router;
