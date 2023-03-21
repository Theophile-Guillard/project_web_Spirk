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
  request.open("POST","/try_registration",true);
  request.setRequestHeader("Content-Type","application/json");
  request.addEventListener("load",function(){
    let res=JSON.parse(request.response);
    //if (res.good){
      //куки хранятся паршиво, наполовину строка, наполовину контейнер
      //чтобы нормально его прочитать, надо использовать на document.cookie 
      //всякие паршивые функции split delay parse и т.д.
    let a=document.cookie;
    let b=JSON.parse(a);
    console.log(c)
    console.log(b);
    console.log(a);
    //}

  })
  request.send(user);}else{
    alert(err);
  }
})