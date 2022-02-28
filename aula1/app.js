const express = require('express');
const app = express();

app.get('/', (req,res) => {
  //acessar query params
  let queryParams = req.query;
  return res.send({message: `Tudo OK com o método GET!. Você enviou o nome ${queryParams.nome} com idade de ${queryParams.idade} anos!`});
})

app.post('/', (req,res) => {
  return res.send({message: 'Tudo OK com o método POST!'});
})

app.listen(3000);
module.exports = app;