import express from 'express';
import * as userController from '@controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/', userController.createUser);
userRoutes.get('/', userController.getUsers);
userRoutes.get('/:userId', userController.getUserById);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser);

export default userRoutes;

