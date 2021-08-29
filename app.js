const express = require('express');
const cors = require('cors');
const config = require('config')
const mongoose = require('mongoose');
const usuario = require('./routes/usuarios');
const producto = require('./routes/productos');
const factura = require('./routes/facturas');
const auth = require('./routes/auth');
const path = require('path');

// conexion a base de datos
const uri = config.get('configDB.HOST');
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then((db) => {
    console.log('base de datos conectada a ',db.connection.name);
})
.catch((err) => console.log('Error conectandose a la base de datos',err));



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/usuarios',usuario);
app.use('/api/productos',producto);
app.use('/api/facturas',factura);
app.use('/api/auth',auth)

app.use('/uploads', express.static(path.resolve('uploads')))

// setear variable development ❯ $env:NODE_ENV="development"
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('ApiRest ok ')
})