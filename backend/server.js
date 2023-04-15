const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
