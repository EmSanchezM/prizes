import mongoose from 'mongoose';
import { PrizeDocument } from './prize.model';
import { UserDocument } from './user.model';

export interface ExchangeDocument extends mongoose.Document {
    user: UserDocument['_id'];
    prize: PrizeDocument['_id'];
}

const exchangeSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    prize: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prize'
    },
}, {
    versionKey: false 
});

const Exchange = mongoose.model<ExchangeDocument>('Exchange', exchangeSchema);

export default Exchange;