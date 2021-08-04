const express = require('express');
const Joi = require('joi');
const usuario_model = require('../models/usuario_model');
const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(20)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat: Joi.string().valid(Joi.ref('password')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','co'] } })
})



ruta.get('/',(req,res)=>{
    listarUsuarioActivo()
    .then( usuarios => {
        res.json(usuarios)
    }).catch(err => {
        res.status(400).json({
            error:err
        })
    })

});

ruta.post('/',(req,res)=>{

    let body = req.body;
    
    const {error, value} = schema.validate(
        {nombre:body.nombre,
         email:body.email, 
         password:body.password,
         repeat:body.repeat
        })
    
        if(!error){
        let resultado = crearUsuario(body);
            resultado.then( user =>{
                res.json({
                    valor:user
                })
                }).catch(err => {
                    res.status(400).json({
                        error:err
                     })
            });
        }else{
            res.status(400).json({
                error:error
            })
        }
});


ruta.put('/:email',(req, res)=>{
    
    const {error, value} = schema.validate({nombre:req.body.nombre});
    if(!error){
        let resultado = actualizarUsuario(req.params.email,req.body);
        resultado.then(valor =>{
            res.json({
                valor:valor
            })
        }).catch(err => {
            res.status(400).json({
                error:err
            })
        })
    }else{
        res.status(400).json({
            error:error
        })
    }
});

ruta.put('/update/:id',(req,res)=>{
    let resultado = actualizarUsuarioById(req.params.id,req.body);
    console.log(req.params.id)
    resultado.then(valor =>{
        res.json({
            valor:valor
        })
    }).catch(err => {
        res.status(400).json({
            error:err
        })
    })
});

ruta.delete('/:email',(req,res)=>{
     desactivarUsuario(req.params.email)
        .then( valor => {
            res.json({
                usuario:valor
            })
        }).catch(err => {
            res.status(400).json({
                err:err
            })
        });
})

async function crearUsuario(body){
    let usuario = new usuario_model({
        email  :body.email,
        nombre  :body.nombre,
        apellido :body.apellido,
        password  :body.password,
        tipo :body.tipo,
        direccion :body.direccion,
    });

    return await usuario.save();
};

async function listarUsuarioActivo(){
    let usuarios = await usuario_model.find({"estado":true});
    return usuarios;
};

async function actualizarUsuario(email,body){
    let usuario = await usuario_model.findOneAndUpdate({"email":email},{
        $set:{
            nombre:body.nombre,
            password:body.password
        }
    },{new:true});
    return usuario;
};

async function actualizarUsuarioById(id,body){
    let usuario = await usuario_model.findByIdAndUpdate({"_id":id},{
        $set:{
            nombre:body.nombre,
            apellido:body.apellido,
            direccion:body.direccion,
            email:body.email,
            tipo:body.tipo
        }
    },{new:true});
    return usuario;
};


async function desactivarUsuario(email){
    let resultado = await usuario_model.findOneAndUpdate({"email":email},{
        $set:{
            estado:false
        }
    },{new: true});
    return resultado;
}

module.exports = ruta;