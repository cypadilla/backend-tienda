const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usuario = require('./routes/usuarios');
const producto = require('./routes/productos');

// conexion a base de datos
const uri = "mongodb+srv://cristian:cristancho2020@tienda.dh2pt.mongodb.net/Tienda?retryWrites=true&w=majority";
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


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('ApiRest ok ')
})