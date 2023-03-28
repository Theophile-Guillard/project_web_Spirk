let save_button=document.getElementById("add_new");
save_button.addEventListener("click", function(){
  let user=JSON.stringify({awaiter:0});
    let request = new XMLHttpRequest();
    //console.log(userName,userPassword);
    request.open("POST", "/try_new", true);   
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
			let rec = JSON.parse(request.response);
   
            if (rec.good){
                window.location.href='new_item_flat';
            }else{
                alert(rec.mess);
            }
      })
request.send(user);})