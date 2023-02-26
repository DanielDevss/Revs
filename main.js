// TODO - Importaciones
// Paquetes instalados
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
require('dotenv').config();

// Paquetes locales
const routes = require('./src/routes/routes');
const routesBack = require('./src/routes/routesBack');


// TODO midlewares
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/view');
app.use(express.static( __dirname + '/src/public'));

app.use(bodyParser.urlencoded( {extended:false} ));
app.use(bodyParser.json());
app.use(cookieParser());



// TODO servidor
let port = process.env.PORT || 4000;


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

// TODO rutas
app.use(routes);
app.use(routesBack);
