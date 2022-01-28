import { Router } from 'express';
import user from './user.routes';
import session from './session.routes';
import prizes from './prizes.routes';

const router = Router();

router.use(user);
router.use(session);
router.use(prizes);

export default router;