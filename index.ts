import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; 
import { AdminRoutes,VandorRoutes } from './routes';
import { MONGO_URI } from './config';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use('/admin', AdminRoutes)
app.use('/vander', VandorRoutes)

mongoose.connect(MONGO_URI).then(result=>{
console.log('database connected')
}).catch(err=>{
    console.log('error',err)
})


app.listen(8000, ()=>{
    console.clear();
    console.log("app is listeneing port no 8000")
})