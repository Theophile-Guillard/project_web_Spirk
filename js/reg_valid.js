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
    let receivedUser=JSON.parse(request.response);
  })
  request.send(user);}else{
    alert(err);
  }
})