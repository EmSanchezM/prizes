import { number, object, string, TypeOf } from "zod";

const payload = {
    body: object({

        name: string({
            required_error: 'Nombre es requerido'
        }).min(2, { message: 'Debe tener 2 o más caracteres' }),

        description: string({
            invalid_type_error: 'La descripcion debe de ser un string'
        })
        .min(2, { message: 'Debe tener 2 o más caracteres' })
        .optional(),

        points: number({
            required_error: 'Número de puntos es requerido'
        }).min(1, { message: 'Debe tener 1 o más puntos' }),
    })
};

const updatePayload = {
    body: object({

        name: string({
            invalid_type_error: 'El nombre debe de ser un string'
        }),

        description: string({
            invalid_type_error: 'La descripcion debe de ser un string'
        }).optional(),

        points: number({
            invalid_type_error: 'Los puntos debe de ser un number'
        })
        .min(1, { message: 'Debe tener 1 o más puntos' })
        .optional()      
    })
};

const assignPrizePayload = {
    body: object({
        userId: string({
            required_error: 'User ID es requerido'
        }),
    })
};

const params = {
    params: object({
        prizeId: string({
            required_error: 'Premio ID es requerido'
        }),
    }),
};

export const createPrizeSchema = object({
    ...payload
});

export const getPrizeSchema = object({
    ...params
});

export const updatePrizeSchema = object({
    ...updatePayload,
    ...params
});

export const assignPrizeSchema = object({
    ...assignPrizePayload,
    ...params
});

export const deletePrizeSchema = object({
    ...params
});

export type CreatePrizeInput = TypeOf<typeof createPrizeSchema>;
export type UpdatePrizeInput = TypeOf<typeof updatePrizeSchema>;
export type ReadPrizeInput = TypeOf<typeof getPrizeSchema>;
export type DeletePrizeInput = TypeOf<typeof deletePrizeSchema>;
export type AssignPrizeInput = TypeOf<typeof assignPrizeSchema>;