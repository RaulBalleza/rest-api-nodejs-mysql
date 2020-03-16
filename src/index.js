const express = require('express');
const app = express();

//Settings - Configuracion del servidor
app.set('port',process.env.PORT || 3001);

//Middlewares - Funciones que se ejecutan antes de que se muestren las rutas
app.use(express.json());

//Routes - Rutas de la aplicacion
app.use(require('./routes/user'));
app.use(require('./routes/teacher'));
app.use(require('./routes/student'));
app.use(require('./routes/class'));
app.use(require('./routes/post'));
app.use(require('./routes/task'));
app.use(require('./routes/role'));


//Start the server
app.listen(app.get('port'), () => {
    console.log("Server on port " + app.get('port'));
});