const db = require('../db/db');
const querys = require('../db/query');

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.use(cookieParser());

//TODO nodemailer
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: process.env.HOST_MAILER,
    port: process.env.PORT_MAILER,
    secure: false,
    auth:{
        user: process.env.USER_MAILER,
        pass: process.env.PASS_MAILER
    }
})

const controller = {};

// LINK homepage | view
controller.index = (req,res) => {
    
    let btnlogin = req.cookies.userToken == undefined ? "iniciar Sesión" : "Mi Perfil";

    querys.numCateg();
    db.query(`SELECT * FROM webs;`, (err, fields) => {
        let cantWebs    =   fields.length,
            title      =   "Revs"
        res.render('index',{
            title,
            cantWebs,
            btnlogin
        });
    });

}

// LINK getting | view
controller.gettingStarted = (req,res) => {
    
    let btnLogin = req.cookies.userToken == undefined ? "Iniciar sesión" : "Mi perfil";

    url = req.url;

    db.query(`SELECT * FROM category;`, (err, results) => {
        db.query(`SELECT * FROM webs ORDER BY likes DESC LIMIT 20`, (err, webs) => {
            if(err) throw err;
            let title = "Getting Started";
            res.render('getting',{
                title,
                results,
                webs,
                btnLogin,
            });
        });
    });

}

// LINK login & sign | view

controller.register = (req,res) => {

    let title = "Registrate";
    let cook = req.cookies.userToken
    let btnLogin = "Iniciar Sesión"
    let alert = false;
    db.query('SELECT * FROM profesion;', (err,prof) => {
        if(cook === undefined){
            res.render('register', {
                title,
                btnLogin,
                alert,
                prof,
            })
        }else{
            res.redirect('/user');
        }
    })

}

// LINK categorias | vies
controller.categories = (req, res) => {

    let btnLogin = req.cookies.userToken == undefined ? "Iniciar Sesión" : 'Mi perfil'

    let categorie       =   req.params.categorie,
        sql             =   `SELECT * FROM webs WHERE category = "${categorie}";`,
        sqlBestWebs     =   `SELECT * FROM webs WHERE category = "${categorie}" ORDER BY likes DESC LIMIT 8;`,
        sqlCategorie    =   `SELECT * FROM category;`,
        title          =   `Revs: ${categorie}`;     

    db.query(sql, (err, web) => {
        db.query(sqlCategorie, (err, results) => {
            db.query(sqlBestWebs, (err, webBest) => {             
                res.render('categorie', {
                    title,
                    web,
                    webBest,
                    results,
                    btnLogin,
                });
            })
        });
    });
}

// LINK informacion | view
controller.info = (req,res) => {
    
    let btnLogin = req.cookies.userToken == undefined ? "Iniciar Sesión" : 'Mi perfil';

    let title = "Información";
    res.render('informacion', {
        title,
        btnLogin,
    })
}

// LINK - usuario | view
controller.userAccount =  (req,res) => {

    let title = "Mí pérfil",
        cook = req.cookies.userToken,
        emailDecoded = jwt.verify(cook, process.env.JWT_SECRET).userToken,
        queryUser = `SELECT * FROM users WHERE email = "${emailDecoded}"`,
        queryWebs = `SELECT * FROM userWebs WHERE email = "${emailDecoded}"`,
        queryProf = "SELECT * FROM profesion;"

    db.query(queryUser, (err,userResults) => {
        let user = userResults[0];
        db.query(queryWebs, (err,webs) => {
            db.query(queryProf, (err,prof) => {

                res.render('userAccount', {
                    title,
                    user,
                    webs,
                    prof
                });
            });
        });
    });

}

// LINK contacto | view

controller.contactoView = (req,res) => {
    let title = "Contacto";
    let cook = req.cookies.userToken;
    let isLogin = cook !== undefined ? true : false;
    let btnLogin = isLogin == true ? "Mi pérfil" : "Iniciar sesión";

    console.log(isLogin)

    if(isLogin){

        let email = jwt.verify(cook, process.env.JWT_SECRET).userToken;

        db.query(`SELECT * FROM users WHERE email = "${email}"`, (err,result) => {
            let name = result[0].name;
            res.render('contacto', {
                title   :   title,
                email   :   email,
                name    :   name,
                btnLogin:   btnLogin,
            })
        })
    }else{
        res.render('contacto', {
            title   :   title,
            email   :   null,
            name    :   null,
            btnLogin:   btnLogin,
        })
    }
}

