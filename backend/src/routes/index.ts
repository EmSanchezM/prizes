import { Router } from 'express';
import user from './user.routes';
import session from './session.routes';

const router = Router();

router.use(user);
router.use(session);

export default router;