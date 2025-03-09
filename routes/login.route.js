import { Router } from "express";
import loginControle from "../controllers/login.controller.js";


const autenticacaoRouter = Router();

autenticacaoRouter.post("/", loginControle.login);

export default autenticacaoRouter;