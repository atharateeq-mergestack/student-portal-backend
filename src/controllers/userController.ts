import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { HTTP_STATUS } from '../utils/constants';
import { sendErrorResponse } from '../utils/Respons/error-response';
import { sendSuccessResponse } from '../utils/Respons/success-response';
import { MESSAGES } from '../utils/message';
import mongoose from 'mongoose'; 

export const createUser = async (req: Request, res: Response) => {
  try {
    // Check if user with the same email already exists
    const existingUser = await userService.findByEmail(req.body.email);
    if (existingUser) {
      return sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.USER_EMAIL_EXISTS);
    }
    // Create user
    const user = await userService.createUser(req.body);
    sendSuccessResponse(res, user, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, errors);
    } else {
      return sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {    
    const users = await userService.getUsers();
    sendSuccessResponse(res, users, HTTP_STATUS.OK, MESSAGES.RECORD_FETCHED_SUCCESSFULLY);
  } catch (error) {
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (user) {
      sendSuccessResponse(res, user, HTTP_STATUS.OK, MESSAGES.RECORD_FETCHED_SUCCESSFULLY);
    } else {
      sendErrorResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGES.NO_RECORD);
    }
  } catch (error) {
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userId = req.params.id;
    // Check if userData object is empty or contains null/undefined values
    if (Object.keys(userData).length === 0 || Object.values(userData).some(value => value === null || value === undefined)) {
      return sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.EMPTY_RECORD);
    }    
    // Check if user with the same email already exists
    if(userData.email){
      const existingUser = await userService.findByEmail(userData.email);
      if (existingUser) {
        return sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.USER_EMAIL_EXISTS);
      }
    }    
    const user = await userService.updateUser(userId, userData);
    if (user) {
      sendSuccessResponse(res, user, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY);
    } else {
      sendErrorResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGES.NO_RECORD);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, errors);
    } else {
      return sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);    
    sendSuccessResponse(res, {}, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY);
  } catch (error) {
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
