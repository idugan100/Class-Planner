
const Pool=require('pg').Pool;
const pool=new Pool({
    user:"postgres",
    password:"Redmoped16!",
    database:"jtw_auth",
    host:'localhost',
    port:'5432'

});
module.exports=pool;
