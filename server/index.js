const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 1167

app.use(express.static('dist'));

app.listen(PORT, ()=>{
  console.log(`listening on ${PORT}`);
})

