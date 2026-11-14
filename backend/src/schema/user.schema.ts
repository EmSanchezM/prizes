import { number, object, string, TypeOf } from "zod";
import { invalidType, required } from "./errors";

const payload = {
    body: object({

        name: string(required('Nombre es requerido')).min(2, { message: 'Debe tener 2 o más caracteres' }),

        lastName: string(required('Apellido es requerido')).min(2, { message: 'Debe tener 2 o más caracteres' }),

        phoneNumber: string(required('Número de telefono es requerido')).min(8, { message: 'Debe tener 8 o más caracteres' }),

        birth: string(),

        email: string(required("Email es requerido")).email("No es un email válido"),

        password: string(required("Contraseña es requerida")).min(6, "Contraseña demasiado corta - Debe tener un mínimo de 6 caracteres"),

        passwordConfirmation: string(required("passwordConfirmation es requerida")),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords no coinciden",
        path: ["passwordConfirmation"],
    }),
};

const updatePayload = {
    body: object({

        name: string(invalidType('El nombre debe de ser un string')),

        lastName: string(invalidType('El apellido debe de ser un string')),

        phoneNumber: string(invalidType('El número de telefono debe de ser un string'))
            .min(8, { message: 'Debe tener 8 o más caracteres' })
            .optional()
    })
};

const assingPointPayload = {
    body: object({
        quantityPoints: number(required('La cantidad de puntos a asignar es requerido')).min(1, { message: 'Debe asignar 1 o más puntos' })
    })
}

const params = {
    params: object({
        userId: string(required('User ID es requerido')),
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