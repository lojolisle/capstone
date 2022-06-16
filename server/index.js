import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import drugRoutes from './routes/drugs.js';
import userRoutes from './routes/user.js'

const app = express();
console.log(' in index.js')

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/users', userRoutes); //http://localhost:4000/users/signup
app.use('/drugs', drugRoutes);

// https://www.mpngodb.com/cloud/atlas
const MONGODB_CONNECTION_URL = "mongodb+srv://lislelojo:eliaMDB67!@cluster0.37aex.mongodb.net/drug_db?retryWrites=true&w=majority"

const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_CONNECTION_URL, 
   {  useNewUrlParser: true, 
      useUnifiedTopology: true
   })
   .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
   .catch((error) => console.log(error.message));


