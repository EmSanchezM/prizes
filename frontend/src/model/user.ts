export class User {
    id!: number;
    name!: string;
    lastName!: string;
    email!: string;
    password!: string;
    accumulatedPoints?: number;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date; 
}