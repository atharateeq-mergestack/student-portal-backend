// src/controllers/userController.ts
import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { HTTP_STATUS } from '../utils/constants';
import { sendErrorResponse } from '../utils/Respons/error-response';
import { sendSuccessResponse } from '../utils/Respons/success-response';
import { MESSAGES } from '../utils/message';

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    // Check if user with the same email already exists
    const existingUser = await userService.findByEmail(req.body.email);
    if (existingUser) {
      return sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.USER_EMAIL_EXISTS);
    }
    const user = await userService.createUser(req.body);
    sendSuccessResponse(res, user, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY);
  } catch (error) {
    console.error('Error creating user:', error);
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {    
    const users = await userService.getUsers();
    sendSuccessResponse(res, users, HTTP_STATUS.OK, MESSAGES.RECORD_FETCHED_SUCCESSFULLY);
  } catch (error) {
    console.error('Error getting users:', error);
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
    console.error('Error getting user by ID:', error);
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userId = req.params.id;
    if (!userData.firstName && !userData.lastName && !userData.username && !userData.email && !userData.password) {
      return sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, 'At least one field is required to update');
    }
    const user = await userService.updateUser(userId, userData);
    if (user) {
      sendSuccessResponse(res, user, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY);
    } else {
      sendErrorResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGES.NO_RECORD);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    sendSuccessResponse(res, {}, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY);
  } catch (error) {
    console.error('Error deleting user:', error);
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
