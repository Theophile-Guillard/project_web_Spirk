let login=document.querySelector("#reg_log");
let pass=document.querySelector("#reg_pass");
let rbutton=document.querySelector("#reg_save");


rbutton.addEventListener("click", function(){
    let log=login.value;
    let p=pass.value;

    let err='';
    let b=false;
  if (log.length<5){
    err+='логин должен быть длинной не меньше 5 символов.\n'
  b=true;
  }  
    if (p.length<5){
      err+='пароль должен быть длинной не меньше 5 символов'
  b=true;
    }
    if(!b){
  let user=JSON.stringify({login:log,password:p});
  let request=new XMLHttpRequest();
  request.open("POST","/try_auth",true);
  request.setRequestHeader("Content-Type","application/json");
  request.addEventListener("load",function(){
   // console.log(request.response);
    //console.log(request);
    //console.log(request.good);
    let res=JSON.parse(request.response);
      //куки хранятся паршиво, наполовину строка, наполовину контейнер
      //чтобы нормально его прочитать, надо использовать на document.cookie 
      //всякие паршивые функции split delay parse и т.д.
    //let a=document.cookie;
 //   alert(res.mess);
  //console.log(res.good, res.mess)
    if (res.good){
    window.location.href='index';
    }else{alert(res.mess);}
  })
  request.send(user);}else{
    alert(err);
  }
})