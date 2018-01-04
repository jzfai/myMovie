/**
 * Created by fai on 2017/12/23.
 */
var app=angular.module('myApp',['ng','ngRoute']);

//配置路由词典
app.config(function($routeProvider){
    $routeProvider
        .when('/index',{
            templateUrl:'tmp/index.html',
            controller:'indexCtrl'
        })
        .when('/movie',{
            templateUrl:'tmp/movie.html',
            controller:'movieCtrl'
        })
        .when('/teleplay',{
            templateUrl:'tmp/teleplay.html',
            controller:'teleplayCtrl'
        })
        .when('/cartoon',{
            templateUrl:'tmp/cartoon.html',
            controller:'cartoonCtrl'
        })
        .when('/variety',{
            templateUrl:'tmp/variety.html',
            controller:'varietyCtrl'

        })
        .when('/detail/:iId',{
            templateUrl:'tmp/detail.html',
            controller:'detailCtrl'
        })
        .when('/play',{
            templateUrl:'tmp/play.html',
            controller:'playCtrl'
        })
        .when('/rank',{
            templateUrl:'tmp/rank.html',
            controller:'rankCtrl'
        })
        .when('/search',{
            templateUrl:'tmp/search.html',
            controller:'searchCtrl'
        })
        .otherwise({redirectTo:'/index'})
});


//配置总控制器
app.controller('mainCtrl',['$scope','$http','$location',
    function($scope,$http,$location){
        $scope.jump=function(path){
            $location.path(path);
        };
        $scope.jumpParams=function(path,params){
            $location.path(`${path}/${params}`)
        };
     //模糊查找
        $scope.inputValue='';
        $scope.search=function(){
           var kw=$scope.inputValue;
            if(kw){
                var page=1;
                $http
                    .get(`/search?kw=${kw}&page=${page}`)
                    .success(function(data){
                       if(!(data.code==0)&&data){
                           for(var i=0;i<data.length;i++){
                               data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString();
                               data[i].dateDate=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                               data[i].dateYear=new Date(data[i].dateTime).toLocaleDateString().slice(0,4);
                           }
                           $scope.searchList=data;
                           //跳转到search页面
                           location.href='#/search';
                       }
                       else if(data.code==0){
                           alert('搜索结果为空');
                       }
                       else{
                           alert('网络连接错误');
                       }
                    });

            }

            //分页符的跳转
            $scope.searchPage=function($event){
                var page=$($event.target).html();
                //jquery 找到当前被点击的元素加上active
                $($event.target).addClass('active').parent().siblings().children('.active').removeClass('active');
                $http
                    .get('/cartoonLt?page='+page)
                    .success(function(data){
                        for(var i=0;i<data.length;i++){
                            //改变日期的显示方式
                            data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString();
                            data[i].dateDate=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                            data[i].dateYear=new Date(data[i].dateTime).toLocaleDateString().slice(0,4);
                        }
                        //更新列表
                        $scope.searchList=data;
                    });
            }
        }

    }
]);
//search
app.controller('searchCtrl',['$scope','$http',
    function($scope,$http){

    }
]);

app.controller('indexCtrl',['$scope','$http',
    function($scope,$http){
            $http
            .get('/foreshow')
            .success(function(data){
                   $scope.fsList=data.slice(0,8);
                });

        /*以下是原生js部分*/

        // jquery发送的请求 发送异步请求获得图片列表
        var getData=function(page,selector){
            $.ajax({
                type:'get',
                url:'http://127.0.0.1:8080/page',
                data:{'page':page},
                success:function(data){

                    //将数据加载到dom树上

                    var html='';
                    for(var i=0;i<data.length;i++){
                        var obj=data[i];
                        html+=`
            <li>
            <a href="#/detail/${obj.iId}"><img src="images/${obj.img}"/></a>
            <p><a href="#/detail/${obj.iId}">${obj.title}</a></p>
            <span>2017-${obj.type}</span>
            </li>
            `;
                    }
                    $(`${selector}`).html(html);
                },
                error:function(){
                    alert('网络连接错误');
                }
            });
        };
        getData(1,'#section div.movListF ul');
        getData(2,'#section div.movListS ul');
        getData(3,'#section div.movListT ul');
        getData(4,'#section div.movListB ul');
        getData(5,'#main div.movListG ul');

       //aside 列表生成
        var aside=function(type,path){
            $.ajax({
                url:`http://127.0.0.1:8080/rank?type=${type}`,
                success:function(data){
                    var list=data.splice(0,14);
                    var html='';
                    for(var i=0;i<list.length;i++){
                        var obj=list[i];
                        var n=i+100+'';
                        n=n.slice(1);
                        html+=` <li class="lfList rtList">
                    <div class="nb">${n}</div>
                    <p> <a href="#/detail/${obj.iId}">${obj.title}</a></p>
                    <div class="dt">${new Date(obj.dateTime).toLocaleDateString().slice(5)}</div>
                   </li>`;
                    }
                    $(`${path}`).html(html);
                },
                error:function(err){
                    alert('网路连接错误');
                }
            });
        };
        aside('喜剧片','ul.asideRm');
        aside('国产剧','ul.asideDsj');
        aside('动漫','ul.asideDm');
        aside('综艺片','ul.asideZyp');
        aside('爱情片','ul.asideGx');
    }]);

