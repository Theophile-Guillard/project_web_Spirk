let button=document.querySelector("#save_all");


let name=document.querySelector("#name");
let developer=document.querySelector("#developer");
let adress=document.querySelector("#adress");
let count_bed=document.querySelector("#count_bed");
let price=document.querySelector("#price");
let discription=document.querySelector("#discription");
let date=document.querySelector("#date");

let name_e=document.querySelector("#name_error");
let developer_e=document.querySelector("#developer_error");
let adress_e=document.querySelector("#adress_error");
let count_bed_e=document.querySelector("#count_bed_error");
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
        sum_error+="Название пустое\n";
        has=true;
    }else {
        let s=temp[0];
         let isup=s.toUpperCase();
         if (temp.length<4||temp.length>60){
            has=true;
            sum_error+="Название должно быть как минимум из 4 символов,но не более 31\n"} 
    }
    if (has){glob=true;
        temp_e.innerHTML="*Название должно быть не пустым, минимум 4 символа,но не более 60";} else {temp_e.innerHTML="";}
    has=false;
    temp=developer.value;
    temp_e=developer_e;
    if (temp==""){
        sum_error+="Имя контактного лица пустое\n";
        has=true;
    }else {
        let s=temp[0];
         let isup=s.toUpperCase();

         if (temp.length<3||temp.length>60){
            has=true;
            sum_error+="Имя контактного лица должно быть как минимум из 3 символов,но не более 60\n";}
         else{if (isup!=s){
            has=true;
            sum_error+="Имя контактного лица должно быть с большой буквы\n";}}
    }
    if (has){glob=true;
        temp_e.innerHTML="*Имя контактного лица должно быть не пустым, с большой буквы, минимум 3 символа,но не более 60";} else {temp_e.innerHTML="";}
    has=false;
    temp=adress.value;
    temp_e=adress_e;
    if (temp==""){
        sum_error+="Адрес пустой\n";
        has=true;
    }else {
        let s=temp[0];
         let isup=s.toUpperCase();

         if (temp.length<3||temp.length>120){
            has=true;
            sum_error+="Адрес должно быть как минимум из 3 символов,но не более 120\n";}
         
    }
    if (has){glob=true;
        temp_e.innerHTML="*Адрес должно быть не пустым, минимум 3 символа,но не более 120";} else {temp_e.innerHTML="";}
    has=false;
    temp=count_bed.value;
    temp_e=count_bed_e;
    if (temp==""){
        sum_error+="Количество койко-мест пустое\n";
        has=true;
    }else {
        let s=temp[0];
         let isup=s.toUpperCase();
         
         
         if (temp.length>120){
            has=true;
            sum_error+="Количество койко-мест должно быть не более 120\n";}
         
        }
    
    if (has){glob=true;
        temp_e.innerHTML="*Количество койко-мест должно быть не пустым";} else {temp_e.innerHTML="";}
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

let b=document.getElementById('nrol');
let sumtags='';
let button=document.getElementById('sgh');
let k=button.firstChild;
while (k.nextElementSibling!=null){
    k=k.nextElementSibling;
    let xc=k.firstChild;
    if (xc.checked){
sumtags+='::'+xc.value;
    }
}

var formData = new FormData();
let a=document.getElementById('photo');
let bv=document.getElementById('save_all');

formData.append('nrol',b.value);
formData.append('tags',sumtags);
formData.append('name',name.value);
formData.append('developer',developer.value);
formData.append('adress',adress.value);
formData.append('count_bed',count_bed.value);
formData.append('price',price.value);
formData.append('discription',discription.value);
formData.append('date',date.value);


    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/flat_upload" , true);
    
    formData.append('photo',a.files[0]);

    if (a.files.length>1){
        for(let i=1;i<a.files.length;i++){
            console.log('photo',i,a.files[i]);
            formData.append('photo'+i,a.files[i]);
        }
    }



    var request = new XMLHttpRequest();
request.open("POST", '/flat_upload');
console.log('forming data....');
request.send(formData);
  
alert("Товар добавлен!");
    
window.location.href='index';
    }
})







