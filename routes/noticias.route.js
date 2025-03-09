import express from 'express';
import noticiasControle from '../controllers/noticias.controller.js';
import { validId, validUser, validNoticia } from '../middleware/global.middleware.js';
import autenticacao from '../middleware/autenticacao.middleware.js';

const router = express.Router();

// Rota para criar registro
router.post("/", autenticacao, noticiasControle.create);

// Rota para listar registros
router.get("/", noticiasControle.listar);

// Rota diferencia para listar primeiro item de uma lista destaque
router.get("/top", noticiasControle.topNews);

// Rota para buscar registros pelo titulo
router.get("/search", noticiasControle.buscarPorTitulo);

// Rota para buscar noticias por usuário
router.get("/:noticiasPorUsuario",autenticacao, noticiasControle.buscarNoticiasPorUsuario);

// Rota para buscar registros por id
router.get("/:id",autenticacao, validId,validUser,noticiasControle.buscarPorId);

// Rota para atualizar um registro por id
router.patch("/:id", autenticacao, validId, validNoticia, noticiasControle.editar);

// Rota para excluir registro por id com autenticação
router.delete("/:id", autenticacao, validId, validNoticia, noticiasControle.excluir);

// Rota para dar likes ou deslikes 
router.patch("/likes/:id", autenticacao, validId, validNoticia, noticiasControle.inserirLikes);

// Rota para adicionar comentarios
router.patch("/comentarios/:id", autenticacao, validNoticia, noticiasControle.inserirComentario);

// Rota para excluir comentarios mandando dois parametros
router.patch("/comentarios/:idNoticia/:idComentario", autenticacao, noticiasControle.excluirComentario);



export default router;