//movieCtrl
app.controller('movieCtrl',['$scope','$http',
    function($scope,$http){
        $http
              .get('/foreshow')
              .success(function(data){
                $scope.mList=data.slice(0,8);

               });
        $http
            .get("/xMovie?type=喜剧片")
            .success(function(data){
              for(var i=0;i<data.length;i++){
                  data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString().slice(5);
              }
                $scope.xList=data.slice(0,12);
            });
        $http
                .get("/dMovie?type=动作片")
                .success(function(data){
                for(var i=0;i<data.length;i++){
                    data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                }
                 $scope.dList=data.slice(0,12)
            });
        $http
             .get("/aMovie?type=爱情片")
              .success(function(data){
                for(var i=0;i<data.length;i++){
                    data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                }
                $scope.aList=data.slice(0,12)
            });
        $http
            .get("/kMovie?type=动作片")
            .success(function(data){
                for(var i=0;i<data.length;i++){
                    data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                }
                $scope.kList=data.slice(0,12)
            });

    }]);

//teleplayCtrl
app.controller('teleplayCtrl',['$scope','$http',
    function($scope,$http){
            $http
                .get('/foreshow')
                .success(function(data){
                    $scope.mList=data.slice(0,8);

                });
            $http
                .get("/gTeleplay?type=国产剧")
                .success(function(data){
                    for(var i=0;i<data.length;i++){
                        data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                    }
                    $scope.xList=data.slice(0,12);
                });
            $http
                .get("/tTeleplay?type=港台剧")
                .success(function(data){
                    for(var i=0;i<data.length;i++){
                        data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                    }
                    $scope.dList=data.slice(0,12)
                });
            $http
                .get("/oTeleplay?type=欧美剧")
                .success(function(data){
                    for(var i=0;i<data.length;i++){
                        data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                    }
                    $scope.aList=data.slice(0,12)
                });
            $http
                .get("/rTeleplay?type=日韩剧")
                .success(function(data){
                    for(var i=0;i<data.length;i++){
                        data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                    }
                    $scope.kList=data.slice(0,12)
                });
    }]);

//cartoonCtrl
app.controller('cartoonCtrl',['$scope','$http',
    function($scope,$http){
        var page=1;
        $http
            .get('/cartoonLt?page='+page)
            .success(function(data){
                for(var i=0;i<data.length;i++){
                    data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString();
                    data[i].dateDate=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                    data[i].dateYear=new Date(data[i].dateTime).toLocaleDateString().slice(0,4);
                }
                $scope.cList=data;
            });
        //分页符的跳转
        $scope.toPage=function($event){
            var page=$($event.target).html();
            //jquery 找到当前被点击的元素加上active
            $($event.target).addClass('active').parent().siblings().children('.active').removeClass('active');
            $http
                .get('/cartoonLt?page='+page)
                .success(function(data){
                    for(var i=0;i<data.length;i++){
                        data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString();
                        data[i].dateDate=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                        data[i].dateYear=new Date(data[i].dateTime).toLocaleDateString().slice(0,4);
                    }
                    $scope.cList=data;
            });
        }
    }
]);
//varietyCtrl
app.controller('varietyCtrl',['$scope','$http',
    function($scope,$http){
        var page=1;
        $http
            .get('/varietyLt?page='+page)
            .success(function(data){
                for(var i=0;i<data.length;i++){
                    data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString();
                    data[i].dateDate=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                    data[i].dateYear=new Date(data[i].dateTime).toLocaleDateString().slice(0,4);
                }
                $scope.cList=data;
            });
        //分页符的跳转
        $scope.toPage=function($event){
            var page=$($event.target).html();
            //jquery 找到当前被点击的元素加上active
            $($event.target).addClass('active').parent().siblings().children('.active').removeClass('active');
            $http
                .get('/varietyLt?page='+page)
                .success(function(data){
                    for(var i=0;i<data.length;i++){
                        data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString();
                        data[i].dateDate=new Date(data[i].dateTime).toLocaleDateString().slice(5);
                        data[i].dateYear=new Date(data[i].dateTime).toLocaleDateString().slice(0,4);
                    }
                    $scope.cList=data;
                });
        }
    }

]);
//detail
app.controller('detailCtrl',['$scope','$http','$routeParams',
    function($scope,$http,$routeParams){

        var iId=$routeParams.iId;
        $http
            .get('/detailData?iId='+iId)
            .success(function(data){
                for(var i=0;i<data.length;i++){
                    data[i].dateTime=new Date(data[i].dateTime).toLocaleDateString().slice(0,4);
                }

              $scope.dList=data[0];
            });
        $http
            .get('/detailFs')
            .success(function(data){
                $scope.fList=data;
            });



    }

]);

app.controller('playCtrl',['$scope','$http',
    function($scope,$http){
        $http
            .get('/foreshow')
            .success(function(data){
                $scope.fList=data.slice(0,9);
            })
    }
]);
//rank
app.controller('rankCtrl',['$scope','$http',
    function($scope,$http){
        $http
            .get('/rMovie')
            .success(function(data){
                $scope.mList=data
            });
        $http
            .get('/rTeleplay')
            .success(function(data){
                $scope.tList=data
            });
        $http
            .get('/rCartoon')
            .success(function(data){
                $scope.cList=data
            });
        $http
            .get('/rVariety')
            .success(function(data){
                $scope.vList=data
            })

    }

]);

