import { DocumentDefinition, UpdateQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";
import Prize, { PrizeDocument } from "../models/prize.model";
import Exchange, { ExchangeDocument } from "../models/exchange.model";

export async function createPrize(input: DocumentDefinition<Omit<PrizeDocument, 'createdAt' | 'updatedAt'>>) {
  try {
    const prize = await Prize.create(input);

    return prize;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findPrizes() {
  try {
    const prizes = await Prize.find();
    return prizes;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findPrize(prizeId: string) {
  try {
    return Prize.findById(prizeId);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updatePrize(prizeId: string, prizeUpdate: UpdateQuery<PrizeDocument>) {
  try {
    const prize = await Prize.findByIdAndUpdate(prizeId, prizeUpdate);
    return prize;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function assignPrize(user: DocumentDefinition<Omit<UserDocument, 'createdAt'|'updatedAt'|'comparePassword'>>, prize: DocumentDefinition<Omit<PrizeDocument, 'createdAt' | 'updatedAt'>>) {
  try {

    const exchange = await Exchange.create({
        user: user._id,
        prize: prize._id
    });

    if(exchange){
        let pointsResult = user.accumulatedPoints - prize.points;
        await UserModel.findOneAndUpdate({_id: user._id }, { $set: { accumulatedPoinst: pointsResult } });
    }

    return exchange;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deletePrize(prizeId: string) {
  try {
    return Prize.findByIdAndDelete(prizeId);
  } catch (error: any) {
    throw new Error(error);
  }
}

