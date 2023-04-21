//файл не нужен, вся генерация в HandleBars, кек


var params = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );

let id=Number(params['id']);
let afc=document.getElementById('place_for_photo');
let user=JSON.stringify({id:id});
let request = new XMLHttpRequest();
request.open("POST", "/photo", true);   
console.log('try');
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", async function () {
    
			let rec = JSON.parse(request.response);
        console.log('wut')
        console.log(rec);
        const img=document.getElementById('photo1');
        let i=0;
            const blobs=new Blob([new Uint8Array(rec.main_img.data)]);
     
            let urt=URL.createObjectURL(blobs);
            img.setAttribute('src',urt);
        
            const buffer = await rec.main_img;
            const bytes = new Uint8Array(buffer);
            const decoder = new TextDecoder('utf8');
        
            const image = document.createElement('image');
            image.src = btoa(decoder.decode(bytes));
        console.log('some/////')
        })
        request.send(user);


      //  let id=Number(params['id']);
//let afc=document.getElementById('great');
let user1=JSON.stringify({id:id});
let request1 = new XMLHttpRequest();
request1.open("POST", "/photo1", true);   
console.log('try1');
    request1.setRequestHeader("Content-Type", "application/json");
    request1.addEventListener("load", async function () {
    
			let rec = JSON.parse(request1.response);
        console.log('wut photo1', rec.length)
        console.log(rec);
        for (let i=0;i<rec.length;i++) {

            console.log('///////////////////////////',i,rec)
        //const img=document.getElementById('photo1');
        //let i=0;
        let imgr=document.createElement('img');
            const blobs=new Blob([new Uint8Array(rec[i].img.data)]);
     
            let urt=URL.createObjectURL(blobs);
            imgr.setAttribute('src',urt);
        
            const buffer = await rec.img;
            const bytes = new Uint8Array(buffer);
            const decoder = new TextDecoder('utf8');
        
            //const image = document.createElement('image');
            //image.src = btoa(decoder.decode(bytes));
            imgr.setAttribute('width',200);
            imgr.setAttribute('height',200);
            let k=i+2;
            imgr.setAttribute('alt','photo '+k);

            imgr.setAttribute('id','photo'+k);
            imgr.setAttribute('class','zooms');

            let vd=document.createElement('div');
            vd.setAttribute('class','one-element-context');
            vd.append(imgr);




            afc.prepend(vd);

        console.log('some/////')}
        })
        request1.send(user1);