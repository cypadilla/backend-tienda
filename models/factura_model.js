const { string } = require('joi');
const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
    
    valor:{
        type:Number,
        required:true
    },
    nombreProducto:{
        type:String,
        required:true
    },
    idUsuario:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model('Factura',facturaSchema);