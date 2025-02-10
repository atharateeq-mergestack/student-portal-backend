import express from 'express';

import * as subjectController from '@controllers/subjectController';
import { authenticateUser } from '@middleware/authMiddleware';
import { subjectValidator } from 'validators/subjectValidator';
import { validateRequest } from '@middleware/validateRequest';

const subjectRoutes = express.Router();

subjectRoutes.post('/', authenticateUser, subjectValidator, validateRequest, subjectController.createSubject);
subjectRoutes.get('/', authenticateUser, subjectController.getSubjects);
subjectRoutes.get('/:subjectId', authenticateUser, subjectController.getSubjectById);
subjectRoutes.put('/:subjectId', authenticateUser, subjectController.updateSubject);
subjectRoutes.delete('/:subjectId', authenticateUser, subjectController.deleteSubject);

export default subjectRoutes;

