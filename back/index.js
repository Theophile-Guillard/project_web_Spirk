
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
  database: "flat_catalog",
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

app.get("/flat",jsonParser, function(request, response){
    
    let id=request.query.id;
    let user=[id];
    let sql='select * from flats where id_flat=?';
    connection.query(sql,user,function(err,res){
        console.log(res)
        if (res.length>0){
        response.render('item_flat0.hbs',
        {name:res[0].name,
         date_up:res[0].date_up,
         developer:res[0].developer,
         adress:res[0].adress,
         count_bed:res[0].count_bed,
         price:res[0].price,
         description:res[0].description
        // main_img:res[0].main_img
        })}else{
            response.send('<h1>Такой страницы нету</h1>');
        }
    })       
});
app.post("/photo",jsonParser, function(request, response){
    
    let id=request.body.id;
    let user=[id];
    let sql='select * from flats where id_flat=?';
    connection.query(sql,user,function(err,res){
        console.log('yes', res, id);
        if (res.length>0){
        response.json({main_img:res[0].main_img})}})});
app.post("/photo1",jsonParser, function(request, response){
    
            let id=request.body.id;
            let user=[id];
            let sql='select * from images where id_flat=?';
            connection.query(sql,user,function(err,res){
                console.log('yes1', res, id);
                if (res.length>0){
                response.json(res)}})});

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
console.log('contrust');
    let user=[request.body.rol]
    let sql='select distinct filter from filters where name_rol=?';
   connection.query(sql,user,function(err,res){
   response.json(res);
     })
})
app.post('/catalogih',jsonParser,function(request,response){
    console.log('catalogih');
        //let user=[request.body.rol]
        let sql='select * from flats';
       connection.query(sql,function(err,res){
       response.json(res);
         })
    })


app.post('/flat_upload',jsonParser, function(request,response){
  

    
let id=0;

var form=new formidable.IncomingForm();
form.parse(request,function(err,fields,files){
    if (err) console.error(err);
 //   console.log(fields);
    
    

        
fs.readFile(files['photo'].filepath,(err,data)=>{
    if (err) throw err;
    console.log('data',data)
let user=[
    fields['name'],
fields['date'],
fields['developer'],
fields['adress'],
fields['count_bed'],
fields['price'],
fields['discription'],
data,    //blob,//files['photo'],///img
 serverCookie.user,//login
 fields['nrol'],
 fields['tags']
]            
let sql='insert into flats(name,date_up,developer,adress,count_bed,price,description,main_img,login,gen_filter,side_filters) values(?,?,?,?,?,?,?,?,?,?,?);';
           connection.query(sql,user,function(err,res){
           console.log('err', err);
            //response.json(res);
            id=res.insertId;
            //console.log('////////RES', res)
            let urt=URL.createObjectURL(new Blob(data));
         
        

         let ti=1;
        console.log('filessssssss',files['photo'+2]==null)
      while(files['photo'+ti]!=null)  {
        console.log('start', ti,id);
        let ak='photo'+ti;
        ti++;
        console.log(ak)
      fs.readFile(files[ak].filepath,(err,data)=>{
                if (err) throw err;
                console.log('data',files[ak].size)
            let user=[
             data,
             id
            ]            
            let sql='insert into images(img,id_flat) values(?,?);';
                       connection.query(sql,user,function(errx,res){
                       console.log('err', errx);
                        //response.json(res);
            
                        let urt=URL.createObjectURL(new Blob(data));
                        console.log(urt);

                        console.log('Введена доп. фото',ti)
                       
                     //   response.redirect('index')   
                         })})}}) })}) 


                        

                        })




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
        response.json({good:false,mess:"Добавление объявлений доступно только авторизованным пользователям"})
    }
})
