const express=require('express');
const app=express();
const PORT=3001;
const cors=require('cors');
const regRouter=require('./routes/jwtauth')


app.use(express.json())
app.use(cors())

app.use('/auth',regRouter)



app.listen(PORT,()=>{
    console.log(`listening on post ${PORT}`)
})