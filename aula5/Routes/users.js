const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Users = require('../model/user');

router.get('/', (req, res) => {
  Users.find({}, (error, data) => {
    if(error) return res.send({error: 'Erro na consulta de usuários'});
    return res.send(data);
  });
})

router.post('/create', (request, response) => {
 // const body = request.body;
  // if(!body.email || !body.password) return response.send({error: 'Dados insuficientes!'})
  const { email, password } = request.body; // com destructing
  if(!email || !password) return response.send({error: 'Dados insuficientes!'})

  Users.findOne({ email }, (err, data) => {
    if(err) return response.send({error: 'Erro ao buscar o usuário'});
    if(data) return response.send({ error: 'Usuário já existe!'});

    Users.create({email, password}, (err, data) => {
      if(err) return response.send({error: 'Erro ao salvar usuario'});
      data.password = undefined;
      return response.send(data);
    });
  });// verifica se ja nao existe o usuario pra noa ter duplicatas


})

router.post('/auth', (req, resp) => {
  const { email, password } = req.body;
  if(!email || !password) return resp.send({error: 'Dados insuficientes'})
  Users.findOne( {email}, (err, data) => {
    if(err) return resp.send({error: 'Erro ao buscar usuario.'});
    if(!data) return resp.send({error: 'Usuario nao existe.'});

    bcrypt.compare(password, data.password, (err, same) => {
      if(!same) return resp.send({error: 'Erro au autenticar o usuario'});
      data.password = undefined;
      return resp.send(data);
    })
  }).select('+password');//obriga a fazer selct da senha, pq tinha configurado pra nao fazer antes
})
module.exports = router;