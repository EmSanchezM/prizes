import mongoose from 'mongoose';

export interface PrizeDocument extends mongoose.Document {
    name: string;
    description: string;
    points: number;
}

const prizeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,
    },
    description: {
        type: String
    },
    points: { type: Number, required: true }
});

const Prize = mongoose.model<PrizeDocument>('Prize', prizeSchema);

export default Prize;