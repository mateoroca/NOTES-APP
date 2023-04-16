const mongoose = require('mongoose');
require('dotenv').config({path:'../.env'});


const DB_URL = process.env.DB_URL;
  

mongoose.connect(DB_URL,{
  useNewUrlParser: true,/*  */
  useUnifiedTopology: true,
  /* serverApi: ServerApiVersion.v1  */

 
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));







