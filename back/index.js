
const express = require("express");
var fileUpload = require('express-fileupload');
const expressHbs = require("express-handlebars");
var bodyParser = require('body-parser')
const hbs = require("hbs");
const app = express();
var cookieParser=require('cookie-parser')
let fs=require("fs")
const formidable = require('formidable');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("mysql2");
const { response } = require("express");
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


let serverCookie;

app.use(jsonParser,function(request, response, next){
    let hf=dirk+"/pages"+request.url+".hbs";
    console.log("url ", hf);
    serverCookie=request.cookies;

    
    fs.access(hf, function(error){
        if (error) {
           // console.log("error?, it's router?//////////////////",error)
            next();
        } else {
            fs.stat(hf, function(err, stats){
                if (stats.isFile()) {
                    console.log("render static/////////////////////",err)
                    response.render(hf);
                } else {
                    console.log("not static, it's router//////////////////",err)
                   next();
                }
            });
        }
    }     );
});



app.get("/",jsonParser, function(request, response){
    console.log('general line f');
    response.render('index');
});
app.post("/try_registration",jsonParser,function(request,response){
    let login=request.body.login;
    let password=request.body.password;

   let user=[login,password];

   let sql='select login from users where login=?';
   connection.query(sql,user,function(err,res){
    if(err) {
        
        response.json({good:false,mess:"ошибка, кажется вы ввели что-то не то"})}
        
    else{
     
    if (res.length>0){ response.json({good:false,mess:"ошибка, такой пользователь уже есть"})}else{
    sql='insert into users(login,pass) values(?,?);';
   connection.query(sql,user,function(err,res){
    if(err) {
       
        response.json({good:false,mess:"ошибка, кажется вы ввели что-то не то"})}
    else{
       
        response.cookie('user',login,{sameSite: 'None', secure:true});
        response.cookie('auth',true,{sameSite: 'None', secure:true});
   
        response.json({good:true,mess:"вы зарегистрированы!"})
       

   }} )   }}
})
})

app.post("/try_auth",jsonParser,function(request,response){
    let login=request.body.login;
    let password=request.body.password;

   let user=[login,password];

   let sql='select login from users where login=?';
   connection.query(sql,user,function(err,res){
    if(err) {
        
        response.json({good:false,mess:"ошибка, кажется вы ввели что-то не то"})}
        
    else{
     
    if (res.length==0){ response.json({good:false,mess:"ошибка, такого пользователя нету"})}else{
    sql='select login,pass from users where login=? and pass=?;';
   connection.query(sql,user,function(err,res){
    if(err) {
       
        response.json({good:false,mess:"ошибка, кажется вы ввели что-то не то"})}
    else{
       
        if(res.length==1){
        response.cookie('user',login,{sameSite: 'None', secure:true});
        response.cookie('auth',true,{sameSite: 'None', secure:true});
        response.json({good:true,mess:"вы вошли!"})
        }else{
            response.json({good:false,mess:"ошибка, неверный пароль"})
        }

   }} )   }}
})
})



hbs.registerHelper('isAuth',function(options){
    if (serverCookie.auth){
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
})
hbs.registerHelper('tempUser',function(){
    return serverCookie.user;
})



app.post('/trusting',jsonParser,function(request,response){

     console.log('trust');
     let sql='select distinct name_rol from filters';
    connection.query(sql,function(err,res){
    response.json(res);
      })

    
})
app.post('/contrust',jsonParser,function(request,response){
console.log('contrust',request.files);
    let user=[request.body.rol]
    let sql='select distinct filter from filters where name_rol=?';
   connection.query(sql,user,function(err,res){
   response.json(res);
     })
})


app.post('/game_upload',jsonParser, function(request,response){
   console.log('ggg')
  
var form=new formidable.IncomingForm();
form.parse(request,function(err,fields,files){
    if (err) console.error(err);
    console.log(fields);
fs.readFile(files['photo'].filepath,(err,data)=>{
    if (err) throw err;
    console.log('data',data)
let user=[
    fields['name'],
fields['date'],
fields['developer'],
fields['publisher'],
fields['platform'],
fields['price'],
fields['discription'],
data,    //blob,//files['photo'],///img
 serverCookie.user,//login
 fields['nrol'],
 fields['tags']
]            
let sql='insert into games(name,date_up,developer,publisher,platform,price,description,main_img,login,gen_filter,side_filters) values(?,?,?,?,?,?,?,?,?,?,?);';
           connection.query(sql,user,function(err,res){
           console.log('err', err);
            //response.json(res);

            let urt=URL.createObjectURL(new Blob(data));
            console.log(urt);
         //   response.redirect('index')   
             })})
             
});

 
});


app.get('/exit',jsonParser,function(request,response){
    response.clearCookie('auth');
    response.clearCookie('user');
    console.log('exiting....');
    serverCookie=response.cookie;
    console.log(serverCookie,response.cookies);
    response.redirect('index');
})

app.post('/try_new',jsonParser,function(request,response){
    console.log('new////////////')
    if (serverCookie.auth){
        response.json({good:true,mess:" добавление...."})
    }else{
        response.json({good:false,mess:"Добавление продуктов доступно только авторизованным пользователям"})
    }
})
