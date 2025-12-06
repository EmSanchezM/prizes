import mongoose from 'mongoose';
import { hashPassword, comparePassword } from '../utils/password';

export interface UserDocument extends mongoose.Document {
    name: string;
    lastName: string;
    phoneNumber?: string;
    birth?: Date | string;
    email: string;
    password: string;
    accumulatedPoints: number;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: { type: String },
    birth: { type: Date },
    accumulatedPoints: { type: Number, default: 0 },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, {
    timestamps: true,
    versionKey: false
});


userSchema.pre("save", async function () {
    const user = this as unknown as UserDocument;

    if (!user.isModified("password")) {
        return;
    }

    user.password = await hashPassword(user.password);
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as UserDocument;
    return comparePassword(candidatePassword, user.password);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;




