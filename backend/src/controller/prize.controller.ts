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
    findPrize
} from "../services/prize.service";

import { findUser } from "../services/user.service";
import logger from "../utils/logger";

export async function createPrizeHandler(
    req: Request<{}, {}, CreatePrizeInput["body"]>,
    res: Response
) {
    try {

        const prize = await createPrize(req.body);

        return res.status(201).json({
            ok: true,
            prize,
            message: 'Prize created successfully'
        });

    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

export async function findPrizesHandler(req: Request, res: Response) {
    try {
        const prizes = await findPrizes();
        return res.status(200).json({
            ok: true,
            prizes
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
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
            return res.status(404).json({
                ok: false,
                message: 'Prize not found'
            });
        }

        return res.status(200).json({
            ok: true,
            prize
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
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
            return res.status(404).json({
                ok: false,
                message: 'Prize not found'
            });
        }

        await updatePrize(prizeId, req.body);

        return res.status(200).json({
            ok: true,
            message: 'Prize updated successfully'
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
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
            return res.status(404).json({
                ok: false,
                message: 'Prize not found'
            });
        }

        await deletePrize(prize._id);

        return res.status(200).json({
            ok: true,
            message: 'Prize deleted successfully',
            prize
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
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
        const user = await findUser(req.body);

        if (!prize) {
            return res.status(404).json({
                ok: false,
                message: 'Prize not found'
            });
        }

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'User not found'
            });
        }

        if (prize.points > user.accumulatedPoints) {
            return res.status(400).json({
                ok: false,
                message: 'No tienes suficientes puntos acumulados'
            });
        }

        await assignPrize(user, prize);

        return res.status(200).json({
            ok: true,
            message: 'Assigned Prize successfully'
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message
        });
    }
}