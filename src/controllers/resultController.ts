import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as resultService from '@services/resultService';
import { HTTP_STATUS } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { IOverallStats, IResult } from '@models/Result';
import { sendResponse } from '@utils/Respons/response';
import { AuthRequest } from 'types/auth-request';

export const createResult = async (req: AuthRequest, res: Response) => {
  try {
    const resultData = { ...req.body, createdBy: req.userId };
    const result: IResult | null = await resultService.createResult(resultData);
    sendResponse(res, HTTP_STATUS.CREATED, MESSAGES.RECORD_ADDED_SUCCESSFULLY, result);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, errors);
    } else {
      return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
};

export const getResults = async (req: AuthRequest, res: Response) => {
  try {
    const results: IResult[] = await resultService.getResults(req.userId);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_FETCHED_SUCCESSFULLY, results);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getResultById = async (req: AuthRequest, res: Response) => {
  try {
    const result: IResult | null = await resultService.getResultById(req.params.resultId);
    if (result) {
      sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_FETCHED_SUCCESSFULLY, result);
    } else {
      sendResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGES.NO_RECORD);
    }
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateResult = async (req: Request, res: Response) => {
  try {
    const resultData = req.body;
    const resultId = req.params.resultId;
    const result = await resultService.updateResult(resultId, resultData);
    if (result) {
      sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_UPDATED_SUCCESSFULLY, result);
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

export const deleteResult = async (req: Request, res: Response) => {
  try {
    const resultId = req.params.resultId;
    await resultService.deleteResult(resultId);
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_DELETED_SUCCESSFULLY, {});
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const getResultsStats = async (req: AuthRequest, res: Response) => {
  try {
    const results: IOverallStats = await resultService.getOverallStats();
    sendResponse(res, HTTP_STATUS.OK, MESSAGES.RECORD_FETCHED_SUCCESSFULLY, results);
  } catch (error) {    
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
