const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
//inicializaciones
const app = express();


//configuraciones
app.set('port', process.env.PORT || 3550);  
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js')
}));
app.set('view engine', 'hbs');

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Variables globales
app.use((req, res, next)=>{

    next();
});

//Rutas
app.use(require('./routes/index.js'));
app.use('/registropersonas',require('./routes/registropersonas.js'));
app.use('/siembras',require('./routes/siembras.js'));
app.use('/inventario',require('./routes/inventario.js'));
app.use(require('./routes/authentication.js'));
app.use('/links',require('./routes/links.js'));
//Publico
app.use(express.static(path.join(__dirname, 'public')));

//Corriendo servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor inicializado en el puerto ', app.get('port'));
})