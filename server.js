/**
 * Created by fai on 2017/12/20.
 */

const http=require('http');
const express=require('express');
const data=require('./data');

var app=express();
http.createServer(app).listen(3000);

app.use(express.static('webFile'));

app.get('/page',data.page);
app.get('/login',data.login);
app.get('/rank',data.rank);
app.post('/register',data.register);
app.get('/foreshow',data.foreshow);
//movie
app.get('/xMovie',data.xMovie);
app.get('/aMovie',data.aMovie);
app.get('/dMovie',data.dMovie);
app.get('/kMovie',data.kMovie);
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

