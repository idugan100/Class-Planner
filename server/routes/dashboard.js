const router=require('express').Router();
const pool=require('../db');
const authorization = require('../middleware/authorization');
const authorize=require('../middleware/authorization');
//get all classes 
router.get('/classes',authorization,async(req,res)=>{
    try {
        
        const classes=await pool.query('select Classes.id, Classes.classname, Classes.semester, Classes.year from Classes JOIN Users ON Classes.user_id=CAST(Users.user_id as varchar) where Users.user_id=$1',[req.user])
        
        res.json({...classes.rows})
    } catch (error) {
        console.log(error.message)
        res.status(500).json('sserver error')
    }
})
//get username
router.get('/username',authorization,async(req,res)=>{
    try {
        console.log(req.user);
        
        const user=await pool.query('select user_name from users where user_id=$1',[req.user])
        console.log(user.rows);
        res.json(user.rows[0]); 
    } catch (error) {
        console.log(error.message)
        res.status(500).json('sserver error')
    }
})
//delete a class by id
router.delete('/classes',authorization,async(req,res)=>{
    try {
        console.log(req.user);
        const {id}=req.body;
        
        const user=await pool.query('delete from classes where id=$1',[id])
        console.log(user.rows);
        res.send("deleted")
    } catch (error) {
        console.log(error.message)
        res.status(500).json('server error')
    }
})
//add a class
router.post('/classes',authorization,async(req,res)=>{
    try {
        const {className,semester,year}=req.body;
        const userId=req.user
        const newClass=pool.query('insert into Classes values ($1,$2,$3,$4)',[userId,className,semester,year])
        res.send("added...")
    } catch (error) {
        console.log(error.message)
        res.status(500).json('server error')
        
    }
})



module.exports=router;

