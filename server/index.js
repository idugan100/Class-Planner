const express=require('express');
const app=express();
const PORT=5000;
const cors=require('cors');
const regRouter=require('./routes/jwtauth')
const dashRouter=require('./routes/dashboard');


app.use(express.json())
app.use(cors())
//auth router
app.use('/auth',regRouter)
//dashrouter
app.use('/dashboard',dashRouter)



app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})