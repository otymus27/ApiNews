import noticiaRepository from "../repository/noticia.repository.js";

// Função para cadastrar registros recebendo os dados através do body
const create = async ({ titulo, texto, banner }, userId) => {
  // Validar dados
  if (!titulo || !texto || !banner)
    throw new Error("Preencha todos os campos!");

  // Aqui chamamos o service para cadastrar o registro no banco de dados
  const { id } = await noticiaRepository.create(titulo, texto, banner, userId);

  // Resposta o objeto para o cliente
  return {
    message: "Registro criado com sucesso!",

    noticia: {
      id,
      titulo,
      texto,
      banner,
    },
  };
};

// Função para leitura de registros
const listar = async (limit, offset, paginaAtual) => {
  // Aqui fazemos a um cast de string para number
  limit = Number(limit);
  offset = Number(offset);

  // Quantidade de registros por pagina
  if (!limit) {
    limit = 5;
  }

  // Aqui é quantos itens será pulado
  if (!offset) {
    offset = 0;
  }

  // Variável para receber um conjunto de registros ou array
  const noticias = await noticiaRepository.listar(offset, limit);

  const totalRegistro = await noticiaRepository.contarRegistros();

  const next = offset + limit;
  const nextPage =
    next < totalRegistro
      ? `${paginaAtual}?limit=${limit}&offset=${next} `
      : null;
  const previous = offset - limit < 0 ? null : offset - limit;
  const previousPage = previous
    ? `${paginaAtual}?limit=${limit}&offset=${previous}`
    : null;

  if (noticias.length === 0) throw new Error("nenhum registro encontrado!");

  // Resposta para o cliente enviando um objeto
  return {
    nextPage,
    previousPage,
    limit,
    offset,
    totalRegistro,

    results: noticias.map((noticia) => ({
      id: noticia._id,
      titulo: noticia.titulo,
      texto: noticia.texto,
      banner: noticia.banner,
      likes: noticia.likes,
      comments: noticia.comments,
      nome: noticia.user.nome,
      login: noticia.user.login,
    })),
  };
};

// Função para buscar o primeiro dado de uma lista no banco de dados
const topNews = async () => {
  const noticia = await noticiaRepository.topNews();

  if (!noticia) throw new Error("Nenhum registro cadastrado!");

  // Resposta para o cliente enviando um objeto
  return {
    noticia: {
      id: noticia._id,
      titulo: noticia.titulo,
      texto: noticia.texto,
      banner: noticia.banner,
      likes: noticia.likes,
      comments: noticia.comments,
      nome: noticia.user.nome,
      login: noticia.user.login,
    },
  };
};

// Função para buscar registros por Titulo
const buscarPorTitulo = async (titulo) => {
  // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função
  const noticias = await noticiaRepository.buscarPorTitulo(titulo);

  // Aqui fazemos uma validação
  if (noticias.length === 0)
    throw new Error("Nenhum registro cadastrado nesta busca!");

  // Resposta para o cliente enviando um objeto
  return {
    results: noticias.map((noticia) => ({
      id: noticia._id,
      titulo: noticia.titulo,
      texto: noticia.texto,
      banner: noticia.banner,
      nome: noticia.user.nome,
      login: noticia.user.login,
      likes: noticia.likes,
      comments: noticia.comments,
    })),
  };
};

// Função para buscar registros por ID
const buscarPorId = async (id) => {
  // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id e armazenamos numa variavel
  const noticia = await noticiaRepository.buscarPorId(id);

  // Verificar se existe algum registro vindo do banco de dados
  if (!noticia) throw new Error("Nenhum registro cadastrado!");

  // Verificar se a notícia possui um usuário associado
  if (!noticia.user)
    throw new Error("Usuário não encontrado para esta notícia!");

  // Resposta para o cliente enviando um objeto
  return {
    id: String(noticia._id), // Garante que seja uma string
    titulo: noticia.titulo,
    texto: noticia.texto,
    banner: noticia.banner,
    likes: noticia.likes,
    comments: noticia.comments,
    nome: noticia.user.nome,
    username: noticia.user.username,
  };
};

