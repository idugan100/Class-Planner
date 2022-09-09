const router=require('express').Router();
const pool=require('../db')
const bcrypt=require('bcrypt')

//register
router.post('/register',async(req,res)=>{
    try {
        //get request boyd values
        const{name,email,password}=req.body;
        //check if user exists
        const user=await pool.query('select * from users where user_email=$1',[email])
        if(user.rows.length!=0){
            res.status('401').send("user already exists");
        }
        //bcrypt users password so it is more secure in database and in transit
        const saltRound=10;
        const salt=await bcrypt.genSalt(saltRound);
        const bcryptPassword=await bcrypt.hash(password,salt);
        //enter user into the database
        const newUser= await pool.query('insert into users (user_name,user_email,user_password) values ($1,$2,$3) returning *',[name,email,bcryptPassword])
        //genertae jwt token 
        
        
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
})

module.exports=router;