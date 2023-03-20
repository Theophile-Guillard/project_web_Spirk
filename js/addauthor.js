function addLink() {
    var body_element = document.getElementsByTagName("body")[0];
    var selection = window.getSelection();
    //Итоговый скопированный текст
    var copytext = selection+ "\n\n\n/////////////////////\n" +'Этот отрывок текста взят со страницы интернет магазина игр "Кипарис" \n'+ document.location.href+" \n"+
    "Страница о "+document.getElementsByTagName("h1")[0].textContent + "\n/////////////////////\n";
    var newdiv = document.createElement('div');
    newdiv.style.position = 'absolute';
    newdiv.style.left = '-99999px';
    body_element.appendChild(newdiv);
    newdiv.innerText = copytext;
    selection.selectAllChildren(newdiv);
    window.setTimeout(function() {
      body_element.removeChild(newdiv);
    }, 0);
  }
  
  document.oncopy = addLink;