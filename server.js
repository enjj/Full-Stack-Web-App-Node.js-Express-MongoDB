if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '10mb' , extended: false }))
const methodOverride = require('method-override');

const indexRouter = require('./routers/index')
const authorRouter = require('./routers/authors')
const bookRouter = require('./routers/books')

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
  useNewUrlParser: true
})

const db=mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',() => console.log('connected to mongoose'));

app.use('/',indexRouter);
app.use('/authors',authorRouter);
app.use('/books',bookRouter);

app.listen(process.env.PORT || 3000);