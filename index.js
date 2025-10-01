const {APP_PORT}=process.env;
console.log("starting up app.js") //debug
//importing express
const express = require("express");
//calling the function that creates the process
const app = express();
//lets enable static  assets
app.use(express.static('public'));

//enable json decoding for req.body (body parser)
app.use(express.json());
//cors 
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE'
  
};

app.use(cors(corsOptions));

app.listen(APP_PORT,()=>{
  console.log(`API server listening on port ${APP_PORT}`);
})