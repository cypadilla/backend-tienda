const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:false
    },
    direccion:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    estado:{
        type:Boolean,
        default:true
    },
    tipo:{
        type:String,
        required:false
    },
    imagen:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('Usuario',usuarioSchema);