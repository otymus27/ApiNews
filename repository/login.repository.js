import User from "../models/User.js";

const loginRepository = (email) => User.findOne({ email: email }); // temos chaves dentro da função, temos um filtro de pesquisa 

export { loginRepository };