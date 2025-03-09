import { Router } from "express";
const router = Router();
import swaggerUi from "swagger-ui-express";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const swaggerDocument = require("../swagger.json");

//import swaggerDocument from "../swagger.json" assert { type: "json" };
// Aqui vai criar um servidor para o swagger
router.use("/", swaggerUi.serve);
// Pega tudo que está no json e executa
router.get("/", swaggerUi.setup(swaggerDocument));

export default router;