const express = require('express');
const Joi = require('joi');
const factura_model = require('../models/factura_model');
const ruta = express.Router();
const upload = require('../libs/storage')


ruta.get('/:id',(req,res)=>{
    listarFacturas(req.params.id)
        .then( facturas =>{
            res.json(facturas)
        }).catch( err => {
            res.status(400).json({
                error:err
            })
        })
})

// ruta.get('/:id',(req,res)=>{
//     listarUnProducto(req.params.id)
//         .then( producto =>{
//             res.json(producto)
//         }).catch( err => {
//             res.status(400).json({
//                 error:err
//             })
//         })
// })

ruta.post('/',(req,res)=>{

    let resultado = crearFactura(req.body);

    resultado.then( factura => {
        res.json({
            factura
        })
    }).catch(err => {
        res.status(400).json({
            error:err
        })
    })
})

// ruta.put('/:id',(req,res) =>{
//     let resultado = actualizarProducto(req.params.id,req.body);
    
//     resultado.then(producto =>{
//         res.json({
//             producto
//         })
//     }).catch(err => {
//         res.status(400).json({
//             error:err
//         })
//     })

// })

async function listarFacturas(id){
    let facturas = await factura_model.find({"idUsuario":id});
    return facturas;
}

async function listarUnProducto(id){
    let producto = await producto_model.findById(id);
    return producto;

}

async function crearFactura(body){
    const factura = new factura_model  ({
        valor: body.valor,
        nombreProducto:body.nombreProducto,
        idUsuario:body.idUsuario
    });

    return await factura.save();
};

async function actualizarProducto(id,body){
    let producto = await producto_model.findByIdAndUpdate(id,{
        $set:{
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            categoria: body.categoria,
            
        }
    },{new:true});
    return producto
}

module.exports = ruta;