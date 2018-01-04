/**
 * Created by fai on 2017/12/20.
 */
const mysql=require('mysql');
const pool=require('./pool');
const qs=require('querystring');

module.exports={
    //index的数据请求
    rank:(req,res)=>{
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            conn.query('SELECT title,dateTime,iId FROM f_imgList WHERE type=? ORDER BY score',
                [type],(err,data)=>{
                res.json(data);
                conn.release();//记得连接池一定要释放；
            });
        });
    },
    page:(req,res)=>{
        var page=req.query.page;
        pool.getConnection((err,conn)=>{
            var index = (page-1)*12 ;
            conn.query("SELECT * FROM f_imgList LIMIT ?,12",[index],(err,data)=>{
                res.json(data);
                conn.release();
            });
        });
    },

    //表单验证
    login:(req,res)=>{
        var obj=req.query;
        var name=req.query.name;
        var pwd=req.query.pwd;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT name,pwd FROM f_user WHERE name=? AND pwd=?",
            [name,pwd],(err,data)=>{
                    if(data.length>0){
                        var json={
                            code:1,msg:'登陆成功'
                        }
                    }
                    else{
                        var json={
                            code:-1,msg:'登陆失败'
                        }
                    }
                    res.json(json);
                    conn.release();
                });
        });
    },

    //表单注册
    register:(req,res)=>{
        req.on('data',(buf)=>{
            var str=buf.toString();
            var obj=qs.parse(str);
            var date=new Date().getTime();
            pool.getConnection((err,conn)=>{
                conn.query('INSERT INTO f_user VALUES(NULL,?,?,?,?,?,?)',
                    [obj.name,obj.pwd,obj.valid,date,obj.phone,obj.email],(err,result)=>{
                        if(result.insertId){
                            var json={
                                code:1,msg:'注册成功',
                                uId:result.insertId
                            }
                        }
                        else{
                            var json={
                                code:-1,msg:'注册失败'
                            }
                        }
                        res.json(json);
                        conn.release();
                    });
            });
        })
    },

    //foreshow
    foreshow:function(req,res){
        pool.getConnection((err,conn)=>{
            conn.query("SELECT title,img,iId FROM f_foreshow",
                (err,data)=>{
                    res.json(data);
                    conn.release();
                });
        });
    },

    //moive
    xMovie:function(req,res){
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT title,img,iId,type,dateTime FROM f_movie WHERE type=?",
                [type],(err,data)=>{
                    res.json(data);
                    conn.release();
                });
        });
    },
    aMovie:function(req,res){
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT title,img,iId,type,dateTime FROM f_movie WHERE type=?",
                [type],(err,data)=>{
                    res.json(data);
                    conn.release();
                });
        });
    },
    kMovie:function(req,res){
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT title,img,iId,type,dateTime FROM f_movie WHERE type=?",
                [type],(err,data)=>{
                    res.json(data);
                    conn.release();
                });
        });
    },
    dMovie:function(req,res){
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT title,img,iId,type,dateTime FROM f_movie WHERE type=?",
                [type],(err,data)=>{
                    res.json(data);
                    conn.release();
                });
        });
    },

//  teleplay
    gTeleplay:function(req,res){
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT title,img,iId,type,dateTime FROM f_teleplay WHERE type=?",
                [type],(err,data)=>{
                    res.json(data);
                    conn.release();
                });
        });
    },
    tTeleplay:function(req,res){
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT title,img,iId,type,dateTime FROM f_teleplay WHERE type=?",
                [type],(err,data)=>{
                    res.json(data);
                    conn.release();
                });
        });
    },
    oTeleplay:function(req,res){
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT title,img,iId,type,dateTime FROM f_teleplay WHERE type=?",
                [type],(err,data)=>{
                    res.json(data);
                    conn.release();
                });
        });
    },
    rTeleplay:function(req,res){
        var type=req.query.type;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT title,img,iId,type,dateTime FROM f_teleplay WHERE type=?",
                [type],(err,data)=>{
                    res.json(data);
                    conn.release();
                });
        });
    },
//    detail
    detailData:(req,res)=>{
        var iId=req.query.iId;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT * FROM f_imgList WHERE iId=?",[iId],(err,data)=>{
                res.json(data);
                conn.release();
            })
        });

    },
    detailFs:(req,res)=>{
        pool.getConnection((err,conn)=>{
            conn.query("SELECT img,title,iId FROM f_foreshow LIMIT ?,?",[0,8],(err,data)=>{
                res.json(data);
                conn.release();
            });
        })
    },

    //cartoon
    cartoonLt:(req,res)=>{
        var page=(req.query.page-1)*10;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT * FROM f_cartoon LIMIT ?,?",[page,10],
                (err,data)=>{
                    res.json(data);
                    conn.release();
                });
        })
    },
    //variety
    varietyLt:(req,res)=>{
        var page=(req.query.page-1)*10;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT * FROM f_variety LIMIT ?,?",[page,10],
                (err,data)=>{
                    res.json(data);
                    conn.release();
                });
        })
    },
    //rank
    rVariety:(req,res)=>{
        pool.getConnection((err,conn)=>{
            conn.query("SELECT * FROM f_variety ORDER BY click LIMIT ?,?",
                [0,10],(err,data)=> {
                    res.json(data);
                    conn.release();
                })
        });
    },
    rMovie:(req,res)=>{
        pool.getConnection((err,conn)=>{
            conn.query("SELECT * FROM f_movie ORDER BY click LIMIT ?,?",
                [0,9],(err,data)=> {
                    res.json(data);
                    conn.release();
                })
        });
    },
    rCartoon:(req,res)=>{
        pool.getConnection((err,conn)=>{
            conn.query("SELECT * FROM f_cartoon ORDER BY click LIMIT ?,?",
                [0,9],(err,data)=> {
                    res.json(data);
                    conn.release();
                })
        });
    },
    rTeleplay:(req,res)=>{
        pool.getConnection((err,conn)=>{
            conn.query("SELECT * FROM f_teleplay ORDER BY click LIMIT ?,?",
                [0,9],(err,data)=> {
                    res.json(data);
                    conn.release();
                })
        });
    },
    //关键词的模糊查询
    search(req,res){
        var page=(req.query.page-1)*10;
        var kw=req.query.kw;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT * FROM f_imgList WHERE title LIKE ? OR actor LIKE ? LIMIT ?,?",
                [`%${kw}%`,`%${kw}%`,page,10],(err,data)=>{
                    if(data.length>0){
                        res.json(data);
                        conn.release();
                    }
                    else{
                        var arr={code:0};
                        res.json(arr);
                        conn.release();
                    }
                });
        })
    }
};