// Função para buscar noticias por usuario - especifica da api
const buscarNoticiasPorUsuario = async (id) => {
  const noticias = await noticiaRepository.buscarNoticiasPorUsuario(id);

  // Resposta para o cliente enviando um objeto com varios registros
  return {
    results: noticias.map((noticia) => ({
      id: noticia._id,
      titulo: noticia.titulo,
      texto: noticia.texto,
      banner: noticia.banner,
      nome: noticia.user.nome,
      login: noticia.user.login,
      likes: noticia.likes,
      comments: noticia.comments,
    })),
  };
};

// Função para excluir registros por ID
const excluir = async (id, userId) => {
  // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id
  const noticia = await noticiaRepository.buscarPorId(id);

  if (!noticia) throw new Error("Não existe registro com este ID!");

  if (String(noticia.user._id) !== String(userId))
    throw new Error("Você não tem permissão para excluir este registro!");
  // const result =(noticia.user._id !== userId);
  // console.log(result)

  // Aqui chamamos o repositorio para excluir o registro no banco de dados, passando o id e os dados
  await noticiaRepository.excluir(id);
};

// Função para editar registros
const editar = async (id, titulo, texto, banner, userId) => {
  // Validar dados
  if (!titulo && !texto && !banner)
    throw new Error("Preencha pelo menos um dos campos!");

  // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id
  const noticias = await noticiaRepository.buscarPorId(id);

  if (noticias.user.id != userId)
    throw new Error("Você não tem permissão para editar este registro!");

  // Aqui chamamos o service para atualizar o registro no banco de dados, passando o id e os dados
  await noticiaRepository.editar(id, titulo, texto, banner);
};

// Função para inserir e e excluir likes nas noticias - especifica
const inserirLikes = async (id, userId) => {
  // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id
  const likesNoticia = await noticiaRepository.inserirLikes(id, userId);

  // Caso usuario clique novamente ou chame a função
  if (!likesNoticia) {
    await noticiaRepository.excluirLikes(id, userId);
    return { message: "Like removido com sucesso!" };
  }

  // Resposta para o cliente
  return { message: "ok like inserido com sucesso!" };
};

// Função para inserir comentario nas noticias - especifica
const inserirComentario = async (idNoticia, userId, comments) => {
  // Valida se tem comentario para adicionar
  if (!comments) throw new Error("Comentário não pode ser vazio!");

  const noticia = await noticiaRepository.buscarPorId(idNoticia);

  if (!noticia) throw new Error("Registro não encontrado!!!");

  // Aqui chamamos o repositorio para inserir o registro no banco de dados, passando os parametros
  await noticiaRepository.inserirComentario(idNoticia, userId, comments);
};

// Função para excluir comentario nas noticias - especifica
const excluirComentario = async (idNoticia, idComentario, userId) => {
  // Validação de parâmetros obrigatórios
  if (!idNoticia || !idComentario)
    throw new Error("ID da notícia e do comentário são obrigatórios!");

  // Busca a notícia para verificar se o comentário existe antes de excluir
  const noticia = await noticiaRepository.buscarPorId(idNoticia);

  if (!noticia) throw new Error("Notícia não encontrada!");

  // Garante que a lista de comentários seja um array válido
  const todosComentarios = Array.isArray(noticia.comments)
    ? noticia.comments.flat(Infinity)
    : [];

  // Busca o comentário específico pelo ID
  const buscarComentario = todosComentarios.find(
    (comentario) => String(comentario.idComentario) === String(idComentario)
  );

  // Se o comentário não for encontrado, retorna erro
  if (!buscarComentario) throw new Error("Comentário não encontrado!");

  console.log(buscarComentario);

  // Verifica se o usuário tem permissão para excluir
  if (String(buscarComentario.userId) !== String(userId))
    throw new Error("Você não tem permissão para excluir este comentário!");

  // Agora, exclui o comentário
  await noticiaRepository.excluirComentario(idNoticia, idComentario, userId);
};

export default {
  create,
  listar,
  topNews,
  buscarPorTitulo,
  buscarPorId,
  buscarNoticiasPorUsuario,
  excluir,
  editar,
  inserirLikes,
  inserirComentario,
  excluirComentario,
};
