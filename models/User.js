import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  foto: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
});

// Aqui é feita a criptografia da senha
UserSchema.pre('save', async function (next) {
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
})

const User = mongoose.model('User', UserSchema);

export default User;