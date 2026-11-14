import { Request, Response } from "express";

import {
    CreatePrizeInput,
    ReadPrizeInput,
    UpdatePrizeInput,
    DeletePrizeInput,
    AssignPrizeInput
} from "../schema/prize.schema";
import {
    createPrize,
    updatePrize,
    deletePrize,
    assignPrize,
    findPrizes,
    findPrize,
    findExchanges
} from "../services/prize.service";

import { findUser } from "../services/user.service";
import logger from "../utils/logger";

export async function createPrizeHandler(
    req: Request<{}, {}, CreatePrizeInput["body"]>,
    res: Response
) {
    try {

        const prize = await createPrize(req.body);

        res.status(201).json({
            ok: true,
            prize,
            message: 'Prize created successfully'
        });

    } catch (e: any) {
        logger.error(e);
        res.status(409).send(e.message);
    }
}

export async function findPrizesHandler(req: Request, res: Response) {
    try {
        const prizes = await findPrizes();
        res.status(200).json({
            ok: true,
            prizes
        });
    } catch (error: any) {
        logger.error(error);
        res.status(409).json({
            ok: false,
            message: error.message
        });
    }
}

export async function findExchangesHandler(req: Request, res: Response) {
    try {
        const exchanges = await findExchanges();
        res.status(200).json({
            ok: true,
            exchanges
        });
    } catch (error: any) {
        logger.error(error);
        res.status(409).json({
            ok: false,
            message: error.message
        });
    }
}

export async function findPrizeHandler(req: Request<ReadPrizeInput['params']>, res: Response) {
    try {
        const prizeId = req.params.prizeId;

        const prize = await findPrize(prizeId);

        if (!prize) {
            res.status(404).json({
                ok: false,
                message: 'Prize not found'
            });
            return;
        }

        res.status(200).json({
            ok: true,
            prize
        });
    } catch (error: any) {
        logger.error(error);
        res.status(409).json({
            ok: false,
            message: error.message
        });
    }
}

export async function updatePrizeHandler(
    req: Request<UpdatePrizeInput['params']>,
    res: Response
) {
    try {
        const prizeId = req.params.prizeId;
        const prize = await findPrize(prizeId);

        if (!prize) {
            res.status(404).json({
                ok: false,
                message: 'Prize not found'
            });
            return;
        }

        await updatePrize(prizeId, req.body);

        res.status(200).json({
            ok: true,
            message: 'Prize updated successfully'
        });

    } catch (error: any) {
        logger.error(error);
        res.status(409).json({
            ok: false,
            message: error.message
        });
    }
}

export async function deletePrizeHandler(
    req: Request<DeletePrizeInput['params']>,
    res: Response
) {
    try {
        const prizeId = req.params.prizeId;
        const prize = await findPrize(prizeId);

        if (!prize) {
            res.status(404).json({
                ok: false,
                message: 'Prize not found'
            });
            return;
        }

        await deletePrize(prize._id);

        res.status(200).json({
            ok: true,
            message: 'Prize deleted successfully',
            prize
        });

    } catch (error: any) {
        logger.error(error);
        res.status(409).json({
            ok: false,
            message: error.message
        });
    }
}

export async function assignPrizeUserHandler(
    req: Request<AssignPrizeInput['params']>,
    res: Response
) {
    try {
        const prizeId = req.params.prizeId;
        const prize = await findPrize(prizeId);
        const { userId } = req.body;
        const user = await findUser(userId);

        if (!prize) {
            res.status(404).json({
                ok: false,
                message: 'Prize not found'
            });
            return;
        }

        if (!user) {
            res.status(404).json({
                ok: false,
                message: 'User not found'
            });
            return;
        }

        if (prize.points > user.accumulatedPoints) {
            res.status(400).json({
                ok: false,
                message: 'No tienes suficientes puntos acumulados'
            });
            return;
        }

        await assignPrize(user, prize);

        res.status(200).json({
            ok: true,
            message: 'Assigned Prize successfully'
        });

    } catch (error: any) {
        logger.error(error);
        res.status(409).json({
            ok: false,
            message: error.message
        });
    }
}