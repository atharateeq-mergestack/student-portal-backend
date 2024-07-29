import { body, param } from 'express-validator';
import { MESSAGES } from '@utils/message';

export const createResultValidator = [
    body('studentName')
        .trim()
        .notEmpty().withMessage(`Student name ${MESSAGES.IS_REQUIRED}`)
        .matches(/^[a-zA-Z\s]*$/).withMessage('Student name has invalid entry.'),
    
    body('subjectId')
        .trim()
        .notEmpty().withMessage(`Subject ${MESSAGES.IS_REQUIRED}`),
    
    body('marks')
        .isNumeric().withMessage('Marks must be a valid number')
        .notEmpty().withMessage(`Marks ${MESSAGES.IS_REQUIRED}`)
        .isInt({ min: 0, max: 100 }).withMessage('Marks must be between 0 and 100'),
    
    body('grade')
        .trim()
        .notEmpty().withMessage(`Grade ${MESSAGES.IS_REQUIRED}`)
        .matches(/^[A-F][+-]?$/).withMessage('Grade has invalid entry.'),
];

export const updateResultValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage(`Result ID${MESSAGES.IS_REQUIRED}`)
        .isMongoId().withMessage('Invalid result ID format'),

    body('studentName')
        .optional()
        .trim()
        .matches(/^[a-zA-Z\s]*$/).withMessage('Student name has invalid entry.'),

    body('subjectId')
        .optional()
        .trim()
        .notEmpty().withMessage(`Subject ID ${MESSAGES.IS_REQUIRED}`),

    body('marks')
        .optional()
        .isNumeric().withMessage('Marks must be a valid number')
        .isInt({ min: 0, max: 100 }).withMessage('Marks must be between 0 and 100'),

    body('grade')
        .optional()
        .trim()
        .matches(/^[A-F][+-]?$/).withMessage('Grade has invalid entry.'),
];