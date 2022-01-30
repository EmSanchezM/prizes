import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUsers() {
  try {
    const users = await UserModel.find({ role: 'USER' }).select('-password');
    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUser(userId: string) {
  try {
    return UserModel.findById(userId).select('-password');
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateUser(userId: string, userUpdate: UpdateQuery<UserDocument>) {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, userUpdate);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function assignPoints(userId: string, quantityPoints: number) {
  try {
    const filter = { _id: userId };
    const updatePoints = { accumulatedPoints: quantityPoints };

    let userUpdated = await UserModel.findOneAndUpdate(filter, updatePoints);
    
    return omit(userUpdated?.toJSON(), 'password');

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteUser(userId: string) {
  try {
    return UserModel.findByIdAndDelete(userId);
  } catch (error: any) {
    throw new Error(error);
  }
}

