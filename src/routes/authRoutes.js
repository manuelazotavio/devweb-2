const express = require('express');
const registrar = require('../controllers/auth/registrar');
const login = require('../controllers/auth/login');
const refresh = require('../controllers/auth/refresh');
const logout = require('../controllers/auth/logout');

const router = express.Router();

router.post('/register', registrar);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;
