import express from "express";
import data from './data.js';

//creating express app

const app = express();
app.get('/api/products',(request,response)=>{
   response.send(data.products);
});

const port = process.env.PORT||5000;

//calling app.listen,server starts and will be ready to respond to front end
app.listen(port,()=>{
    console.log(`serve at http://localhost:${port}`);
})