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
          return res.status(500).send("Ops! Erro ao tentar inserir registro: "+error.message);
     }

}

// Função para leitura de registros
const listar = async (req, res) => {
     // Variável para receber um query params vindo da requisição
     const { limit, offset } = req.query;
     const paginaAtual = req.baseUrl;

     try {     
          // Variável para receber um conjunto de registros ou array
          const noticias = await NoticiaService.listar(offset, limit, paginaAtual);

          // Resposta para o cliente enviando um objeto
          return res.send(noticias);

     } catch (error) {
          return res.status(500).send("Ops! Erro ao tentar buscar todos registros: "+error.message);
     }

}

// Função para buscar o primeiro dado de uma lista no banco de dados
const topNews = async (req, res) => {
     try {
          const noticia = await NoticiaService.topNews();

          // Resposta para o cliente enviando um objeto
          return res.send(noticia);
     }
     catch (error) {
          return res.status(500).send("Ops! Erro ao tentar buscar primeiro registro: "+error.message);
     }
}

// Função para buscar registros por Titulo
const buscarPorTitulo = async (req, res) => {
     // Aqui passamos o parâmetro por query para rota
     const { titulo } = req.query;

     try {
          // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função 
          const noticias = await NoticiaService.buscarPorTitulo(titulo);

          // Resposta para o cliente enviando um objeto
          return res.send(noticias);
     } catch (error) {
          return res.status(500).send("Ops! Erro ao tentar buscar registro por titulo: "+error.message);
     }

}

// Função para buscar registros por ID
const buscarPorId = async (req, res) => {
     // Aqui passamos o parâmetro para rota
     const { id } = req.params;
     console.log(id)
     try {        

          // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função 
          const noticia = await NoticiaService.buscarPorId(id);          

          // Resposta para o cliente enviando um objeto
          return res.send(noticia);
     } catch (error) {
          return res.status(404).send("Ops! Erro ao tentar buscar registro por id: "+error.message);
     }

}

// Função para buscar noticias por usuario - especifica da api
const buscarNoticiasPorUsuario = async (req, res) => {
     // Aqui passamos o parâmetro para rota sem ser desconstruido pois está vindo direto do midlleware de autenticacao
     const id = req.userId;

     try {
          const noticias = await NoticiaService.buscarNoticiasPorUsuario(id);

          // Resposta para o cliente enviando um objeto com varios registros
          return res.send(noticias);

     } catch (error) {
          return res.status(500).send("Ops! Erro ao tentar buscar registro por usuario: "+error.message);
     }
}
// Função para excluir registros por ID
const excluir = async (req, res) => {
     // Aqui passamos o parâmetro para rota
     const {id} = req.params;
     const userId = req.userId;

     try {               

          // Aqui chamamos o service para excluir o registro no banco de dados, passando o id da registro e do usuario
          await NoticiaService.excluir(id, userId);

          // Resposta para o cliente
         return res.send({ message: "Registro excluido com sucesso!" });
     } catch (error) {          
          return res.status(500).send("Ops! Erro ao tentar excluir registro: "+error.message);
     }

}

// Função para editar registros
const editar = async (req, res) => {
     //Receber os dados de um formulário através do body e descontruir por que o body é um objeto
     const { titulo, texto, banner } = req.body;
     const { id } = req.params;
     const userId = req.userId;

     try {           

          // Aqui chamamos o service para atualizar o registro no banco de dados, passando o id e os dados
          await NoticiaService.editar(id, titulo, texto, banner, userId);

          // Resposta para o cliente
          return res.send({ message: "Registro atualizado com sucesso!" });
     } catch (error) {          
          return res.status(500).send("Ops! Erro ao tentar atualizar registro: "+error.message);
     }

}

// Função para inserir e e excluir likes nas noticias - especifica
const inserirLikes = async (req, res) => {
      // Aqui passamos o parâmetro para rota
      const { id } = req.params;
      const userId = req.userId

     try {                

          // Aqui chamamos o service para buscarPorId o registro no banco de dados, passando o id 
          const response = await NoticiaService.inserirLikes(id, userId);       

          // Resposta para o cliente
          return res.send(response);
     } catch (error) {          
          return res.status(500).send("Ops! Erro ao tentar inserir likes: "+error.message);
     }
}

// Função para inserir comentario nas noticias - especifica
const inserirComentario = async (req, res) => {
     // Aqui recebemos um id da noticia e passamos como parâmetro para rota
     const { id: idNoticia } = req.params;
     // Aqui recebemos um id do usuario que está fazendo o comentario e passamos como parâmetro para rota
     const userId = req.userId;
     // Aqui recebemos o parametro descontruido, ou seja, em forma de campo, ao inves de objeto vindo do body da requisição
     const { comments } = req.body;

     try {  

          // Aqui chamamos o service para inserir o registro no banco de dados, passando os parametros
          await NoticiaService.inserirComentario(idNoticia, userId, comments);

          // Resposta para o cliente
          return res.send({ message: "ok comentario inserido com sucesso!" });
     } catch (error) {
          return res.status(500).send("Ops! Erro ao tentar inserir comentário: "+error.message);
     }

}

// Função para excluir comentario nas noticias - especifica
const excluirComentario = async (req, res) => {
     // Obtém os parâmetros da requisição
     const { idNoticia, idComentario } = req.params;
     const userId = req.userId;

     try {  
 
         // Agora, exclui o comentário
         await NoticiaService.excluirComentario(idNoticia, idComentario, userId);
 
         // Responde ao cliente informando sucesso
         return res.send({ message: "Comentário excluído com sucesso!" });
 
     } catch (error) {         
         return res.status(500).send("Ops!Erro ao tentar excluir comentário: "+error.message);
     }
 };


export default { create, listar, buscarPorId, excluir, editar, topNews, buscarPorTitulo, buscarNoticiasPorUsuario, inserirLikes, inserirComentario, excluirComentario }