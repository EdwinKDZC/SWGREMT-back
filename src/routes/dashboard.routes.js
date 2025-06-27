import { Router } from 'express';
import {
  getTopSelling,
  getRecentStockAdds,
  getMonthlyEarnings
} from '../controllers/dashboardController.js';

const router = Router();

router.get('/top-selling', getTopSelling);
router.get('/recent-stock', getRecentStockAdds);
router.get('/monthly-earnings', getMonthlyEarnings);

export default router;
