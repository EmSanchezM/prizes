import { Router } from 'express';
import validateResource from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';

import {
    createUserSessionHandler,
    getUserSessionsHandler,
    deleteSessionHandler,
} from '../controller/session.controller';

import { 
    createSessionSchema
} from '../schema/session.schema';

const router = Router();

router.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

router.get("/api/sessions", requireUser, getUserSessionsHandler);

router.delete("/api/sessions", requireUser, deleteSessionHandler);

export default router;
