require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/authRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const servicesRoute = require('./routes/servicesRoute');
const placesRoute = require('./routes/placesRoute');
const hotelsRoute = require('./routes/hotelsRoute');


const app = express();

// 1) MIDDLEWARES
app.use(express.json());

// 2) ROUTE
app.use('/api/auth', authRouter);
app.use("/api",categoriesRoute);
app.use("/api",servicesRoute);
app.use("/api",placesRoute);
app.use("/api",hotelsRoute);


// 3) MOONGO DB CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then(()=> console.log('Connected to MongoDB!'))
  .catch((errr) => console.log(err));
  
// 5) SERVER 
const PORT = 4200
app.listen(PORT, ()=>{
  console.log(`App runing on ${PORT}`);
});