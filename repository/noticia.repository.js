import Noticias from "../models/Noticias.js";

function create (titulo, texto, banner,userId){
     return Noticias.create({titulo, texto, banner, user: userId});
};


//listagem com dados dos usuarios
const listar = (offset, limit) => Noticias.find().limit(limit).skip(offset).sort( { titulo: -1 }).populate("user");

// Função para contar registros
const contarRegistros = () => Noticias.countDocuments();

// Função para trazer primeiro registro da lista em ordem descrescente
const topNews = () => Noticias.findOne().sort({_id: -1}).populate("user");

// Função para buscar registros por ID usando populate para trazer dados do usuario tambem, tabela estrangeira
const buscarPorId = (id) => Noticias.findById(id).populate("user");

// Função para buscar registros por titulo usando populate para trazer dados do usuario tambem, tabela estrangeira
const buscarPorTitulo = (titulo) => 
     Noticias.find({
     titulo: {$regex: `${titulo || ""}`,$options: "i"},     
}).sort({_id: -1}).populate("user");


// Função para buscar registros por usuarios 
const buscarNoticiasPorUsuario = (id) => Noticias.find({user: id}).sort({_id: -1}).populate("user");

// Funçao para fazer update de registros
const editar = (id, titulo, texto, banner) => Noticias.findOneAndUpdate(
     { _id: id },
     { titulo, texto, banner },
);

// Funçao para fazer delete de registros
const excluir = (id) => Noticias.findOneAndDelete({ _id: id });

// Função para inserir likes na noticia
const inserirLikes = (id,userId) => Noticias.findOneAndUpdate(
     // aqui é feito um filtro pra verificar se já foi dado like por este usuario
     { _id: id, "likes.userId": { $nin: [userId] } },
     //aqui fazemos um push no campo likes passando o id do usuario
     { $push: { likes: {userId, created: new Date() } } },
);

// Função para exclir ou desfazer likes na noticia
const excluirLikes = (id,userId) => Noticias.findOneAndUpdate(
     // aqui é feito um filtro pra verificar se já foi dado like por este usuario
     { _id: id },
     //aqui fazemos um pull no campo likes passando o id do usuario
     { $pull: { likes: {userId } } },
);

// Função para adicionar comentarios em uma noticia
const inserirComentario = (id, userId, comentario) => {
     //Criamos uma variavel para gerar o id para o comentario
     const idComentario = Math.floor(Date.now() * Math.random()).toString(30);         

     return Noticias.findOneAndUpdate(
          { _id: id },
          { $push: { comments: {idComentario, userId, comentario, created: new Date() } } },
     );
}

// Função para excluir comentarios em uma noticia
const excluirComentario = (idNoticia, idComentario, userId) =>  Noticias.findOneAndUpdate(
     //console.log(idNoticia, idComentario, userId),
          { _id: idNoticia },
          { $pull: { comments: {idComentario, userId} } },
          { new: true } // Opcional: Retorna o documento atualizado
     );

     

export default { create, listar, buscarPorId, editar, excluir, contarRegistros, topNews, buscarPorTitulo, buscarNoticiasPorUsuario, inserirLikes, excluirLikes, inserirComentario, excluirComentario };