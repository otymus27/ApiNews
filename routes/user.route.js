import express from 'express';
import userControle from '../controllers/user.controller.js';
import { validId, validUser } from '../middleware/global.middleware.js';

const userRouter = express.Router();

// Rota para criar registro
userRouter.post("/", userControle.create);

// Rota para listar registros
userRouter.get("/", userControle.listar);

// Rota para buscar registros por id
userRouter.get("/:id",validId, validUser, userControle.buscarPorId);

// Rota para excluir registro por id
userRouter.delete("/:id", userControle.excluir);

// Rota para atualizar um registro por id
userRouter.patch("/:id", validId, validUser, userControle.editar);

export default userRouter;