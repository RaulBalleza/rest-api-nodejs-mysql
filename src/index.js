const express = require('express');
const app = express();

//Settings - Configuracion del servidor
app.set('port',process.env.PORT || 3001);

//Middlewares - Funciones que se ejecutan antes de que se muestren las rutas
app.use(express.json());

//Routes - Rutas de la aplicacion
app.use(require('./routes/employees'));

//Start the server
app.listen(app.get('port'), () => {
    console.log("Server on port " + app.get('port'));
});