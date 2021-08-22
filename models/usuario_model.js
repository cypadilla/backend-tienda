const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
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
        required:false
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
    },
    permisos:{
        add:Boolean,
        put:Boolean,
        delete:Boolean
    },
    permisosAdmin:{
        put:Boolean,
        delete:Boolean,
    }
});

module.exports = mongoose.model('Usuario',usuarioSchema);