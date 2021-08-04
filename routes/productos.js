const express = require('express');
const Joi = require('joi');
const producto_model = require('../models/producto_model');
const ruta = express.Router();


ruta.get('/',(req,res)=>{
    listarProductos()
        .then( cursos =>{
            res.json(cursos)
        }).catch( err => {
            res.status(400).json({
                error:err
            })
        })
})

ruta.get('/:id',(req,res)=>{
    listarUnProducto(req.params.id)
        .then( producto =>{
            res.json(producto)
        }).catch( err => {
            res.status(400).json({
                error:err
            })
        })
})

ruta.post('/',(req,res)=>{
    let resultado = crearProducto(req.body);

    resultado.then( producto => {
        res.json({
            producto
        })
    }).catch(err => {
        res.status(400).json({
            error:err
        })
    })
})

ruta.put('/:id',(req,res) =>{
    let resultado = actualizarProducto(req.params.id,req.body);
    
    resultado.then(producto =>{
        res.json({
            producto
        })
    }).catch(err => {
        res.status(400).json({
            error:err
        })
    })

})

async function listarProductos(){
    let productos = await producto_model.find();
    return productos;
}

async function listarUnProducto(id){
    let producto = await producto_model.findById(id);
    return producto;

}

async function crearProducto(body){
    let producto = new producto_model({
        nombre  :body.nombre,
        descripcion  :body.descripcion,
        precio :body.precio,
        categoria :body.categoria
    });

    return await producto.save();
};

async function actualizarProducto(id,body){
    let producto = await producto_model.findByIdAndUpdate(id,{
        $set:{
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
        }
    },{new:true});
    return producto
}

module.exports = ruta;