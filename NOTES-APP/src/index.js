
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();

//initializacion 
const app = express();
require('./database');
require('./config/passport');

//setting
const PORT = process.env.PORT || 3000 ;

app.set('port',PORT);
app.set('views',path.join(__dirname , 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  runtimeOptions: {                           
      allowProtoPropertiesByDefault: true,
      // allowProtoMethodsByDefault: true
  },
  extname: '.hbs',
}));


app.set('view engine', '.hbs');

//middlaweres
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));   //para que en los formularios se puedan enviar varios metodos(get post put delete) 
app.use(session({
  secret:'mysecretapp',
  resave:true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());




//Global variables
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.error   = req.flash('error');
  res.locals.user  = req.user || null;
   next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//static Files
app.use(express.static(path.join(__dirname,'public')));

//Server is Listenning

app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`);
})

