const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    descripcion:{
        type:String,
        required:false,
    },
    nombre:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    categoria:{
        type:String,
        required:false
    },
    imagen:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('Producto',productoSchema);