//LINK Verificar email | view

controller.verifyMailView = (req,res) => {
    
    let datos = req.cookies.userData;

    res.render('userVerify', {
            title : 'Verificar correo',
            name: datos.name.split(" ")[0],
            email: datos.email.replace(/^.{5}/g, "######")
        });
};
    
    
//###############################################################################################################################

// TODO - Verificar email
controller.verifyMail = (req,res) =>{
    const {code_input} = req.body;
    const code = req.cookies.codeVerify;

    console.log(code)
    bcrypt.compare(code_input, code, (err, result) => {
        if(err) throw err;
        if(result){
            res.redirect(307, '/register');
        }else{
            res.redirect('back')
        }
    })
};


// TODO enviar codigo
controller.crearCode = (req,res) =>{
    let code = Math.floor(Math.random()*(99999-10000)+10000),
        {name, email} = req.cookies.userData;

    //ENVIAR CODIGO
    let message = {
        from    : "Revs",
        to      : `${email}`,
        subject : `Código de Verificación`,
        html    : `<html><style> @import url('https://fonts.googleapis.com/css2?family=Averia+Sans+Libre:wght@700&family=Mukta:wght@400;700&display=swap');*,* *{margin:0;padding:0;font-family:'Mukta',sans-serif;color:#242424;text-align:center}body{background-color:#EBEBEB}header{padding:1rem;font-size:3rem;background-color:#00897B;text-transform:uppercase;text-align:center}header h2{color:white;font-family:'Averia Sans Libre',sans-serif}main h2{color:#00897B}main{padding:1rem}section{background:#323232}section h2{color:rgb(230,230,230)}span{color:white;font-size:4rem;line-height:1;padding:0;margin:0}a{color:white;text-decoration:none;border-radius:1rem;background-color:#00897B;display:block;margin:auto;margin-top:1rem;width:100px;padding:1rem}</style><body><header><h2>Revs</h2></header><main><h1>Confirma tu cuenta</h1><p>¡Hola ${name.split(" ")[0]}! Gracias por usar nuestro servicio. Su código de verificación es: [ <b>${code}</b> ]. Recuerde que este código es confidencial y no debe ser compartido con nadie más. Si no solicitó un código de verificación o tiene problemas para ingresarlo, comuníquese con nuestro equipo de soporte. <b>¡Gracias por confiar en nosotros!</b></p></main><section><h2>Codigo de verificación:</h2>${code}</section><a href="https://www.revs.com">Ir al sitio</a></body></html>`
    };
    
    transport.sendMail(message, (err,info) => {
        if(err){
            console.log(err);
        }else{
            console.log(`${subject} enviado a ${email}.`);
        }
    });

    //ENCRIPTACIÓN DEL CÓDIGO Y SUBIDO A COOKIES
    bcrypt.hash(`${code}`, 10, (err,hash) =>{
        if(err) throw err;
        console.log(hash)
        res.cookie("codeVerify", hash).redirect('/verify-correo')
    });
}

//TODO - Subir a cookies
controller.saveDateCook = (req,res) =>{


    db.query(`SELECT * FROM users WHERE email = "${req.body.email}";`, (err,user) =>{
        db.query('SELECT * FROM profesion;', (errProf, prof) => {
            if(user.length > 0){
                res.render('register',{
                    title       :   "Iniciar Sesión",
                    btnLogin    :   "Iniciar Sesión",
                    prof        :   prof,
                    alert       :   true,
                    sweet_title :   "Error de registro",  
                    sweet_icon  :   "error",  
                    sweet_message  :"El correo ya se encuentra registrado, inicia sesión",  
                });
            }else{
                res.cookie('userData', req.body).redirect(307,'/createCode')
            }
        })
        })
}

