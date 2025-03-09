import { Router } from "express";
import userRouter from "./user.route.js";
import loginRoute from "./login.route.js";
import noticiasRoute from "./noticias.route.js";
import swaggerRoute from "./swagger.route.js";
import autenticacaoRouter from "./login.route.js";

const router = Router();

// Usando as rotas
router.use("/user", userRouter);
router.use("/login", autenticacaoRouter);
router.use("/noticias", noticiasRoute);
router.use("/doc", swaggerRoute);

export default router;