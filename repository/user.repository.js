import User from "../models/User.js";

const create = (body) => User.create(body);

const listar = () => User.find();

const buscarPorId = (id) => User.findById(id);

const buscarPorEmail = (email) => User.findOne({ email: email });

const buscarPorLogin = (login) => User.findOne({ login: login });

const excluir = (id) => User.findByIdAndDelete(id);

const editar = (id,body) =>
  User.findOneAndUpdate(
    { _id: id },
    { body },
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
