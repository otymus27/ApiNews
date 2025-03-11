import UserRepository from "../repository/user.repository.js";

import loginService from "../services/LoginService.js";

import bcrypt from "bcrypt";

// Função para cadastrar registros recebendo os dados através do body
const create = async ({ nome, login, senha, email, foto, background }) => {
  // Validar dados
  if (!nome || !login || !senha || !email || !foto || !background)
    throw new Error("Preencha todos os campos!");

  // Aqui fazemos verificação se já existe registro com esse nome
  const buscar = await UserRepository.buscarPorEmail(email);

  if (buscar) throw new Error("Email já cadastrado!");

  // Aqui chamamos o service para cadastrar o registro no banco de dados
  const user = await UserRepository.create({
    nome,
    login,
    senha,
    email,
    foto,
    background,
  });

  if (!user) throw new Error("Erro ao criar registro!");

  // Aqui criamos o token
  const token = loginService.generateToken(user.id);

  // Resposta o objeto para o cliente, vamos enviar apenas o token, como boa prática não vamos enviar os dados do usuario
  return {
    //  user: {
    //       id: user._id,
    //       nome,
    //       login,
    //       senha,
    //       email,
    //       foto,
    //       background,
    //  },
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
const buscarPorId = async (userIdParam, userIdLogged) => {
  let idParam;
  if (!userIdParam) {
    idParam = userIdLogged;
  } else {
    idParam = userIdParam;
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
const editar = async ({ nome, login, email, senha, foto, background }, userId, userIdLogged) => {
  
  // Validar dados
  if (!nome && !login && !senha && !email && !foto && !background)
    throw new Error("Preencha todos os campos!");

  // Aqui chamamos o repository para buscarPorId o registro no banco de dados, passando o id
  const user = await UserRepository.buscarPorId(userId);

  // Verificar se o usuário pode fazer a alteração
  if (user._id != userIdLogged) throw new Error("Você não tem permissão para fazer esta atualização!");

  if (senha) {
    senha = await bcrypt.hash(senha, 10);
  }

  // Aqui chamamos o repository para atualizar o registro no banco de dados, passando o id e os dados
  await UserRepository.editar(userId, nome, login, senha, email, foto, background );

  // Resposta para o cliente
  return ({ message: "Registro atualizado com sucesso!" });
};

export default { create, listar, buscarPorId, excluir, editar };
