const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/user');

//FUNCOES AUXILIARES
const createUserToken = (userId) => {
  return jwt.sign({id: userId}, 'dti@2022', { expiresIn: '7d'})
}

router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (error) {
    console.log(error)
    return res.send({
      error: 'Erro na consulta de usuarios'
    });
  }
})

router.post('/create', async (request, response) => {
  const { email, password } = request.body; // com destructing

  if (!email || !password) return response.send({error: 'Dados insuficientes!' })

  try {
    
    if(await Users.findOne({email})) return response.send({error: 'Usuário já registrado'});

    const user = await Users.create({ email, password });
    user.password = undefined;
    return response.send({user,token: createUserToken(user.id)});

  } catch (error) {
    return response.send({error: 'Erro ao buscar o usuário'});
  }

});

router.post('/auth', async (request, response) => {
  const { email, password } = request.body; // com destructing

  if (!email || !password) return response.send({error: 'Dados insuficientes!' })

  try {
        const user = await Users.findOne({email}).select('+password');
    if(!user) return response.send({error: 'Usuario noa existe'});

    const pass_ok = await bcrypt.compare(password, user.password);

    if (!pass_ok) return response.send({
      error: 'Erro au autenticar o usuario'
    });
    user.password = undefined;
    return response.send({user, token: createUserToken(user.id)});

  } catch (error) {
    console.log(error)
    return response.send({error: 'Erro ao buscar o usuário'});
  }
});

module.exports = router;