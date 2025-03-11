import mongoose from 'mongoose';
import userService from '../services/UserService.js';
import NoticiaService from '../services/NoticiaService.js';


// Aqui estamos criando um middleware, que literalmente é um interceptador

// Função para validar o ID
export const validId = (req, res, next) => {
    try {
        // Receber um ID
        let idParam;

        if (!req.params.id) {
            req.params.id = req.userId;
            idParam = req.params.id;
        } else {
            idParam = req.params.id;
        }

        // Verificar se o parâmetro está correto
        if (!mongoose.Types.ObjectId.isValid(idParam)) {
            return res.status(400).send({ message: "ID inválido!" });
        }

        // Função para avançar
        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

// Função para validar se user existe
export const validUser = async (req, res, next) => {
    try {
        // Receber um ID
        const id = req.params.id;

        // Verificar se o parâmetro está correto
        const user = await userService.buscarPorId(id);

        // Verificar se existe algum registro vindo do banco de dados
        if (!user) {
            return res.status(400).send({ message: "Nenhum registro cadastrado!" });
        }

        // Função para avançar
        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }


}

// Função para validar se noticia existe
export const validNoticia = async (req, res, next) => {
    try {
        // Receber um ID
        const id = req.params.id;

        // Verificar se o parâmetro está correto
        const user = await NoticiaService.buscarPorId(id);

        // Verificar se existe algum registro vindo do banco de dados
        if (!user) {
            return res.status(400).send({ message: "Nenhum registro cadastrado!" });
        }

        // Função para avançar
        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }


}


