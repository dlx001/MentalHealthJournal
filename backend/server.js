const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 8000;
const path = require('path')
dotenv.config();
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@usercluster.ty5c9zf.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(dbLink,{useNewURLParser: true, useUnifiedTopology: true}).then(()=>console.log("connected to database"));
const UserModel = require('./models/User')
const app = express();
app.use(cors());
app.use(express.json());

app.post('/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const user = await UserModel.findOne({ email: email });
    const map = new Map(user.calendarMap);
    let noteCollection = [];
    let value = 0;
    if (user.calendarMap && user.calendarMap.get(req.body.date)){
      if(user.calendarMap.get(req.body.date).noteCollection){
        noteCollection=user.calendarMap.get(req.body.date).noteCollection;
      }
    }
    map.set(req.body.date, {
      value: req.body.value,
      noteCollection: noteCollection
    });
    const result = await UserModel.updateOne({ email: email }, { calendarMap: map });
  } catch (err) {
    console.log(err);
  }

});
app.delete('/:email/notes', async(req, res) => {
  console.log("delete attempt");
  const email = req.params.email;
 
   try {
     const user = await UserModel.findOne({ email: email });
     const map = new Map(user.calendarMap);
     let noteCollection = [];
     let value = 0;
     if (user.calendarMap && user.calendarMap.get(req.body.date)){
       if(user.calendarMap.get(req.body.date).value){
         value=user.calendarMap.get(req.body.date).value;
       }
       if(user.calendarMap.get(req.body.date).noteCollection){
         noteCollection=user.calendarMap.get(req.body.date).noteCollection;
         console.log(noteCollection+"found")
       }
     }
     let removeNote = req.body.note;
     noteCollection = noteCollection.filter(note => note.val!=removeNote.val||note.description != removeNote.description||note.time!=removeNote.time)
     map.set(req.body.date, {
       value: value,
       noteCollection: noteCollection
     });
     const result = await UserModel.updateOne({ email: email }, { calendarMap: map });
   } catch (err) {
     console.log(err);
   }
 
 });

app.post('/:email/notes', async(req, res) => {

 const email = req.params.email;

  try {
    const user = await UserModel.findOne({ email: email });
    const map = new Map(user.calendarMap);
    let noteCollection = [];
    let value = 0;
    if (user.calendarMap && user.calendarMap.get(req.body.date)){
      if(user.calendarMap.get(req.body.date).value){
        value=user.calendarMap.get(req.body.date).value;
      }
      if(user.calendarMap.get(req.body.date).noteCollection){
        noteCollection=user.calendarMap.get(req.body.date).noteCollection;
        console.log(noteCollection+"found")
      }
    }
    console.log(noteCollection+ "noteCollection");
    console.log(user.calendarMap);
    noteCollection.push(req.body.note)
    map.set(req.body.date, {
      value: value,
      noteCollection: noteCollection
    });
    const result = await UserModel.updateOne({ email: email }, { calendarMap: map });
  } catch (err) {
    console.log(err);
  }

});


app.get('/:email', async(req, res) => {
  console.log("attempt to add");
  const email = req.params.email;
  let user=null;
  try {
    user = await UserModel.findOne({email:email}); 
    if(user==null){
      user = new UserModel({
        email:email,
        calendarMap: new Map()
      });
      await user.save();
      console.log(user);
    }
  }
  catch (err) {
    console.log(err);
  }
  res.json(user);
});


app.listen(PORT, () => {
  console.log('Server is listening on port 8000');
});
