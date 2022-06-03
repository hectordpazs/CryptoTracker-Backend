const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

//CORS
app.use(cors());

//directorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/wallet', require('./routes/wallet'));
app.use('/api/currencie', require('./routes/currencie'));

//escuchar peticiones
const port = process.env.PORT||'3001';

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(port, '0.0.0.0', ()=>{
    console.log(`Servidor corriendo en puerto ${port}`)
});

