const mongoose = require('mongoose');

const DBurl =
  "mongodb+srv://mateojoserocaclemntis17:LACHANCHAESTAENLAPOSILGA10@cluster0.qdxzljj.mongodb.net/app-notes?retryWrites=true&w=majority";

mongoose.connect(DBurl,{
  useNewUrlParser: true,/*  */
  useUnifiedTopology: true,
  /* serverApi: ServerApiVersion.v1  */

 
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));







