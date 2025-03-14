import express from 'express';
import noticiasControle from '../controllers/noticias.controller.js';
import { validId, validUser, validNoticia } from '../middleware/global.middleware.js';
import autenticacao from '../middleware/autenticacao.middleware.js';

const router = express.Router();


// Rotas livres - não precisa de autenticação
// Rota para listar registros
router.get("/", noticiasControle.listar);

// Rota especifica para listar primeiro item de uma lista destaque
router.get("/top", noticiasControle.topNews);

// Rota para buscar registros pelo titulo
router.get("/search", noticiasControle.buscarPorTitulo);

// Rotas protegidas - precisa de autenticação e token
router.use(autenticacao);
// Rota para criar registro
router.post("/", noticiasControle.create);

// Rota para buscar noticias por usuário
router.get("/:noticiasPorUsuario", noticiasControle.buscarNoticiasPorUsuario);

// Rota para buscar registros por id
router.get("/buscarPorId/:id", validId, noticiasControle.buscarPorId);

// Rota para atualizar um registro por id
router.patch("/:id", validId, validNoticia, noticiasControle.editar);

// Rota para excluir registro por id com autenticação
router.delete("/:id",  validId, validNoticia, noticiasControle.excluir);

// Rota para dar likes ou deslikes 
router.patch("/likes/:id",  validId, validNoticia, noticiasControle.inserirLikes);

// Rota para adicionar comentarios
router.patch("/comentarios/:id", validNoticia, noticiasControle.inserirComentario);

// Rota para excluir comentarios mandando dois parametros
router.patch("/comentarios/:idNoticia/:idComentario", noticiasControle.excluirComentario);



export default router;