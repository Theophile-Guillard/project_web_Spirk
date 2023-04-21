
let axc=document.getElementById('nav_bd');
let agd=document.getElementById("nrol");
let j=false;
function arc(nmrol){
  console.log(nmrol);
  let user=JSON.stringify({rol:nmrol});
    let requestx = new XMLHttpRequest();

    
    requestx.open("POST", "/contrust", true);   
    requestx.setRequestHeader("Content-Type", "application/json");
    requestx.addEventListener("load", function () {
			let rec = JSON.parse(requestx.response);
      console.log(rec);
      j=true;
      
      while(axc.childElementCount>0){
    axc.removeChild(axc.firstChild);}
   
    //let ort=document.createElement('h2');
    //ort.innerText=nmrol;
    //axc.append(ort);
   // console.log('h2',ort.innerText)
      for (let i=0;i<rec.length;i++){
        let div=document.createElement('div');
        div.setAttribute('class','regh')
        let opt=document.createElement('input');
        opt.setAttribute('type','checkbox');
        opt.setAttribute('value', rec[i].filter);
        

        let p=document.createElement('p');
        p.innerText=rec[i].filter;
        div.append(opt);
        div.append(p);

        axc.append(div);
     //   console.log('cry',p.innerText)
  
      }
})
requestx.send(user);
}
let firstl=true;

agd.addEventListener("click", function(){
  let user=JSON.stringify({awaiter:0});
    let request = new XMLHttpRequest();
   // console.log('any?  ',agd.options[agd.selectedIndex].value)
    if (!firstl){arc(agd.options[agd.selectedIndex].value)}
    if (firstl){
    request.open("POST", "/trusting", true);   
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
    
			let rec = JSON.parse(request.response);
      console.log(rec);
    agd.remove(agd.firstChild);

    let opt11=document.createElement('option');
    opt11.setAttribute('value', "\%");
    opt11.innerText="Все жанры";
//opt.addEventListener('select',arc(rec[i].name_rol));
    agd.append(opt11);

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





 let fil=document.getElementById('all_filter');
 fil.addEventListener('click',function(){

  let nrol='\%';
  let sumtags=[];                   
  console.log("проверка качества", j)
  if (j){
         
nrol=agd.options[agd.selectedIndex].value;
console.log("роль изменена",nrol);  
} //////главная роль
console.log("а че с ролью?",nrol);
let button=document.getElementById('nav_bd');
let k=button.firstChild;
if (k!=null){
while (k!=null){
  let xc=k.firstChild;
  if (xc.checked){
//sumtags+='-'+xc.value;                          
sumtags.push(xc.value); }

if (k.nextSibling!=null){
  k=k.nextElementSibling;
}else{
  break;
}
}}
    console.log("sumtags",sumtags);

let time_start=document.getElementById('time_start');
let time_end=document.getElementById('time_end');

let tst=document.getElementById('tst');
let ted=document.getElementById('ted');

let adding=';';


console.log(time_start,time_end,time_start.checked,time_end.checked)
if (time_start.checked&&time_end.checked){
  adding='and date_up>='+tst.value+' and date_up<='+ted.value+';';
}else{
  if (time_start.checked){adding='and date_up>='+tst.value+';';}
  if (time_end.checked){adding='and date_up<='+ted.value+';';}
}

let usex1=JSON.stringify({nrol:nrol,sumtags:sumtags,adding:adding});
let requestx1 = new XMLHttpRequest();


requestx1.open("POST", "/filtering", true);   
requestx1.setRequestHeader("Content-Type", "application/json");
requestx1.addEventListener("load", async function () {
  let rec = JSON.parse(requestx1.response);
//  console.log(rec);

let afc=document.getElementById('great')
while(afc.childElementCount>0){
  afc.removeChild(afc.firstChild);}

  let xz=document.createElement('h1');
  xz.innerText='Популярные игры';
  afc.append(xz);
  console.log("проверка факта захода2");
for (let i=0;i<rec.length;i++){
       
  let one=document.createElement('div');
  one.setAttribute('class', "one-element");
  afc.append(one);
  
  let a=document.createElement('a');
  a.setAttribute('href','/game?id='+rec[i].id_game);
  a.innerText=rec[i].name;
  one.append(a);

  let two=document.createElement('div');
  two.setAttribute('class', "one-element-context");
  one.append(two);

  let img=document.createElement('img');

  const blobs=new Blob([new Uint8Array(rec[i].main_img.data)]);

  let urt=URL.createObjectURL(blobs);
  img.setAttribute('src',urt);

  const buffer = await rec[i].main_img;
  const bytes = new Uint8Array(buffer);
  const decoder = new TextDecoder('utf8');

  const image = document.createElement('image');
  image.src = btoa(decoder.decode(bytes));

  img.setAttribute('width',200);
  img.setAttribute('height',150);
  img.setAttribute('alt',rec[i].name);
  two.append(img);

  let three=document.createElement('div');
  three.setAttribute('class', "one-element-disc");
  one.append(three);

  let tags=document.createElement('ul');
  three.append(tags);

  let t2=document.createElement('li');
  t2.innerText='Год выпуска: '+rec[i].date_up;
  tags.append(t2);

  let t3=document.createElement('li');
  t3.innerText='Разработчик: '+rec[i].developer;
  tags.append(t3);

  let t4=document.createElement('li');
  t4.innerText='Издатель: '+rec[i].publisher;
  tags.append(t4);

  let t5=document.createElement('li');
  t5.innerText='Платформа: '+rec[i].platform;
  tags.append(t5);

  let t6=document.createElement('li');
  t6.innerText='Цена: '+rec[i].price+' руб.';
  tags.append(t6);

  let discer=document.createElement('div');
  discer.setAttribute('class','overflowx');
  three.append(discer);

  console.log("проверка факта захода");
  let px=document.createElement('p');
  px.setAttribute("class","localp1");
  px.innerText="Жанр: "+rec[i].gen_filter;
  discer.append(px)

  let strig=rec[i].side_filters.split("::");
        for (let gf=0;gf<strig.length;gf++){
          if (strig[gf].length>0){
        let p=document.createElement('p');
        p.setAttribute('class','localp')
        p.innerText="-"+strig[gf];
        discer.append(p)}}


//  console.log(one.innerHTML);



}

})

  requestx1.send(usex1);

 })
 





