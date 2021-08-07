const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuario_model = require('../models/usuario_model');
const ruta = express.Router();
const config = require('config');



ruta.post('/',(req,res) => {
    usuario_model.findOne({email:req.body.email})
        .then(datos => {
            if(datos){
                const passValid = bcrypt.compareSync(req.body.password, datos.password);
                if(!passValid) return res.status(400).json({error:'ok',mensaje:'usuario o contraseña incorrectos'})
                const jwtToken = jwt.sign({
                    data: {_id:datos.id,nombre:datos.nombre,email:datos.email }
                  }, config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') });             
                  res.json({
                      usuario:{
                          _id:datos.id,
                          nombre:datos.nombre,
                          email:datos.email
                      },
                      jwtToken
                  })  
                //  jwt.sign({_id:datos.id,nombre:datos.nombre,email:datos.email },'password')  // generacion de token son limite de tiempo
                // res.send(jwtToken);
            }else{
                res.status(400).json({
                    error:'ok',
                    mensaje:'Usuario o contraseña incorrectos'
                })
            }
        })
        .catch(err =>{
            res.status(400).json({
                error:'ok',
                mensaje:'Error en el servicio'
            })
        })
})

module.exports = ruta;