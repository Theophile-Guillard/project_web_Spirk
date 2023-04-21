let button=document.querySelector("#save_all");


let name=document.querySelector("#name");
let developer=document.querySelector("#developer");
let publisher=document.querySelector("#publisher");
let platform=document.querySelector("#platform");
let price=document.querySelector("#price");
let discription=document.querySelector("#discription");
let date=document.querySelector("#date");

let name_e=document.querySelector("#name_error");
let developer_e=document.querySelector("#developer_error");
let publisher_e=document.querySelector("#publisher_error");
let platform_e=document.querySelector("#platform_error");
let price_e=document.querySelector("#price_error");
let discription_e=document.querySelector("#discription_error");
let email_e=document.querySelector("#email_error");


button.addEventListener("click", function(){
    let sum_error="";
    let has=false;
    let glob=false;
    let temp=name.value;
    let temp_e=name_e;
    if (temp==""){
        sum_error+="Имя продукта пустое\n";
        has=true;
    }else {
        let s=temp[0];
         let isup=s.toUpperCase();
         if (temp.length<4||temp.length>31){
            has=true;
            sum_error+="Имя продукта должно быть как минимум из 4 символов,но не более 31\n"} 
    }
    if (has){glob=true;
        temp_e.innerHTML="*Имя должно быть не пустым, минимум 4 символа,но не более 31";} else {temp_e.innerHTML="";}
    has=false;
    temp=developer.value;
    temp_e=developer_e;
    if (temp==""){
        sum_error+="Имя разработчика пустое\n";
        has=true;
    }else {
        let s=temp[0];
         let isup=s.toUpperCase();

         if (temp.length<3||temp.length>31){
            has=true;
            sum_error+="Имя разработчика должно быть как минимум из 3 символов,но не более 31\n";}
         else{if (isup!=s){
            has=true;
            sum_error+="Имя разработчика должно быть с большой буквы\n";}}
    }
    if (has){glob=true;
        temp_e.innerHTML="*Имя разработчика должно быть не пустым, с большой буквы, минимум 3 символа,но не более 31";} else {temp_e.innerHTML="";}
    has=false;
    temp=publisher.value;
    temp_e=publisher_e;
    if (temp==""){
        sum_error+="Имя издателя пустое\n";
        has=true;
    }else {
        let s=temp[0];
         let isup=s.toUpperCase();

         if (temp.length<3||temp.length>31){
            has=true;
            sum_error+="Имя издателя должно быть как минимум из 3 символов,но не более 31\n";}
         else{if (isup!=s){
            has=true;
            sum_error+="Имя издателя должно быть с большой буквы\n";}}
    }
    if (has){glob=true;
        temp_e.innerHTML="*Имя издателя должно быть не пустым, с большой буквы, минимум 3 символа,но не более 31";} else {temp_e.innerHTML="";}
    has=false;
    temp=platform.value;
    temp_e=platform_e;
    if (temp==""){
        sum_error+="Название платформы пустое\n";
        has=true;
    }else {
        let s=temp[0];
         let isup=s.toUpperCase();
         let re= /^((Android)|(Windows)|(Linux)|(Mac)){1}/;
         
         if (temp.length>31){
            has=true;
            sum_error+="Название платформы должно быть не более 31\n";}
         else{if (isup!=s){
            has=true;
            sum_error+="Название платформы должно быть с большой буквы\n";}
        else{
            if (!re.test(temp)){
            has=true;
            sum_error+="Название платформы не соответствует ни одному из существующих (Android/Windows/Linux/Mac), или записано не корректно\n";
        }}
        }
    }
    if (has){glob=true;
        temp_e.innerHTML="*Название платформы должно быть не пустым, начинаться с Android/Windows/Linux/Mac, с большой буквы, минимум 3 символа,но не более 31";} else {temp_e.innerHTML="";}
    has=false;
    temp=price.value;
    temp_e=price_e;
    if (temp==""){
        sum_error+="цена пустая\n";
        has=true;
    }else {
        let s=parseInt(temp);
        let numberStr=s.toString(10);
        if (numberStr!=temp||s<=0){ 
            sum_error+="цена указывается только целым положительным числом числом\n";
            has=true;}
    }
    if (has){glob=true;
        temp_e.innerHTML="*Цена указывается только целым положительным числом";} else {temp_e.innerHTML="";}
    has=false;
    temp=discription.value;
    temp_e=discription_e;
    if (temp==""){
        sum_error+="Описание пустое\n";
        has=true;
    }else {
        let s=temp[0];
         let isup=s.toUpperCase();

         if (temp.length<10){
            has=true;
            sum_error+="Описание должно быть не менее 10 символов\n";}
    }
    if (has){glob=true;
        temp_e.innerHTML="*Описание должно быть не менее 10 символов";} else {temp_e.innerHTML="";}
    if (glob){
alert(sum_error);
    }else{


      


        
//добавить фото, жанр, поджанры







let b=document.getElementById('nrol');
let sumtags='';
let button=document.getElementById('sgh');
let k=button.firstChild;
console.log("k",k)
while (k!=null&&k.nextElementSibling!=null){
    k=k.nextSibling;
    let xc=k.firstChild;
    console.log("xc",xc)
    if (xc.checked){
sumtags+='::'+xc.value;
    }
    k=k.nextElementSibling;
   
}

var formData = new FormData();
let a=document.getElementById('photo');
let bv=document.getElementById('save_all');

formData.append('nrol',b.value);
formData.append('tags',sumtags);
formData.append('name',name.value);
formData.append('developer',developer.value);
formData.append('publisher',publisher.value);
formData.append('platform',platform.value);
formData.append('price',price.value);
formData.append('discription',discription.value);
formData.append('date',date.value);


    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/game_upload" , true);
    
    formData.append('photo',a.files[0]);

    if (a.files.length>1){
        for(let i=1;i<a.files.length;i++){
            console.log('photo',i,a.files[i]);
            formData.append('photo'+i,a.files[i]);
        }
    }



    var request = new XMLHttpRequest();
request.open("POST", '/game_upload');
console.log('forming data....');
request.send(formData);
  
alert("Товар добавлен!");
    
window.location.href='index';
    }
})







