import { Router } from 'express';
import registrar from '../controllers/auth/registrar.js';
import login from '../controllers/auth/login.js';
import refresh from '../controllers/auth/refresh.js';
import logout from '../controllers/auth/logout.js';

const router = Router();

router.post('/register', registrar);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
