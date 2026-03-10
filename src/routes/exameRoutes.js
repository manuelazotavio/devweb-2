const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const listar = require('../controllers/exame/listar');
const buscarPorId = require('../controllers/exame/buscarPorId');
const criar = require('../controllers/exame/criar');
const atualizar = require('../controllers/exame/atualizar');
const remover = require('../controllers/exame/remover');
const historico = require('../controllers/exame/historico');

const router = express.Router();

router.use(autenticar);

router.get('/historico', historico);
router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', remover);

module.exports = router;
