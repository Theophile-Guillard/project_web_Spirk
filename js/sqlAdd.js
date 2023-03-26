
let afc=document.getElementById('sgh');

function arc(nmrol){
  console.log(nmrol);
  let user=JSON.stringify({rol:nmrol});
    let requestx = new XMLHttpRequest();

    
    requestx.open("POST", "/contrust", true);   
    requestx.setRequestHeader("Content-Type", "application/json");
    requestx.addEventListener("load", function () {
			let rec = JSON.parse(requestx.response);
      console.log(rec);
      
      
      while(afc.childElementCount>0){
    afc.removeChild(afc.firstChild);}
   
    let ort=document.createElement('h2');
    ort.innerText=nmrol;
    afc.append(ort);
    console.log('h2',ort.innerText)
      for (let i=0;i<rec.length;i++){


        let div=document.createElement('div');


        let opt=document.createElement('input');
        opt.setAttribute('type','checkbox');
      //  opt.setAttribute('value', rec[i].filter);
        

        let p=document.createElement('p');
        p.innerText=rec[i].filter;
        div.append(opt);
        div.append(p);

        afc.append(div);
        console.log('cry',p.innerText)
        
      }


})
requestx.send(user);
}




let firstl=true;
let agd=document.getElementById("nrol");


agd.addEventListener("click", function(){
  let user=JSON.stringify({awaiter:0});
    let request = new XMLHttpRequest();



    console.log('any?  ',agd.options[agd.selectedIndex].value)
    if (!firstl){arc(agd.options[agd.selectedIndex].value)}
    if (firstl){
    request.open("POST", "/trusting", true);   
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
    
			let rec = JSON.parse(request.response);
      console.log(rec);
    agd.remove(agd.firstChild);
      for (let i=0;i<rec.length;i++){
        let opt=document.createElement('option');
        opt.setAttribute('value', rec[i].name_rol);
        opt.innerText=rec[i].name_rol;
//opt.addEventListener('select',arc(rec[i].name_rol));
        agd.append(opt);
      }
      
    })
      if (firstl){firstl=false;
request.send(user);}}
 }
 )

 //agd.addEventListener('change',arc(agd.options[agd.selectedIndex].value));





