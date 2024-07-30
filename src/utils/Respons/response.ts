import { Response } from 'express';
import { sendSuccessResponse } from '@utils/Respons/success-response';
import { sendErrorResponse } from '@utils/Respons/error-response';

export const sendResponse = (res: Response, statusCode: number, message: any,  data?: any) => {
  if (statusCode === 200 || statusCode === 201) {
    sendSuccessResponse(res, data, statusCode, message);
  } else {
    sendErrorResponse(res, statusCode, message);
  }
};
