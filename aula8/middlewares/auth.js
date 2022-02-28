const express = require('express');
const jwt = require('jsonwebtoken');


const auth = (req,response,next) => {
  const token_header = req.headers.auth;
  if(!token_header) return response.status(401).send({error: 'Token nao enviado!'});

  jwt.verify(token_header, 'dti@2022', (err, decoded) => {
    if(err) return response.status(401).send({error: 'Token invalido.'});
    response.locals.auth_data = decoded;
    return next();
  })

}

module.exports = auth;