const router=require('express').Router();
const pool=require('../db')
const bcrypt=require('bcrypt')
const jwtGenerator=require('../utilities/jwtGenerator.js')
const validInfo=require('../middleware/validInfo.js')
const authorize=require('../middleware/authorization')

//register with middle ware that check is all info has been entered and if formatted correctly

router.post('/register',validInfo,async(req,res)=>{
    try {
        //get request boyd values
        const{name,email,password}=req.body;
        //check if user exists
        const user=await pool.query('select * from users where user_email=$1',[email])
        if(user.rows.length!=0){
            return res.status(401).send("user already exists");
        }
        //bcrypt users password so it is more secure in database and in transit
        const saltRound=10;
        const salt=await bcrypt.genSalt(saltRound);
        const bcryptPassword=await bcrypt.hash(password,salt);
        //enter user into the database
        const newUser= await pool.query('insert into users (user_name,user_email,user_password) values ($1,$2,$3) returning *',[name,email,bcryptPassword])
        //genertae jwt token and return it as a response
        const token=jwtGenerator(newUser.rows[0].user_id);
        return res.json({token})

        
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("server error")
    }
})

//login route with middle ware that check is all info has been entered and if formatted correctly

router.post('/login',validInfo,async(req,res)=>{
    //get request data
    const {name,email,password}=req.body;
    //check that user exists
    const user=await pool.query('select * from users where user_email=$1',[email])
    if(user.rows.length==0){
        return res.status(401).json("Invalid credentials")
    }

    //check if incoming password is the same as the one in our database
    const passwordComp=await bcrypt.compare(password,user.rows[0].user_password)
    if(!passwordComp){
        return res.status(401).json("Invalid credentials")
    }
    //generate jwt token
    token=jwtGenerator(user.rows[0].user_id);
    res.json({token});


try {
    
} catch (error) {
    res.status(500).send('Server error');
    
}
})

//verify route
router.get("/verify", authorize,async (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports=router;