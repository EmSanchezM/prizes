import { Router } from 'express';
import validateResource from '../middleware/validateResource';

import {
    createPrizeHandler,
    updatePrizeHandler,
    deletePrizeHandler,
    findPrizeHandler,
    findPrizesHandler,
    assignPrizeUserHandler,
} from '../controller/prize.controller';

import { 
    createPrizeSchema,
    updatePrizeSchema,
    deletePrizeSchema,
    assignPrizeSchema,
    getPrizeSchema
} from '../schema/prize.schema';

const router = Router();

router.get('/api/prizes', findPrizesHandler);
router.get('/api/prizes/:prizeId', validateResource(getPrizeSchema), findPrizeHandler);
router.post('/api/prizes', validateResource(createPrizeSchema), createPrizeHandler);
router.put('/api/prizes/:prizeId', validateResource(updatePrizeSchema), updatePrizeHandler);
router.put('/api/prizes/:prizeId/users', validateResource(assignPrizeSchema), assignPrizeUserHandler);
router.delete('/api/prizes/:prizeId', validateResource(deletePrizeSchema), deletePrizeHandler);

export default router;