import { number, object, string, TypeOf } from "zod";

const payload = {
    body: object({

        name: string({
            required_error: 'Nombre es requerido'
        }).min(2, { message: 'Debe tener 2 o más caracteres' }),

        lastName: string({
            required_error: 'Apellido es requerido'
        }).min(2, { message: 'Debe tener 2 o más caracteres' }),

        phoneNumber: string({
            required_error: 'Número de telefono es requerido'
        }).min(8, { message: 'Debe tener 8 o más caracteres' }),

        birth: string(),

        email: string({
            required_error: "Email es requerido",
        }).email("No es un email válido"),

        password: string({
            required_error: "Contraseña es requerida",
        }).min(6, "Contraseña demasiado corta - Debe tener un mínimo de 6 caracteres"),

        passwordConfirmation: string({
            required_error: "passwordConfirmation es requerida",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords no coinciden",
        path: ["passwordConfirmation"],
    }),
};

const updatePayload = {
    body: object({

        name: string({
            invalid_type_error: 'El nombre debe de ser un string'
        }),

        lastName: string({
            invalid_type_error: 'El apellido debe de ser un string'
        }),

        phoneNumber: string({
            invalid_type_error: 'El número de telefono debe de ser un string'
        })
            .min(8, { message: 'Debe tener 8 o más caracteres' })
            .optional()
    })
};

const assingPointPayload = {
    body: object({
        quantityPoints: number({
            required_error: 'La cantidad de puntos a asignar es requerido'
        }).min(1, { message: 'Debe asignar 1 o más puntos' })
    })
}

const params = {
    params: object({
        userId: string({
            required_error: 'User ID es requerido'
        }),
    }),
};

export const createUserSchema = object({
    ...payload
});

export const getUserSchema = object({
    ...params
});

export const updateUserSchema = object({
    ...updatePayload,
    ...params
});

export const assignPointsUserSchema = object({
    ...assingPointPayload,
    ...params
});

export const deleteUserSchema = object({
    ...params
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
export type AssignPointUserInput = TypeOf<typeof assignPointsUserSchema>;