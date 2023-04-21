let f=document.getElementById("describ");

let inf=f.innerHTML;
let ar=inf.split('\n');




console.log("tegeling1",f.innerHTML);
f.innerHTML='';

for (let i=0;i<ar.length;i++){
    

    let ad=document.createElement('p');
    ad.setAttribute('class','localp')
    ad.innerHTML=ar[i];
    //let ad1=document.createElement('p');
    f.append(ad);
  //  f.append(ad1);

}