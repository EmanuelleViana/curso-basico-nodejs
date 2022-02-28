const express = require('express');
const { router } = require('../app');
const router = express.Router();

router.get('/', (req,res) => {
  return res.send({message: 'Tudo ok com o metodo GET da rota de USUARIOS!'})
})

router.post('/', (req,res) => {
  return res.send({message: 'Tudo ok com o metodo POST da rota de USUARIOS!'})
})

router.post('create', (request, response) => {
  return res.send({message: 'Seu usuario foi criado com sucesso!'})
})

module.exports = router;