import express from 'express';
import {
  getBoletas,
  getBoletaById,
  createBoleta,
//   updateBoleta,
//   deleteBoleta
} from '../controllers/boleta.controller.js';

const router = express.Router();

router.get('/getBoletas', getBoletas);
router.get('/getBoletaById/:id', getBoletaById);
router.post('/createBoleta', createBoleta);
// router.put('/:id', updateBoleta);
// router.delete('/:id', deleteBoleta);

export default router;