const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//MONGOOSE
const url = 'mongodb+srv://usuario_admin:Do2XqNPcqBWbAvI9@clusterapi.qe51v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const options = { useNewUrlParser: true,  maxPoolSize: 50,
  wtimeoutMS: 2500, }

mongoose.connect(url, options);
// mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão com o banco de dados' + err);
})
mongoose.connection.on('disconnected', () => {
  console.log('Aplicação desconevtada do banco de dados')
})
mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada ao banco de dados!')
})

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;