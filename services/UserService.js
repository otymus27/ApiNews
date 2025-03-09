import UserRepository from "../repository/user.repository.js";

import loginService from "../services/LoginService.js";

import bcrypt from "bcrypt";

// Função para cadastrar registros recebendo os dados através do body
const create = async (body) => {
     // Aqui desmembrando os campos de body
     const {nome, login, senha, email, foto, background } = body;

     // Validar dados
     if (!nome || !login || !senha || !email || !foto || !background)
     throw new Error("Preencha todos os campos!");
    

     // Aqui fazemos verificação se já existe registro com esse nome
     const buscar = await UserRepository.buscarPorEmail(email);

     if (buscar) throw new Error("Email já cadastrado!");

     // Aqui chamamos o service para cadastrar o registro no banco de dados
     const user = await UserRepository.create(body);

     if (!user) throw new Error("Erro ao cadaErro ao criar registro!");

     // Aqui criamos o token
     const token = loginService.generateToken(user.id);    

     // Resposta o objeto para o cliente
     return {
     user: {
          id: user._id,
          nome,
          login,
          senha,
          email,
          foto,
          background,
     },
     token,
     };
};

// Função para leitura de registros
const listar = async (req, res) => { 
    // Variável para receber um conjunto de registros ou array
    const users = await UserRepository.listar();

    if (users.length === 0) throw new Error("nenhum registro encontrado!");

    // Resposta para o cliente
    return users;
  
};

// Função para buscar registros por ID
const buscarPorId = async (userId, userIdLogged) => {
  let idParam;
  if (!userId) {
    idParam = userIdLogged;
  } else {
    idParam = userId;
  }

  if (!idParam) throw new Error("Id inválido!");

  // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função
  const user = await UserRepository.buscarPorId(idParam);

  // Resposta para o cliente
  return user;
};

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
    const user = await UserRepository.excluir(id);

    // Verificar se existe algum registro vindo do banco de dados
    if (!user) {
      return res.status(400).send({ message: "Nenhum registro cadastrado!" });
    }

    // Resposta para o cliente
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Função para cadastrar registros
const editar = async (body, userId) => { 
    // Aqui desconstruimos o body
    const { nome, login, senha, email, foto, background } = body;

    // Validar dados
    if (!nome && !login && !senha && !email && !foto && !background)
      throw new Error("Preencha todos os campos!");

    // Aqui chamamos o repository para buscarPorId o registro no banco de dados, passando o id
    const user = await UserRepository.buscarPorId(id);

    // Verificar se id existe
    if(user._id != userId) throw new Error("Id inválido!");

    if (senha) {
          senha = await bcrypt.hash(senha, 10);
    }

    // Aqui chamamos o repository para atualizar o registro no banco de dados, passando o id e os dados
    await UserRepository.editar(body);

    // Resposta para o cliente
    return res.status(200).send({ message: "Registro atualizado com sucesso!" });
  } 

export default { create, listar, buscarPorId, excluir, editar };
