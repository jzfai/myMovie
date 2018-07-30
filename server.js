/**
 * Created by fai on 2017/12/20.
 */

const http=require('http');
const express=require('express');
const data=require('./data');

/*
* 引入跨域模块
* */
const bodyParser = require("body-parser");        //处理post请求
const cookieParser = require("cookie-parser");    //session
const expressSession = require("express-session");//session
const cors = require("cors");                      //corscon

const movieRouter=require("./router/movieRouter")

let app=express();
http.createServer(app).listen(8080);

//4:配置第三方模块
//4.1:配置跨域模块
//origin 允许来自哪个域名下跨域访问
app.use(cors({
    origin:["http://127.0.0.1"],
    credentials:true
}));
//4.2:post  req.body.uname
app.use(bodyParser.urlencoded({extended:false}));
//4.3:cookie/session
app.use(cookieParser());
app.use(expressSession({
    resave:false,           //每次请求是否重新设置session
    saveUninitialized:true,//每次请求是否设置cookie
    secret:"teducn",       //https加密码传输，密钥
}));


//5:指定静态资源目录  public
app.use(express.static('webFile'));

app.use("/movie",movieRouter);

app.get('/page',data.page);
app.get('/login',data.login);
app.get('/rank',data.rank);
app.post('/register',data.register);
app.get('/foreshow',data.foreshow);
//movie
// app.get('/movie/xMovie',data.xMovie);
// app.get('/movie/aMovie',data.aMovie);
// app.get('/movie/dMovie',data.dMovie);
// app.get('/movie/kMovie',data.kMovie);
//teleplay
app.get('/gTeleplay',data.gTeleplay);
app.get('/tTeleplay',data.tTeleplay);
app.get('/oTeleplay',data.oTeleplay);
app.get('/rTeleplay',data.rTeleplay);
//detail
app.get('/detailData',data.detailData);
app.get('/detailFs',data.detailFs);
//cartoon
app.get('/cartoonLt',data.cartoonLt);
//variety
app.get('/varietyLt',data.varietyLt);
//rank
app.get('/rMovie',data.rMovie);
app.get('/rTeleplay',data.rTeleplay);
app.get('/rCartoon',data.rCartoon);
app.get('/rVariety',data.rVariety);

//关键词的模糊查询
app.get('/search',data.search);

