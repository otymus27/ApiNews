import mongoose from 'mongoose';

const NoticiasSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //Aqui seria como se fosse uma tabela estrangeira
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',//model ou tabela estrangeira
    required: true,
  },
  likes: [{
    type: Array,   
    require: true,
  }],
  comments: [{
    type: Array,
    require: true,
  }],
});



const Noticias = mongoose.model('Noticias', NoticiasSchema);

export default Noticias;