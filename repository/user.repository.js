import User from "../models/User.js";

const create = (nome, login, email, senha, foto, background) => User.create({ nome, login, email, senha, foto, background });

const listar = () => User.find();

const buscarPorId = (idUser) => User.findById(idUser);

const buscarPorEmail = (email) => User.findOne({ email: email });

const buscarPorLogin = (login) => User.findOne({ login: login });

const excluir = (id) => User.findByIdAndDelete(id);

const editar = ( id, nome, login, email, senha, foto, background ) =>
  User.findOneAndUpdate(
    { _id: id },
    { id, nome, login, email, senha, foto, background },
    { rawResult: true }
  );

export default {
  create,
  listar,
  buscarPorId,
  editar,
  excluir,
  buscarPorEmail,
  buscarPorLogin,
};
