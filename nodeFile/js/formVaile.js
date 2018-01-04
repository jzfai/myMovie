
    /**
     * 表单的认证
     * Created by fai on 2017/12/16.
     */
   setTimeout(function(){
       let iv,nv, vp,vi,code,pResult,tResult,vResult,val,tInput,pInput,vInput,h,nInput,nResult
           ,eInput,eResult,ev;
       var codeArr=[];

       //当登陆按钮点击时
       document.querySelector('#header div.userCenter a.loginBtn').addEventListener('click',function(){
           h=1;
           lInput();
           cFon();
           //h=1 错  注意js是异步读取 注意执行顺序；

       });
       //当注册按钮点击时
       document.querySelector('#header div.userCenter a.registerBtn').addEventListener('click',function(){
           h=2;
           lInput();
           cFon();

       });

       //找到表单中的input元素
       var lInput=function(){
           if(h===1){
               var inputList=document.querySelectorAll('#model div.uLogin .from input');
               tInput=inputList[0];
               pInput=inputList[1];
               vInput=inputList[2];
           }
           else if(h===2){
               inputList=document.querySelectorAll('#model div.uRegister .from input');
               tInput=inputList[0];
               pInput=inputList[1];
               nInput=inputList[2];
               eInput=inputList[3];
               vInput=inputList[4];
           }
       } ;

       //随机生成验证码
       var cFon=function(){
           for(var i=48; i<=57;i++){
               codeArr.push(i);
           }
           for(var j=65;j<=89;j++){
               codeArr.push(j);
           }
           for(var k=97;k<=111;k++){
               codeArr.push(k);
           }
           //随机生成数组下标
           var cNum=function(){
               return parseInt(Math.random()*50);
           };
           //随机生成四个验证码
           var getCode=function(){
               var codeSting='';
               for(var i=0;i<4;i++){
                   codeSting+=String.fromCharCode(codeArr[cNum()]);
               }
               return codeSting;
           };

           //   创建正则表达式 验证格式用
           code=getCode();
           var tReg=/[a-zA-Z][\w]{2,7}/;
           var pReg=/^[a-zA-Z][\w]{5,}$/;//密码要全匹配
           var nReg=/[1][35789][\d]{9}/;
           var eReg=/[\w]{4,11}@[qq.com|.com|.cn]/;


           //将验证码放到dom树上
           vInput.nextElementSibling.innerHTML=code;
           vInput.nextElementSibling.style.display='inline-block';

           // 为 loginbt绑定单击事件得到表单中元素的值，如果验证通过则提交表单 通过当前的input标签进行查找
           vInput.parentElement.parentElement.nextElementSibling.addEventListener('click',function(e){
               var  cur=e.target.className;
               if(h===1){
                   if(cur==='loginBt'){
                       current();
                       if(tResult&&pResult&&vResult){
                           var lname=tInput.value;
                           var lpwd=pInput.value;

                           //格式验证通过发送AJAX请求 验证表单
                           var xhr=new XMLHttpRequest();
                           xhr.onreadystatechange=function(){
                               if(xhr.readyState===4&&xhr.status===200){
                                   var cur=JSON.parse(xhr.responseText);
                                   console.log(cur);

                                   if(cur.code===1){
                                       alert(cur.msg);
                                   }
                                   else if(cur.code===-1){
                                       alert(cur.msg);
                                       tInput.nextElementSibling.nextElementSibling.innerHTML='用户名或密码错误';
                                       tInput.nextElementSibling.nextElementSibling.style.color='red';
                                   }
                               }
                               else if(xhr.status===400){
                                   alert('网络连接错误');
                               }
                           };
                           var lurl=`http://127.0.0.1:8080/login?name=${lname}&pwd=${lpwd}`;
                           xhr.open('get',lurl,true);
                           xhr.send(null);
                       }
                   }
                   else if(cur==='resetBt'){
                       tInput.value ='';
                       pInput.value ='';
                       vInput.value ='';
                   }
               }
               else if(h===2){
                   if(cur==='loginBt'){
                       current();
                       if(tResult&&pResult&&vResult&&eResult&&nResult){
                           var name=tInput.value;
                           var pwd=pInput.value;
                           var valid=vInput.value;
                           var phone=nInput.value;
                           var email=eInput.value;
                           //格式验证通过  发送AJAX请求
                           var xhr=new XMLHttpRequest();
                           xhr.onreadystatechange=function(){
                               if(xhr.readyState===4&&xhr.status===200){
                                   var cur=JSON.parse(xhr.responseText); //别忘了解码

                                   if(cur.code===1){
                                       alert(cur.msg);
                                   }
                                   else{
                                       alert(cur.msg);
                                   }
                               }
                               else if(xhr.status===400){
                                   alert('网络连接错误');
                               }
                           };
                           var url=`http://127.0.0.1:8080/register`;
                           xhr.open('post',url,true);
                           xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

                           xhr.send(`name=${name}&pwd=${pwd}&phone=${phone}&email=${email}&valid=${valid}`);
                       }
                   }
                   else if(cur==='resetBt'){
                       tInput.value ='';
                       pInput.value ='';
                       vInput.value ='';
                       nInput.value ='';
                       eInput.value ='';
                   }
               }
           });

           //表单验证
           //统一验证函数 包括用户名 密码 手机 邮箱
           var vail=function(cInput,cResult,cReg){
               iv=cInput.value;
               var txt=cInput.previousElementSibling.innerHTML;
               cResult=cReg.test(iv);
               if(cResult){
                   cInput.nextElementSibling.nextElementSibling.innerHTML=`${txt} 格式正确`;
               }
               else{
                   cInput.nextElementSibling.nextElementSibling.innerHTML=`${txt} 格式不正确`;
                   cInput.nextElementSibling.nextElementSibling.style.color='red';
               }
               return cResult;
           };

           //验证码 验证
           var vVail=function(){
               vi=vInput.value.toUpperCase();
               vResult=code.toUpperCase()===vi;
               if(vResult){
                   vInput.nextElementSibling.nextElementSibling.innerHTML='验证码格式正确';
               }
               else{
                   vInput.nextElementSibling.nextElementSibling.innerHTML='验证码格式不正确';
                   vInput.nextElementSibling.nextElementSibling.style.color='red';
               }

           };

           //输入框获得焦点时文本提示显示出来
           tInput.onfocus=function(){
               this.nextElementSibling.nextElementSibling.style.display='inline-block';
               this.nextElementSibling.nextElementSibling.innerHTML='首位字符为英文 长度3-8位';
               this.nextElementSibling.nextElementSibling.style.color='blue';
           };
           pInput.onfocus=function(){
               this.nextElementSibling.nextElementSibling.style.display='inline-block';
               this.nextElementSibling.nextElementSibling.innerHTML='首字符为英文  长度大于6位';
               this.nextElementSibling.nextElementSibling.style.color='blue';
           };
           vInput.onfocus=function(){
               this.nextElementSibling.nextElementSibling.style.display='inline-block';
               this.nextElementSibling.nextElementSibling.innerHTML='大小写没有限制';
               this.nextElementSibling.nextElementSibling.style.color='blue';
           };
           if(h===2){
               nInput.onfocus=function(){
                   this.nextElementSibling.nextElementSibling.style.display='inline-block';
                   this.nextElementSibling.nextElementSibling.innerHTML='请正确输入手机号码 13位';
                   this.nextElementSibling.nextElementSibling.style.color='blue';
               };
               eInput.onfocus=function(){
                   this.nextElementSibling.nextElementSibling.style.display='inline-block';
                   this.nextElementSibling.nextElementSibling.innerHTML='请正确输入你的邮箱';
                   this.nextElementSibling.nextElementSibling.style.color='blue';
               };
           }

           //失去焦点后表单验证

           //文本
           tInput.onblur=function(){
               vail(tInput,tResult,tReg);

               //失去焦点时调用正则
               RegularExpress(tInput,tInput.value,reg1);
               RegularExpress(tInput,tInput.value,reg2);
               RegularExpress(tInput,tInput.value,reg3);
           };

           //密码
           pInput.onblur=function(){
               vail(pInput,pResult,pReg);
           };
           //验证码
           vInput.onblur=function(){
               vVail();
           };
           //注册时多出的验证
           if(h===2){
               nInput.onblur=function(){
                   vail(nInput,nResult,nReg);
               };
               eInput.onblur=function(){
                   vail(eInput,eResult,eReg);
               };
           }
           //点击提交前调用
           var current=function(){
               tResult= vail(tInput,tResult,tReg);
               pResult= vail(pInput,pResult,pReg);
               vVail();
               if(h===2){
                   nResult=vail(nInput,nResult,nReg);
                   eResult=vail(eInput,eResult,eReg);
               }
           };

           //用canves 绘图技术创建 验证码
           getCanvas(c1);
           getCanvas(c2);
           function getCanvas(c1){
               c1.width=72;
               c1.height=28;
               var ctx=c1.getContext('2d');
               ctx.fillStyle=getColor(210,230);
               ctx.fillRect(0,0,72,28);

               //渐变颜色
               var g=ctx.createLinearGradient(0,0,72,0);
               g.addColorStop(0,getColor(80,150));
               g.addColorStop(1,getColor(80,150));


               for(var i=0;i<code.length;i++){
                   var str=code[i];


                   ctx.fillStyle=g;
                   var size=getNumber(24,26);
                   ctx.textBaseline='top';
                   ctx.font=`${size}px SimHei`;
                   var deg=getNumber(-45,45);

                   //旋转 偏移
                   ctx.save();
                   ctx.translate(17*(i+1),13);
                   ctx.rotate(deg*Math.PI/180);
                   ctx.fillStyle=getColor(50,180);
                   ctx.fillText(str,-13,-13);
                   ctx.restore();
               }

               //获得随机数字和背景色
               function getNumber(min,max){
                   var n=parseInt(Math.random()*(max-min)+min);
                   return n;
               };
               function getColor(min,max){
                   var r=getNumber(min,max);
                   var g=getNumber(min,max);
                   var b=getNumber(min,max);
                   return `rgb(${r},${g},${b})`;
               };
           }

           //敏感词 替换 replace
           //定义正则查找明感词
           var reg1=/([你我他][娘妹妈])?[草干吊艹]?/ig;
           var reg2=/[tao|淘|ta]?\s[bao|b|宝|ba]?/ig;
           var reg3=/[wo|w|我]?[帅|很帅|真的帅]*/ig;
           var kw;
           //正则函数
           var RegularExpress=function(changElement,currentValue,reg){
               var newValue=currentValue.replace(reg,function(kw){
                   if(kw.length===2){
                       kw='**';
                   }
                   else if(kw.length===3){
                       kw="***";
                   }
                   else if(kw.length===4){
                       kw='你妹的别乱写';
                   }
                   return kw;
                   //console.log(kw);
               });
               //console.log(newValue);
               if(newValue){
                   changElement.value=newValue;
               }
           }

       };
   },0)

