const router=require('express').Router();
const pool=require('../db');
const authorization = require('../middleware/authorization');
const authorize=require('../middleware/authorization');
router.get('/',authorization,async(req,res)=>{
    try {
        
        const user=await pool.query('select user_name from users where user_id=$1',[req.user])
        
        res.json(user.rows[0])
    } catch (error) {
        console.log(error.message)
        res.status(500).json('sserver error')
    }
})


module.exports=router;