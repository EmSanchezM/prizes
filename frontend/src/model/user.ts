export class User {
    _id!: string;
    name!: string;
    lastName!: string;
    email!: string;
    password!: string;
    accumulatedPoints?: number;
    phoneNumber?: string;
    birth?: Date;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date; 
}