import User, { IUser } from '../models/User';

export const createUser = async (userData: IUser): Promise<IUser | null> => {
  const user = new User(userData);
  await user.save();
  const newlyCreatedUser = getUserById(user.id);
  return newlyCreatedUser
};

export const getUsers = async (): Promise<IUser[]> => {
  return await User.find({}, { password: 0 }).exec();
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId, { password: 0 }).exec();
};

export const updateUser = async (userId: string, userData: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(userId, userData, { new: true, projection: { password: 0 } }).exec();
};

export const deleteUser = async (userId: string): Promise<void> => {
  await User.findByIdAndDelete(userId).exec();
};

export const findByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email }, { password: 0 }).exec();
};

import bcrypt from 'bcryptjs';

export const comparePasswords = async (enteredPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
