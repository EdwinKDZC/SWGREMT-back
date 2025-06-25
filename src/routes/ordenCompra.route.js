// routes/ordenCompra.routes.js
import { Router } from 'express';
import {
  createOrdenCompra,
  getOrdenesCompra,
  updateEstadoPago,
  updateEstadoOrden,
} from '../controllers/ordenCompra.controller.js';

const router = Router();

router.post('/createOrdenCompra', createOrdenCompra);
router.get('/getOrdenesCompra', getOrdenesCompra);
router.put('/updateEstadoPago/:idOrdenCompra', updateEstadoPago);
router.put('/updateEstadoOrden/:idOrdenCompra', updateEstadoOrden);

export default router;
