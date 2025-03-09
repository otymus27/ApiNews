import noticiaRepository from "../repository/noticia.repository.js";

// Função para cadastrar registros recebendo os dados através do body
const create = async ({titulo, texto, banner }, userId) => {
         
     // Validar dados
     if (!titulo || !texto || !banner)
     throw new Error("Preencha todos os campos!");    

     // Aqui chamamos o service para cadastrar o registro no banco de dados
     const {id} = await noticiaRepository.create(titulo, texto, banner, userId);

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

export default { create };