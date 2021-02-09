
require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', cors(), (req, res) => {
  res.json('who goes there?')
});

app.get('/api/product/:productId', (req, res) => {
  const id = req.params.productId;
  const config = {
    method: 'GET',
    url: `http://localhost:3000/api/product/${id}`,
    headers: { },
  };

  axios(config)
    .then((response) => {
      res.send(response.data).status(200);
    })
    .catch((err) => {
      res.send(`An error occured: ${err}`)
    })
});

app.listen(PORT, ()=>{
  console.log(`Proxy server listening on ${PORT}`);
})

