import express from 'express';
import userControle from '../controllers/user.controller.js';
import { validId, validUser } from '../middleware/global.middleware.js';
import autenticacao from '../middleware/autenticacao.middleware.js';

const userRouter = express.Router();

// Rota para criar registro
userRouter.post("/create", userControle.create);

// Middleware de autenticação
userRouter.use(autenticacao);

// Rota para listar registros
userRouter.get("/", userControle.listar);

userRouter.use(validId);

// Rota para buscar registros por id
userRouter.get("/buscarPorId/:id", userControle.buscarPorId);

// Rota para excluir registro por id
userRouter.delete("/:id", userControle.excluir);

// Rota para atualizar um registro por id
userRouter.patch("/:id", userControle.editar);

export default userRouter;