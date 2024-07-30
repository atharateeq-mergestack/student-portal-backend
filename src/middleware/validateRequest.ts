import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

import { HTTP_STATUS } from '@utils/constants';
import { sendResponse } from '@utils/Respons/response';

interface IValidationErrors {
  [key: string]: string;
}

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages: IValidationErrors = errors.array().reduce((acc: IValidationErrors, error: ValidationError) => {
      if ('path' in error) {
        acc[error.path] = error.msg;
      }
      return acc;
    }, {} as IValidationErrors);
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, errorMessages);
  }
  next();
};
