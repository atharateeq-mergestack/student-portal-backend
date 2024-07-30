import express from 'express';

import * as userController from '@controllers/userController';
import { authenticateUser } from '@middleware/authMiddleware';
import { createUserValidator } from 'validators/userValidators';
import { validateRequest } from '@middleware/validateRequest';

const userRoutes = express.Router();

userRoutes.post('/', createUserValidator, validateRequest, userController.createUser);
userRoutes.get('/', authenticateUser, userController.getUsers);
userRoutes.get('/:userId', authenticateUser, userController.getUserById);
userRoutes.put('/:id', authenticateUser, userController.updateUser);
userRoutes.delete('/:id', authenticateUser, userController.deleteUser);

export default userRoutes;
