const jwt=require('jsonwebtoken');
require('dotenv').config();

module.exports=async (req,res,next)=>{
    try {
        //get token
        const jwtToken=req.header('token');
        //make sure there is a token
        if(!jwtToken){
            console.log("no token present")
            return res.status(403).json('no token present')
        }
        //check if the jwt token is real
        const payload=jwt.verify(jwtToken,process.env.jwtSecret);
        req.user=payload.user;
        console.log(req.user.user)
        next();

        
    } catch (error) {
        console.error('error not authorixed');
        return res.status(403).json('invalid token')
    }
}