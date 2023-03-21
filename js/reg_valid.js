let login=document.querySelector("#reg_log");
let pass=document.querySelector("#reg_pass");

let rbutton=document.querySelector("#reg_save");



rbutton.addEventListener("click", function(){
    let log=login.value;
    let p=pass.value;


    console.log("rbutton",log,p);
  let user=JSON.stringify({login:log,password:p});
  let request=new XMLHttpRequest();
  request.open("POST","/try_registration",true);
  request.setRequestHeader("Content-Type","application/json");
  console.log("rbutton",log,p,user);
  request.addEventListener("load",function(){
    let receivedUser=JSON.parse(request.response);
    console.log("request from server",receivedUser);
  })

  request.send(user);
})