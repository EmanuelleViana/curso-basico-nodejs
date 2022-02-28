const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req,res) => {
  console.log(res.locals.auth_data);
  return res.send({message: 'Informacao confidencial, so com token. Voce conseguiu chegar ate aqui :)'})
})

router.post('/', (req,res) => {
  return res.send({message: 'Tudo ok com o metodo POST da raíz!'})
})

module.exports = router;