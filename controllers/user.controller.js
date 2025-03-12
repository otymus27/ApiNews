// Importar módulo responsável pela comunicação com o banco de dados
import mongoose from "mongoose";
import UserService from "../services/UserService.js";

// Função para cadastrar registros
const create = async (req, res) => {
     // Aqui recebendo os campos desmembrados do body
     const {nome, login, senha, email, foto, background } = req.body;
     //console.log({nome, login, senha, email, foto, background })

     //Aqui envolvemos tudo que não depende do javascript
     try { 
          // Aqui chamamos o service para cadastrar o registro no banco de dados
          const token = await UserService.create({nome, login, senha, email, foto, background });
       
          console.log(token)
          // Resposta para o cliente um objeto user
          res.status(201).send(token);

     } catch (error) {
          res.status(500).send("Algo de errado: "+error.message);
     }

}

// Função para leitura de registros
const listar = async (req, res) => {

     try {
          // Variável para receber um conjunto de registros ou array
          const users = await UserService.listar();
         
          // Resposta para o cliente
          return res.send(users);

     } catch (error) {
          return res.status(404).send(error.message);
     }

}

// Função para buscar registros por ID
const buscarPorId = async (req, res) => {
     // const {id: userId} = req.params;
     // //aqui pegamos o id do usuario logado
     // const userIdLogged = req.userId;

     try {       

          // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função 
          const user = await UserService.buscarPorId(req.params.id, req.userId);

          // Resposta para o cliente
          return res.send(user);
     } catch (error) {
          return res.status(400).send("erro ao buscar por id "+error.message);
     }

}

// Função para excluir registros por ID
const excluir = async (req, res) => {
     try {
          // Aqui passamos o parâmetro para rota
          const id = req.params.id;

          // Verificar se o parâmetro está correto
          if (!mongoose.Types.ObjectId.isValid(id)) {
               return res.status(400).send({ message: "ID inválido!" });
          }

          // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função 
          const user = await UserService.excluir(id);

          // Verificar se existe algum registro vindo do banco de dados
          if (!user) {
               return res.status(400).send({ message: "Nenhum registro cadastrado!" });
          }

          // Resposta para o cliente
          res.status(200).send(user);
     } catch (error) {
          return res.status(400).send("Ops"+error.message);
     }

}

// Função para editar registros
const editar = async (req, res) => {       

     const { nome, login, email, senha, foto, background } = req.body;
     const { id: userId } = req.params;
     const userIdLogged = req.userId;

     try {          
          // Aqui chamamos o service para atualizar o registro no banco de dados, passando o id e os dados que vem do body
          const response = await UserService.editar({ nome, login, email, senha, foto, background },userId, userIdLogged);

          // Resposta para o cliente
          return res.send(response);
     } catch (error) {
          res.status(400).send(error.message);
     }

}

export default { create, listar, buscarPorId, excluir, editar }