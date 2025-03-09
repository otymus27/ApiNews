// import mongoose, { connect } from "mongoose";

// mongoose.connect('mongodb://admin:123@localhost:27017/db_consultorio?authSource=admin');

// const db = mongoose.connection;

// db.on('Erro: ', console.error.bind(console, 'Erro de conexão!!!'));

// db.once(
//      'open', function () {
//           console.log('Conexão com banco de dados feita com sucesso!');
//      }
// )

// export default db;

import mongoose, { connect } from "mongoose";

const db = () => {

     console.log("Esperando conectar ao banco de dados!");

     mongoose.connect( process.env.MONGODB_URI)     
     .then(() =>console.log("Conectado ao banco de dados!"))
     .catch(error => console.log(error));
     
}        

export default db;