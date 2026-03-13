import { Router } from 'express';
import { autenticar } from '../middleware/authMiddleware.js';
import listar from '../controllers/exame/listar.js';
import buscarPorId from '../controllers/exame/buscarPorId.js';
import criar from '../controllers/exame/criar.js';
import atualizar from '../controllers/exame/atualizar.js';
import remover from '../controllers/exame/remover.js';
import historico from '../controllers/exame/historico.js';

const router = Router();

router.use(autenticar);

router.get('/historico', historico);
router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', remover);

export default router;
