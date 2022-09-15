import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
const app = express()
const PORT = process.env.PORT || 8080
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/api', router);

app.use((req, res)=>{
    res.status(404).send({error: 'Not found'})
});

//--------SERVER---------//
app.listen(PORT, () =>{
    console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})