//TODO - Registro de usuario
controller.registerUser = (req,res) => {

    let idAuto = Math.floor(Math.random()*(99999-10000)+10000);
    let {name,profesion,email,phone,pass} = req.cookies.userData;
    db.query('SELECT * FROM profesion;', (err, prof) => {

        bcrypt.hash(pass, 10, (err,passEncrypt) =>{
            if(err){
                console.log(err);
                res.render('register', {
                    title       : "Iniciar sesión",
                    btnLogin    : "Iniciar sesión",
                    prof        : prof,
                    alert       : true,
                    sweet_title : "Error de régistro",
                    sweet_icon  : "error",
                    sweet_message:"Lo sentimos hubo un error en el registro, intentalo más tarde."
                });
            }else{
                querys.insert("users","(_id,name,profesion,email,phone,pass,websInteraction)",`(${idAuto},"${name}","${profesion}","${email}","${phone}","${passEncrypt}",0)`);
                res.clearCookie("userData").clearCookie("codeVerify");
                res.render('register', {
                    title       : "Iniciar sesión",
                    btnLogin    : "Iniciar sesión",
                    prof        : prof,
                    alert       : true,
                    sweet_title : "Registro exitoso",
                    sweet_icon  : "success",
                    sweet_message:"Su registro se hizo correctamente, puedes iniciar sesión con tus datos"
                });
            }
        })
    });
}

//TODO actualizar usuario
controller.userUpdate = (req,res) => {

    let body = req.body,
        id = req.params._id,
        tableName = "users";

    querys.updateRegistro(tableName, body, id);

    res.redirect('back');
    
};

//TODO Guardar web
controller.saveWebUser = (req,res) => {
    const {_idWeb} = req.params;
    const email = jwt.verify(req.cookies.userToken, process.env.JWT_SECRET).userToken;

    let tableName   =   "saveWebs",
        body        =   "(_idWeb, email)",
        values      =   `("${_idWeb}", "${email}")`;

    db.query(`SELECT * FROM savewebs WHERE _idWeb = "${_idWeb}" AND email = "${email}"`, (err,result) => {
        if(err) throw err;
        if(result.length == 0){
            querys.insert(tableName, body, values);
            res.redirect('back');
        }else{
            res.redirect('back');
        }
    })

}
//TODO Borrar web user
controller.delSaveUser = (req,res) => {
    let tableName = "savewebs",
        where = `_idWeb = "${req.params._id}"`;

    querys.deleteRegistro(tableName, where);
    res.redirect('/account')
}

//TODO Interacción
controller.likeweb = (req,res) => {

    let cook = req.cookies.userToken,
        email = jwt.verify(cook, process.env.JWT_SECRET).userToken;
        id = req.params._id
        tableName = "likes",
        body = "(_idWeb, email)"
        values = `("${id}", "${email}")`

    db.query(`SELECT * FROM likes WHERE _idWeb = "${id}" AND email = "${email}";`, (err,result) => {
        if(err) throw err;
        console.log(result)
        if(result.length == 0){
            querys.insert(tableName, body, values);
            db.query(`SELECT * FROM likes WHERE _idWeb = "${id}";`, (err,likes) => {
                let like_cant = likes.length;
                console.log(like_cant)
                let set = {
                    "likes" : like_cant
                }
                querys.updateRegistro("webs", set, id);
            });
        }
    });

    res.redirect('back');
}

// TODO Enviar message
controller.sendMessage = (req,res) => {

    console.log(req.body);

    const {nameUser, email, message} = req.body;

    const data = {
        nameUser    :nameUser,
        email       :(email == "") ? "No Email" : email,
        message     :message,
    };

    console.log(data)

    let dataQuery = {
        table   :   "messages",
        body    :   `(name, email, message)`,
        values  :   `("${data.nameUser}", "${data.email}", "${data.message}")`
    };
    
    querys.insert(dataQuery.table, dataQuery.body, dataQuery.values);

    res.redirect('back')
}


//###############################################################################################################################

// FIXME cerrar seesion

controller.logout = (req,res) => {
    res.clearCookie("userToken").redirect('/account');
}

// FIXME autenticar usuario

