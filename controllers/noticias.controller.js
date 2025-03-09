// Importar módulo responsável pela comunicação com o banco de dados
import NoticiaService from "../services/NoticiaService.js";

// Função para cadastrar registros
const create = async (req, res) => {

     //Receber os dados de um formulário através do body
     const { titulo, texto, banner } = req.body;
     const userId = req.userId;

     //Aqui envolvemos tudo que não depende do javascript
     try { 
          // Aqui chamamos o service para cadastrar o registro no banco de dados
          const noticia = await NoticiaService.create({ titulo, texto, banner },userId);

          // Resposta para o cliente um objeto user
          return res.status(201).send(noticia);         
     } catch (error) {
          res.status(500).send({ message: error.message });
     }

}

// Função para leitura de registros
const listar = async (req, res) => {
     try {
          // Variável para receber um query params vindo da requisição
          let { limit, offset } = req.query;

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
          const noticias = await NoticiaRepository.listar(offset, limit);

          const totalRegistro = await NoticiaRepository.contarRegistros();
          const paginaAtual = req.baseUrl;
          const next = offset + limit;
          const nextPage = next < totalRegistro ? `${paginaAtual}?limit=${limit}&offset=${next} ` : null;
          const previous = offset - limit < 0 ? null : offset - limit;
          const previousPage = previous ? `${paginaAtual}?limit=${limit}&offset=${previous}` : null;


          if (noticias.length === 0) {
               return res.status(400).send({ message: "Nenhum registro cadastrado!" });
          }

          // Resposta para o cliente enviando um objeto
          res.status(200).send({
               nextPage,
               previousPage,
               limit,
               offset,
               totalRegistro,
               results: noticias.map((noticia) => ({
                    id: noticia.id,
                    titulo: noticia.titulo,
                    texto: noticia.texto,
                    banner: noticia.banner,
                    nome: noticia.user.nome,
                    login: noticia.user.login,
                    likes: noticia.likes,
                    comments: noticia.comments,
               }))
          });

     } catch (error) {
          res.status(500).send({ message: error.message });
     }

}

// Função para buscar o primeiro dado de uma lista no banco de dados
const topNews = async (req, res) => {
     try {
          const noticias = await NoticiaRepository.topNews();

          if (!noticias) {
               return res.status(400).send({ message: "Nenhum registro cadastrado!" });
          }

          // Resposta para o cliente enviando um objeto
          res.status(200).send({
               noticias: {
                    id: noticias.id,
                    titulo: noticias.titulo,
                    texto: noticias.texto,
                    banner: noticias.banner,
                    likes: noticias.likes,
                    comments: noticias.comments,
                    nome: noticias.user.nome,
                    login: noticias.user.login,
               },
          });

     }
     catch (error) {
          res.status(500).send({ message: error.message });
     }


}

// Função para buscar registros por Titulo
const buscarPorTitulo = async (req, res) => {
     try {
          // Aqui passamos o parâmetro por query para rota
          const { titulo } = req.query;
          console.log(titulo);

          // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função 
          const noticias = await NoticiaRepository.buscarPorTitulo(titulo);

          // Aqui fazemos uma validação
          if (noticias.length === 0) {
               return res.status(400).send({ message: "Nenhum registro cadastrado nesta busca!" });
          }

          // Resposta para o cliente enviando um objeto
          res.status(200).send({
               results: noticias.map((noticia) => ({
                    id: noticia._id,
                    titulo: noticia.titulo,
                    texto: noticia.texto,
                    banner: noticia.banner,
                    nome: noticia.user.nome,
                    login: noticia.user.login,
                    likes: noticia.likes,
                    comments: noticia.comments,
               }))
          });
     } catch (error) {
          res.status(500).send({ message: error.message });
     }

}

// Função para buscar registros por ID
const buscarPorId = async (req, res) => {
     try {
          // Aqui passamos o parâmetro para rota
          const { id } = req.params;
          // console.log(id);

          // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função 
          const noticia = await NoticiaRepository.buscarPorId(id);

          // Verificar se existe algum registro vindo do banco de dados
          if (!noticia) {
               return res.status(400).send({ message: "Nenhum registro cadastrado!" });
          }

          // Resposta para o cliente enviando um objeto
          res.status(200).send({
               noticia: {
                    id: noticia._id,
                    titulo: noticia.titulo,
                    texto: noticia.texto,
                    banner: noticia.banner,
                    likes: noticia.likes,
                    comments: noticia.comments,
                    nome: noticia.user.nome,
                    username: noticia.user.username,
               },
          });
     } catch (error) {
          res.status(500).send({ message: error.message });
     }

}

// Função para buscar noticias por usuario - especifica da api
const buscarNoticiasPorUsuario = async (req, res) => {
     try {
          // Aqui passamos o parâmetro para rota sem ser desconstruido pois está vindo direto do midlleware de autenticacao
          const id = req.userId;

          const noticias = await NoticiaRepository.buscarNoticiasPorUsuario(id);

          // Resposta para o cliente enviando um objeto com varios registros
          return res.status(200).send({
               results: noticias.map((noticia) => ({
                    id: noticia._id,
                    titulo: noticia.titulo,
                    texto: noticia.texto,
                    banner: noticia.banner,
                    nome: noticia.user.nome,
                    login: noticia.user.login,
                    likes: noticia.likes,
                    comments: noticia.comments,
               }))
          });

     } catch (error) {
          res.status(500).send({ message: error.message });
     }
}
// Função para excluir registros por ID
const excluir = async (req, res) => {
     try {
          // Aqui passamos o parâmetro para rota
          const id = req.params.id;

          // Aqui chamamos o service para buscarPorId o registro no banco de dados, passando o id 
          const noticias = await NoticiaRepository.buscarPorId(id);

          if (noticias.user.id != req.userId) {
               return res.status(400).send({ message: "Você não tem permissão para excluir este registro!" });
          }

          // Aqui chamamos o service para excluir o registro no banco de dados, passando o id e os dados
          await NoticiaRepository.excluir(id);

          // Resposta para o cliente
          res.status(200).send({ message: "Registro excluido com sucesso!" });
     } catch (error) {
          res.status(500).send({ message: error.message });
     }

}

