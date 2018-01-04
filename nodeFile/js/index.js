/**
 * Created by fai on 2017/12/16.
 */
   setTimeout(function(){
       //轮播插件
       if(!window.jQuery){
           throw new Error('此函数依赖jQuery函数库');
       }

       jQuery.fn.carousel=function(){
           /*实现图片向左轮播*/
           var cur=0,
               next=1,
               duration=400,
               b='';
           const TIME=5000;


           //定位小图标实现
           var slideToop=function(){
               //console.log(this.children('.slide-btn'))
               //console.log(this.children('.slide-btn').children())

               //图标根据传来的b 值进行激活
               var listB=this.children('.slide-btn').children();
               $(listB[b]).addClass('on').siblings('.on').removeClass('on');

               //点击图标跳转到指定的页面
               listB.each(function(i,val){
                       val.onclick=function(){
                           if(parseInt(this.innerHTML)!==cur){
                               //获取小图标的内容给下一次的next赋值
                               if(parseInt(this.innerHTML)===5){
                                   next=0;
                               }
                               else{
                                   next=this.innerHTML;
                               }
                               //小图标的点亮
                               b=$(this).html()-1;//b标签里的数值和listB中的差一
                               carousel();
                           }
                       }
                   }
               )
           }.bind(this);

           /* 传过来的this是$(#banner)类数组
            console.log(this.innerHTML);
            console.log(this);
            console.log($(this));
            var imgList=$(this).children();s方法2*/

           //设置定时器实现轮播计时
           var t1=setInterval(function(){
               carousel();
           },TIME);

           //实现轮播功能
           /*   console.log(this);*/
           var imgList=this.children('img');
           var carousel=function(){

               $(imgList[cur]).addClass('active').animate({left:'-100%'},duration,function(){

                   $(this).removeClass('active');
               });
               $(imgList[next]).addClass('active').css('left','100%').animate({left:'0'},duration
                   //这个地方要注意this指的是.前元素的值也就是this[cur]的值
               );

               slideToop();
               b=next;
               cur=next;
               next++;
               //console.log(this.length);
               if(next>=imgList.length){
                   next=0;
               }
           }.bind(this);
           carousel();//不能再函数定义之前调用因为js是异步读取；

       };

       jQuery.fn.scrollIndicator=function(){
           //左边栏定位的实现 当到达某处时自动点亮
           this.on('click','a',function(e){
               e.preventDefault();

               //获得a中的属性值
               var loc=$(this).attr('href');
               var current=$(loc).offset().top;
               //$('body').css('scrollTop',current);
               //body跳转
               $('body').animate({scrollTop: current}, 500);
               //得到当前this的scrollTop;
               //var sTop=this.offset().top;
               //console.log(`${loc} and ${sTop}`);

           });
           $(window).scroll(function(){
               var wTop= $(window).scrollTop();
               if(wTop>=902&&wTop<=2100){
                   this.addClass('on');
               }
               else{
                   this.removeClass('on')
               }

           }.bind(this))
       };

//模态框

//登陆
       $('#top .loginBtn').click(function(e){
           e.preventDefault();
           $('#model').css('display','block').children('.uLogin').css('display','block').siblings('.uRegister').css('display','none');
       });
       $('span.close').click(function(){
           $(this).parent().parent().css('display','none');
       });

//注册
       $('#top .registerBtn').click(function(e){
           e.preventDefault();
           $('#model').css('display','block').children('.uRegister').css('display','block').siblings('.uLogin').css('display','none');
       });

   },0);

