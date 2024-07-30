import { body } from 'express-validator';
import { MESSAGES } from '@utils/message';

export const subjectValidator = [
  body('subjectName')
    .trim()
    .notEmpty().withMessage(`Subject name ${MESSAGES.IS_REQUIRED}`)
    .matches(/^[a-zA-Z][a-zA-Z0-9\s]*$/).withMessage('Subject name must start with a letter and can contain letters, numbers, and spaces.'),
  
  body('subjectDescription')
    .trim()
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}:;<>,.?~\\-\s]*$/).withMessage('Subject description has invalid entry.'),
];