// Função para editar registros
const editar = async (req, res) => {
     try {
          //Receber os dados de um formulário através do body e descontruir por que o body é um objeto
          const { titulo, texto, banner } = req.body;

          // Aqui passamos o parâmetro para rota
          const id = req.params.id;

          // Validar dados
          if (!titulo && !texto && !banner) {
               res.status(400).send({ "message": "Preencher pelo menos um dos campos!" });
          }

          // Aqui chamamos o service para buscarPorId o registro no banco de dados, passando o id 
          const noticias = await NoticiaRepository.buscarPorId(id);

          if (noticias.user.id != req.userId) {
               return res.status(400).send({ message: "Você não tem permissão para editar este registro!" });
          }

          // Aqui chamamos o service para atualizar o registro no banco de dados, passando o id e os dados
          await NoticiaRepository.editar(id, titulo, texto, banner);

          // Resposta para o cliente
          res.status(200).send({ message: "Registro atualizado com sucesso!" });
     } catch (error) {
          res.status(500).send({ message: error.message });
     }

}

// Função para inserir e e excluir likes nas noticias - especifica
const inserirLikes = async (req, res) => {
     try {
          //Receber os dados de um formulário através do body e descontruir por que o body é um objeto
          const { likes } = req.body;

          // Aqui passamos o parâmetro para rota
          const { id } = req.params;
          const userId = req.userId

          // Aqui chamamos o service para buscarPorId o registro no banco de dados, passando o id 
          const likesNoticia = await NoticiaRepository.inserirLikes(id, userId);

          // Caso usuario clique novamente ou chame a função
          if (!likesNoticia) {
               await NoticiaRepository.excluirLikes(id, userId);
               return res.status(200).send({ message: "Like removido com sucesso!" });
          }

          // Resposta para o cliente
          res.status(200).send({ message: "ok like inserido com sucesso!" });
     } catch (error) {
          res.status(500).send({ message: error.message });
     }
}

// Função para inserir comentario nas noticias - especifica
const inserirComentario = async (req, res) => {
     try {
          // Aqui recebemos um id da noticia e passamos como parâmetro para rota
          const { id } = req.params;
          // Aqui recebemos um id do usuario que está fazendo o comentario e passamos como parâmetro para rota
          const userId = req.userId;
          // Aqui recebemos o parametro descontruido, ou seja, em forma de campo, ao inves de objeto vindo do body da requisição

          const { comments } = req.body;

          // Valida se tem comentario para adicionar
          if (!comments) {
               return res.status(400).send({ message: "Comentário não pode ser vazio!" });
          }

          // Aqui chamamos o service para inserir o registro no banco de dados, passando os parametros
          await NoticiaRepository.inserirComentario(id, userId, comments);

          // Resposta para o cliente
          res.status(200).send({ message: "ok comentario inserido com sucesso!" });
     } catch (error) {
          res.status(500).send({ message: "Opa cai no catch, algo errado: " + error.message });
     }

}

// Função para excluir comentario nas noticias - especifica
const excluirComentario = async (req, res) => {
     try {
         // Obtém os parâmetros da requisição
         const { idNoticia, idComentario } = req.params;
         const userId = req.userId;
 
         // Validação de parâmetros obrigatórios
         if (!idNoticia || !idComentario) {
             return res.status(400).send({ message: "ID da notícia e do comentário são obrigatórios!" });
         }
 
         // Busca a notícia para verificar se o comentário existe antes de excluir
         const noticia = await NoticiaRepository.buscarPorId(idNoticia);
         
         if (!noticia) {
               console.log(!noticia)
             return res.status(404).send({ message: "Notícia não encontrada!" });
         }
 
         // Garante que a lista de comentários seja um array válido
         const todosComentarios = Array.isArray(noticia.comments) ? noticia.comments.flat(Infinity) : [];
 
         // Busca o comentário específico pelo ID
         const buscarComentario = todosComentarios.find(
             (comentario) => String(comentario.idComentario) === String(idComentario)
         );
 
         // Se o comentário não for encontrado, retorna erro
         if (!buscarComentario) {
             return res.status(404).send({ message: "Comentário não encontrado!" });
         }

         console.log(buscarComentario)
 
         // Verifica se o usuário tem permissão para excluir
         if (String(buscarComentario.userId) !== String(userId)) {
             return res.status(403).send({ message: "Você não tem permissão para excluir este comentário!" });
         }       
 
         // Agora, exclui o comentário
         await NoticiaRepository.excluirComentario(idNoticia, idComentario, userId);
 
         // Responde ao cliente informando sucesso
         return res.status(200).send({ message: "Comentário excluído com sucesso!" });
 
     } catch (error) {
         console.error("Erro ao excluir comentário:", error);
         res.status(500).send({ message: "Ops! Erro ao excluir comentário: " + error.message });
     }
 };


export default { create, listar, buscarPorId, excluir, editar, topNews, buscarPorTitulo, buscarNoticiasPorUsuario, inserirLikes, inserirComentario, excluirComentario }