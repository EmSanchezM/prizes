import mongoose from 'mongoose';
import { PrizeDocument } from './prize.model';
import { UserDocument } from './user.model';

export interface ExchangeDocument extends mongoose.Document {
    user: UserDocument['_id'];
    prize: PrizeDocument['_id'];
}

const exchangeSchema = new mongoose.Schema({
    user: { 
        type: String, 
        required: true,
        trim: true,
    },
    prize: {
        type: String
    },
});

const Exchange = mongoose.model<ExchangeDocument>('Exchange', exchangeSchema);

export default Exchange;