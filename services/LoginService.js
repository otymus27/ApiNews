import jwt from "jsonwebtoken";
import userRepository from "../repository/user.repository.js";
import bcrypt from "bcrypt";
import "dotenv/config";

//Função responsável gerar o token
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT,{expiresIn: 86400});

const login = async ({ email, senha }) => {
    const user = await userRepository.buscarPorEmail(email);
  
    // Verifica se usuário existe
    if (!user) throw new Error("Usuário ou senha inválidos!!");
  
    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
  
    if (!isPasswordValid) throw new Error("Senha inválida!!!");
  
    const token = generateToken(user.id);
  
    return token;
  };


export default { login, generateToken };