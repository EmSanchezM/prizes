import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    name: string;
    lastName: string;
    phoneNumber: string;
    birth: Date | string;
    email: string;
    password: string;
    accumulatedPoints: number | null;
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
    accumulatedPoints: { type: Number, min: 0 },
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


userSchema.pre("save", async function (next) {
    let user = this as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;




