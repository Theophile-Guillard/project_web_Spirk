
const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();
var cookieParser=require('cookie-parser')
let fs=require("fs")
let port=3000;
const dn=__dirname.length
const dirk=__dirname.slice(0,dn-5);
app.listen(port);
console.log('server listening on http://localhost:'+port)
app.set("view engine", "hbs");
hbs.registerPartials(dirk + "/pages/parts");
app.set('views',dirk+'/pages');
app.use(express.static(dirk));
app.use(cookieParser());
const jsonParser = express.json();


const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "game_catalog",
  password: "1111"
});
connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });

app.use(jsonParser,function(request, response, next){
    /////работа с куками и авторизацией
    let a=JSON.stringify(request.cookies);
    console.log(request.cookies['user'],"  -куки");
    /////////также можно request.cookies.user    но если будет например user-g то только "массивным способом"
    

    next();
});
app.use(jsonParser,function(request, response, next){
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


app.post("/try_registration",jsonParser,function(request,response){
    let login=request.body.login;
    let password=request.body.password;

   let user=[login,password];

   let sql='select login from users where login=?';
   connection.query(sql,user,function(err,res){
    if(err) {
        console.log(err); 
        response.json({good:false,mess:"ошибка, кажется вы ввели что-то не то"})}
        
    else{
        console.log("проверено",login,password);
        
    console.log(res);
    if (res.length>0){ response.json({good:false,mess:"ошибка, такой пользователь уже есть"})}else{
    sql='insert into users(login,pass) values(?,?);';
   connection.query(sql,user,function(err,res){
    if(err) {
        console.log(err); 
        response.json({good:false,mess:"ошибка, кажется вы ввели что-то не то"})}
    else{
        console.log("добавлено",login,password);
        response.cookie('user',login);
        response.cookie('auth',true);
        response.render('index.hbs',{good:true,mess:"вы зарегистрированы!"})}

   })}}
})
})