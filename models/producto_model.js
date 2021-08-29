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
    imgUrl:{
        type:String,
        required:false
    }
});

productoSchema.methods.setImgUrl = function setImgUrl(filename){
    // const port = process.env.PORT || 3000;
    // const host = '';
    this.imgUrl = `${filename}`
}

module.exports = mongoose.model('Producto',productoSchema);