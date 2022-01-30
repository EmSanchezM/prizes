import { Router } from 'express';
import validateResource from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';

import {
    createAdminHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    assignPointsUserHandler, 
    findUsersHandler,
    findUserHandler
} from '../controller/user.controller';

import { 
    createUserSchema,
    updateUserSchema,
    assignPointsUserSchema,
    deleteUserSchema,
    getUserSchema
} from '../schema/user.schema';

const router = Router();

router.get('/api/users', requireUser, findUsersHandler);
router.get('/api/users/:userId', validateResource(getUserSchema), findUserHandler);
router.post('/api/users', validateResource(createUserSchema), createUserHandler);
router.post('/api/admin/users', validateResource(createUserSchema), createAdminHandler);
router.put('/api/users/:userId', validateResource(updateUserSchema), updateUserHandler);
router.put('/api/users/:userId/points', validateResource(assignPointsUserSchema), assignPointsUserHandler);
router.delete('/api/users/:userId', validateResource(deleteUserSchema), deleteUserHandler);

export default router;