controller.auth = (req,res) => {
    const {email, pass} = req.body;
    console.log(email, pass);
    db.query(`SELECT * FROM users WHERE email = "${email}";`, (err, results) => {
        db.query("SELECT * FROM profesion;", (errProf, prof) => {
            try{
                if(err) throw err;
    
                if(results.length > 0){
    
                    let user = results[0];
                    let token = jwt.sign({userToken:user.email}, process.env.JWT_SECRET );
    
                    //COMPARACIÓN DE CONTRASEÑAS
                    bcrypt.compare(`${pass}`, user.pass, (err,results) =>{
                        if(err){
                            res.render('register',{
                                title       :   "Iniciar Sesión",
                                btnLogin    :   "Iniciar Sesión",
                                alert       :   true,
                                prof        :   prof,
                                sweet_title :   "Credenciales incorrectas",  
                                sweet_icon  :   "error",  
                                sweet_message  :"Lo sentimos el correo o contraseña no coinciden o no se ecuentran registrados",  
                            });
                        }else{
                            console.log(results)
                            if(results){
                                //SI LAS CONTRASEÑAS SON IGUALES
                                console.log('user existe');
                                res.cookie("userToken", token).redirect('/user');
                            }else{
                                //SI LAS CONTRASEÑAS NO SON IGUALES
                                console.log('user no existe');
                                res.render('register',{
                                    title       :   "Iniciar Sesión",
                                    btnLogin    :   "Iniciar Sesión",
                                    alert       :   true,
                                    prof        :   prof,
                                    sweet_title :   "Credenciales incorrectas",  
                                    sweet_icon  :   "error",  
                                    sweet_message  :"Lo sentimos el correo o contraseña no coinciden o no se ecuentran registrados",  
                                });
                            }
                        }
                    })
                }else{
                    res.render('register',{
                        title       :   "Iniciar Sesión",
                        btnLogin    :   "Iniciar Sesión",
                        alert       :   true,
                        prof        :   prof,
                        sweet_title :   "Credenciales incorrectas",  
                        sweet_icon  :   "error",  
                        sweet_message  :"Lo sentimos el correo o contraseña no coinciden o no se ecuentran registrados",  
                    });
                }
            }catch(error){
                res.render('register',{
                    title       :   "Iniciar Sesión",
                    btnLogin    :   "Iniciar Sesión",
                    alert       :   true,
                    prof        :   prof,
                    sweet_title :   "Credenciales incorrectas",  
                    sweet_icon  :   "error",  
                    sweet_message  :"Lo sentimos el correo o contraseña no coinciden o no se ecuentran registrados",  
                });
                console.log('error en las credenciales')
                console.log(error)
            }
        })
    })
}

//FIXME - verificar token
controller.verifyToken = (req,res,next) => {
    let cookieToken = req.cookies.userToken;

    if(cookieToken !== undefined){
        let cookieTokenDecoded = jwt.verify(cookieToken, process.env.JWT_SECRET).userToken;
        
        db.query(`SELECT * FROM users WHERE email = "${cookieTokenDecoded}";`, (err, results) => {
            db.query('SELECT * FROM profesion;', (errProf, prof) => {
                if(err) {
                    res.render('register',{
                        title       :   "Iniciar Sesión",
                        btnLogin    :   "Iniciar Sesión",
                        alert       :   true,
                        prof        :   prof,
                        sweet_title :   "Inicia sesión primero",  
                        sweet_icon  :   "error",  
                        sweet_message  :"Tienes que iniciar sesión primero para acceder a estás funciones",  
                    });
                }
                else if(results.length > 0){
                    next()
                }else{
                    res.render('register',{
                        title       :   "Iniciar Sesión",
                        btnLogin    :   "Iniciar Sesión",
                        alert       :   true,
                        prof        :   prof,
                        sweet_title :   "Inicia sesión primero",  
                        sweet_icon  :   "error",  
                        sweet_message  :"Tienes que iniciar sesión primero para acceder a estás funciones",  
                    });
                }
            })
        })
    }else{
        db.query("SELECT * FROM profesion;", (errProf, prof) => {
            res.render('register',{
                title       :   "Iniciar Sesión",
                btnLogin    :   "Iniciar Sesión",
                alert       :   true,
                prof        :   prof,
                sweet_title :   "Inicia sesión primero",  
                sweet_icon  :   "error",  
                sweet_message  :"Tienes que iniciar sesión primero para acceder a estás funciones",  
            });
        })
    }
}


// Exportación de controllers
module.exports = controller;