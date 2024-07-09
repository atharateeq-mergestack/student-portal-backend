// responses/successResponse.ts
import { Response } from 'express';

export const sendSuccessResponse = (res: Response, data: any, statusCode: number, message: string = 'Success') => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
