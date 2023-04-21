let afc=document.getElementById('great');
let user=JSON.stringify({awaiter:0});
let request = new XMLHttpRequest();
request.open("POST", "/catalogih", true);   
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", async function () {
    
			let rec = JSON.parse(request.response);
            
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
request.send(user);