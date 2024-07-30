import { body } from 'express-validator';
import { MESSAGES } from '@utils/message';

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage(`Email ${MESSAGES.IS_REQUIRED}`)
    .isEmail().withMessage(MESSAGES.EMAIL_FORMAT_INVALID),
  
  body('password')
    .trim()
    .notEmpty().withMessage(`Password ${MESSAGES.IS_REQUIRED}`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage(MESSAGES.PASSWORD_COMPLEXITY),
];
