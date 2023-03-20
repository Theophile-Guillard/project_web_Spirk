
const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();
let fs=require("fs")
let port=3000;
const dn=__dirname.length
const dirk=__dirname.slice(0,dn-5);
app.listen(port);
console.log('server listening on http://localhost:'+port)




app.set("view engine", "hbs");
hbs.registerPartials(dirk + "/pages/parts");
app.set('views',dirk+'/pages');



//app.use(express.static(dirk + "\pages")); //////////
//app.use(express.static(dirk+'\styles')); /////////////
//app.use(express.static(dirk+'\images')); /////////
//app.use(express.static(dirk+'\js'));  ///////////////
app.use(express.static(dirk));
//console.log(dirk,"    //")
const jsonParser = express.json();

app.use(function(request, response, next){
    /////работа с куками и авторизацией
    next();
});
app.use(function(request, response, next){
    /////работа со статическими страницами
    let hf=dirk+"/pages"+request.url+".hbs";
    console.log("url ", hf);
    fs.access(hf, function(error){
        if (error) {
            next();
        } else {
            fs.stat(hf, function(err, stats){
                if (stats.isFile()) {
                    response.render(hf);
                } else {
                   next();
                }
            });
        }
    });

   
});
app.get("/",jsonParser, function(request, response){
    response.render('index.hbs');
});


