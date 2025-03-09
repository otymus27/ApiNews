// Importar módulo responsável pela comunicação com o banco de dados
import UserService from "../services/UserService.js";

// Função para cadastrar registros
const create = async (req, res) => {
     //Receber os dados de um formulário através do body
     const body = req.body;

     //Aqui envolvemos tudo que não depende do javascript
     try { 
          // Aqui chamamos o service para cadastrar o registro no banco de dados
          const user = await UserService.create(body);
       
          // Resposta para o cliente um objeto user
          return res.status(201).send(user);

     } catch (error) {
          res.status(500).send(error.message);
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
     const {id: userId} = req.params;
     //aqui pegamos o id do usuario logado
     const userIdLogged = req.userId;

     try {       

          // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função 
          const user = await UserService.buscarPorId(userId, userIdLogged);

          // Resposta para o cliente
          return res.status(200).send(user);
     } catch (error) {
          return res.status(400).send(e.message);
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
          return res.status(400).send(e.message);
     }

}

// Função para editar registros
const editar = async (req, res) => {
     const body = req.body;
     const userId = req.userId;

     try {          
          // Aqui chamamos o service para atualizar o registro no banco de dados, passando o id e os dados que vem do body
          await UserService.editar(body,userId);

          // Resposta para o cliente
          return res.send(response);
     } catch (error) {
          res.status(400).send(e.message);
     }

}

export default { create, listar, buscarPorId, excluir, editar }