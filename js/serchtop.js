let az=document.getElementById('drender');
let search_b=document.getElementById("serc");
search_b.addEventListener("input", function(){
  let user=JSON.stringify({sear:search_b.value});

 
    let request = new XMLHttpRequest();
    //console.log(userName,userPassword);
    request.open("POST", "/filteringSearch", true);   
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
			let rec = JSON.parse(request.response);
 
   console.log(rec,rec.length);
    
  while (az.firstChild!=null){
    console.log("we work?")
  az.removeChild(az.firstChild);}   

for (let i=0;i<rec.length;i++){
    let a=document.createElement('input');
    a.setAttribute('type','button');
    a.setAttribute('class','search');
    a.setAttribute('value',rec[i].name);
    a.addEventListener('click',function(){
        window.location.href='/game?id='+rec[i].id_game;
    })
    az.append(a);
    console.log(i,"we trying?", az.childElementCount,az.childNodes)
}

      })
      if (search_b.value.length>0){
request.send(user);	  }})