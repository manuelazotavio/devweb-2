import { Router } from 'express';
import { autenticar } from '../middleware/authMiddleware.js';
import listar from '../controllers/metrica/listar.js';
import buscarPorId from '../controllers/metrica/buscarPorId.js';
import criar from '../controllers/metrica/criar.js';
import atualizar from '../controllers/metrica/atualizar.js';
import remover from '../controllers/metrica/remover.js';

const router = Router();

router.use(autenticar);

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', remover);

export default router;
