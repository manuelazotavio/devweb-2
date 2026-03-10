const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const listar = require('../controllers/metrica/listar');
const buscarPorId = require('../controllers/metrica/buscarPorId');
const criar = require('../controllers/metrica/criar');
const atualizar = require('../controllers/metrica/atualizar');
const remover = require('../controllers/metrica/remover');

const router = express.Router();

router.use(autenticar);

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', remover);

module.exports = router;
