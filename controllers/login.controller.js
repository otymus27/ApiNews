// Importar módulo responsável pela comunicação com o banco de dados
import loginService from "../services/LoginService.js";


const login = async (req, res) => {
     //Receber os dados de um formulario, chegando através do body 
     const { email, senha } = req.body;

     try {      
          // Aqui passando parametros para logar e receber o token
          const token = await loginService.login({email, senha});

          // Aqui estou enviando o token como resposta
          return res.send(token);          
     } catch (error) {
          return res.status(401).send(error.message);
     }
     
}

export default {login}