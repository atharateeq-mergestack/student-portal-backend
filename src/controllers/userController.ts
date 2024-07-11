import { Request, Response } from 'express';
import mongoose from 'mongoose'; 
import _ from 'lodash';
import * as userService from '@services/userService';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { IUser } from '@models/User';
import { sendResponse } from '@utils/Respons/response';

export const createUser = async (req: Request, res: Response) => {
  try {
    // Check if user with the same email already exists
    const existingUser : IUser | null = await userService.findByEmail(req.body.email);
    if (existingUser) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.USER_EMAIL_EXISTS);
    }
    // Create user
    const user : IUser | null = await userService.createUser(req.body);
    sendResponse(res, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY, user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, errors);
    } else {
      return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {    
    const users : IUser[]= await userService.getUsers();
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_FETCHED_SUCCESSFULLY, users);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user : IUser | null = await userService.getUserById(req.params.userId);
    if (user) {
      sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_FETCHED_SUCCESSFULLY, user);
    } else {
      sendResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGES.NO_RECORD);
    }
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userId = req.params.id;
    // Check if userData object is empty or contains null/undefined values
    if (_.isEmpty(userData) || _.some(userData, _.isNil)) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.EMPTY_RECORD);
    }  
    // Check if user with the same email already exists
    if(userData.email){
      const existingUser : IUser | null = await userService.findByEmail(userData.email);
      if (existingUser) {
        return sendResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.USER_EMAIL_EXISTS);
      }
    }    
    const user = await userService.updateUser(userId, userData);
    if (user) {
      sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY, user);
    } else {
      sendResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGES.NO_RECORD);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, errors);
    } else {
      return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);    
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
