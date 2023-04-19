const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@usercluster.ty5c9zf.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(dbLink,{useNewURLParser: true, useUnifiedTopology: true}).then(()=>console.log("connected to database"));
const UserModel = require('./models/User')
const app = express();
app.use(cors());
app.use(express.json());

app.get('/:email', async(req, res) => {
  console.log("attempt to add");
  const email = req.params.email;
  let user=null;
  try {
    user = await UserModel.findOne({email:email}); 
    if(user==null){
      user = new UserModel({
        email:email,
      });
      await user.save();
      console.log(user);
    }
  }
  catch (err) {
    console.log(err);
  }
  console.log(user +"found")
  res.json(user);
});


app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
