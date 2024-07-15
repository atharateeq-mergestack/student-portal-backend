import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS, SECRET_KEY } from '@utils/constants';
import { MESSAGES } from '@utils/message';
import { sendResponse } from '@utils/Respons/response';
import { AuthRequest } from 'types/auth-request';

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
  }  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, `${SECRET_KEY}`) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return sendResponse(res, HTTP_STATUS.FORBIDDEN, MESSAGES.FORBIDDEN);
  }
};
