const express = require('express');
const mongoose = require('mongoose');
const dbLink = "mongodb+srv://pacebook:test31415@cluster0.y7amop4.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbLink,{useNewURLParser: true, useUnifiedTopology: true}).then(()=>console.log("connected to database"));
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
