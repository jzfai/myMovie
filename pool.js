/**
 * Created by fai on 2017/12/20.
 */
const mysql=require('mysql');

var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'fai',
    connectionLimit:'10'
});
module.exports=pool;