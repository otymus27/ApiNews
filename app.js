// Incluir as bibliotecas e imports
// Biblioteca para gerenciar as requisições, rotas e URLs, entre outra funcionalidades
import express from 'express';
import cors from "cors";//compartilhamento de recursos diferentes entre o frontend com backend !!!muito importante!!!

//Importando modulo de conexão do banco de dados
import db from './database/database.js';

// Importando rotas de acesso

import router from './routes/index.js';

// Chamar a função express
const app = express();

app.use(cors());//usamos aqui para liberar segurança da aplicação e tem que ser configurado antes de chamar as rotas

//Habilita o envio de arquivos json
app.use(express.json());

app.use(router);


// Chamando a função para conectar ao banco de dados
db();

export default app;





