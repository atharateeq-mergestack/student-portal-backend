import { MESSAGES } from '@utils/message';
import { body } from 'express-validator';

export const createUserValidator = [
    body('firstName')
        .trim()
        .notEmpty().withMessage(`First name ${MESSAGES.IS_REQUIRED}`)
        .matches(/^[a-zA-Z]+$/).withMessage(`First name ${MESSAGES.ONLY_ALPHABETIC}`),
    body('lastName')
        .trim()
        .notEmpty().withMessage(`Last name ${MESSAGES.IS_REQUIRED}`)
        .matches(/^[a-zA-Z]+$/).withMessage(`Last name ${MESSAGES.ONLY_ALPHABETIC}`),
    body('userName')
        .trim()
        .notEmpty().withMessage(`User name ${MESSAGES.IS_REQUIRED}`)
        .matches(/^[a-zA-Z0-9]+$/).withMessage(`User name ${MESSAGES.ONLY_ALPHANUMERIC}`),
    body('email')
        .trim()
        .notEmpty().withMessage(`Email ${MESSAGES.IS_REQUIRED}`)
        .isEmail().withMessage(MESSAGES.EMAIL_FORMAT_INVALID),
    body('password')
        .trim()
        .notEmpty().withMessage(`Password ${MESSAGES.IS_REQUIRED}`)
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage(MESSAGES.PASSWORD_COMPLEXITY),
    body('confirmPassword')
        .trim()
        .notEmpty().withMessage(`Confirm password ${MESSAGES.IS_REQUIRED}`)
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
];
