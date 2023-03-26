let being=false;
let prevW=200;
let afterW=window.innerWidth;

let prevH=200;
let afterH=window.innerHeight;

console.log(afterW,afterH);

document.addEventListener("click", function (e){
    console.log(e.target.className)
    let prevW=200;
let afterW=window.innerWidth*0.8;
let prevH=200;
let afterH=window.innerHeight*0.8;
    let src=e.target.getAttribute('src');
    console.log(src);

    console.log()
if (e.target.className=='zooms'){
    if (!being){
        being=true;
        let divx=document.createElement('div');
        let img=document.createElement('img');
        img.className='fullImg';
        divx.className='modal';
        img.setAttribute('src',src);
        img.setAttribute('width','80%');
        img.setAttribute('height','80%');
        img.style.zIndex=21;
        img.style.position='fixed';
        img.style.left='50px';
        img.style.top='5%';
        
        document.body.append(img);
  }
  }
  if(e.target.className=='fullImg'){
    e.target.className='nonfullImg';
    setTimeout (function(){document.body.removeChild(e.target);},500);
    being=false;
  }
}
)

