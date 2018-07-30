
const mysql=require('mysql');

let pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'fai',
    connectionLimit:'10'
});
module.exports=pool;