import express from 'express';

import * as resultController from '@controllers/resultController';
import { authenticateUser } from '@middleware/authMiddleware';
import { createResultValidator, updateResultValidator } from 'validators/resultValidator';
import { validateRequest } from '@middleware/validateRequest';

const resultRoutes = express.Router();

resultRoutes.post('/', authenticateUser, createResultValidator, validateRequest, resultController.createResult);
resultRoutes.get('/', authenticateUser, resultController.getResults);
resultRoutes.get('/:resultId', authenticateUser, resultController.getResultById);
resultRoutes.put('/:resultId', authenticateUser, updateResultValidator, resultController.updateResult);
resultRoutes.delete('/:resultId', authenticateUser, resultController.deleteResult);    

export default resultRoutes;
