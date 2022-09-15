const router=require('express').Router();
const pool=require('../db');
const authorization = require('../middleware/authorization');
const authorize=require('../middleware/authorization');
router.get('/',authorization,async(req,res)=>{
    try {
        console.log(req.user);
        
        const user=await pool.query('select user_name from users where user_id=$1',[req.user])
        console.log(user.rows);
        const classes=await pool.query('select Classes.classname, Classes.semester, Classes.year from Classes JOIN Users ON Classes.user_id=CAST(Users.user_id as varchar) where Users.user_id=$1',[req.user])
        console.log(classes.rows);
        res.json({username:user.rows[0],classes:{...classes.rows}})
    } catch (error) {
        console.log(error.message)
        res.status(500).json('sserver error')
    }
})


module.exports=router;
//sql query for getting classes
//select Classes.classname, Classes.semester, Classes.year from Classes JOIN Users ON Classes.user_id=CAST(Users.user_id as varchar) where Users.user_id='04edadd5-3672-459e-9827-224415177ef2';
