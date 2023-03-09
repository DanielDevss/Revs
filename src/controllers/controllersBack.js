// Importación de modulos
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = ('cookie-parser');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//base de datos
const db = require ('../db/db');
const querys = require('../db/query');

//midleware
app.use(bodyParser.urlencoded( {extended:true} ))
app.use(bodyParser.json())


const controller = {};




// LINK - CATEGORIAS

// ! insert registro
controller.insertCategory = (req, res) => {

    let table   = "category",
        body    = "(nameCategory, cant, icon)",
        values  = `('${req.body.nameCategory}', '${req.body.cant}', '${req.body.icon}')`;

    querys.insert(table, body, values);

    res.redirect('/admin-webs');
}

// ! delete registro
controller.deleteCategory = (req, res) => {
    let where = `_id = ${req.params.id}`;
    
    db.query(`SELECT nameCategory FROM category WHERE _id = ${req.params.id};`, (err, categorie) => {
        let resultCat = categorie[0].nameCategory;
        console.log(resultCat)
        querys.deleteRegistro('category', where, resultCat);
        res.redirect('/admin-webs');
    })


}

// * update registro
controller.updateCategory = (req,res) => {
    console.log(req.body.nameCategory)
    querys.updateRegistro('category', req.body, req.params.id, req.body.nameCategory)

    res.redirect('/admin-webs');
}


// LINK - WEBS
// ! insert registro
controller.insertWeb = (req, res) => {
    let id = Math.floor(Math.random()*(99999-10000)+10000);
    let body = req.body;
    let table   = "webs",
        colums    = "(_id,nameWeb,urlWeb,info,img,icon,category)",
        values  = `(${id},'${body.nameWeb}', '${body.urlWeb}', '${body.info}','${body.img}', '${body.icon}','${body.category}')`;

    querys.insert(table, colums, values);

    res.redirect('/admin-webs');
}


// ! delete web
controller.deleteWeb = (req,res) => {

    let where = `_id = ${req.params.id}`;

    querys.deleteRegistro('webs', where);
    
    res.redirect('/admin-webs');
}


// ! update web
controller.updateWeb = (req,res) => {
    
    querys.updateRegistro('webs', req.body, req.params.id);
    
    res.redirect('/admin-webs')
} 


//LINK - PROFESIONES 

//! INSERT PROFESION
controller.addProfesion = (req,res) => {
    const {nameProfesion} = req.body;
    querys.insert("profesion", "(nameProfesion)", `("${nameProfesion}")`);
    res.redirect('back');
};

//! DELETE PROFESION
controller.deleteProfesion = (req,res) => {
    let id = req.params._id;
    querys.deleteRegistro("profesion", `_id = ${id}`);
    res.redirect('back');
};


// LINK MESSAGES

controller.messageView = (req,res) => {
    db.query('SELECT * FROM messages ORDER BY fechaMsj DESC', (err, msj) => {
        if(err) throw err;

        let title = "Mensajes";

        res.render('admin/message', {
            msj,
            title
        })

    });
}

//! DELETE
controller.messageDel = (req,res) => {

    let id = req.params._id;

    const query = {
        table   : "messages",
        where   : `_id = "${id}"`
    };

    querys.deleteRegistro(query.table, query.where);

    res.redirect('back');
}


// TODO index | view

controller.index = (req,res) => {

    db.query('SELECT * FROM users;', (errUser,users) => {
        if(errUser) throw errUser;
        db.query('SELECT * FROM webs;', (errWeb, webs) => {
            if(errWeb) throw errWeb;
            db.query('SELECT * FROM category;', (errCategory, category) => {
                if(errCategory) throw errCategory;
                res.render('admin/index', {
                    title   :   "Administrador",
                    users   :   users.length,
                    webs    :   webs.length,
                    cat     :   category,
                    category:   category.length
                });
            });
        });
    });
}


// TODO webs | view
controller.websView = (req,res) => {
    let title           = "Webs",
        sql             = "SELECT * FROM webs";
        sqlCategories   = "SELECT * FROM category"

    db.query(sql, (err, webs) => {
        if(err)throw err;
        db.query(sqlCategories, (e, resultsCategories) => {

            if(e) throw e;

            let categories = resultsCategories;
            res.render('admin/webs', {
                title,
                webs,
                categories
            });

        });
    });

}


//TODO users | view
controller.users = (req,res) =>{

    db.query('SELECT * FROM users;', (errUser, users) =>{
        if(errUser) throw errUser;
        db.query("SELECT * FROM profesion;", (errProfesion, profesion) => {
            if(errProfesion) throw errProfesion;
            res.render('admin/users', {
                title   :   "Usuarios",
                users    :  users,
                profesion:  profesion
            });
        });

    })

} 


//TODO login | view

controller.loginView = (req,res) => {
    res.render('admin/login', {
        title   :   "Login Administrador"
    })
}



//FIXME AUTENTICAR
controller.auth = (req,res) => {
    const {username, pass} = req.body;

    db.query(`SELECT * FROM useradmin WHERE username = "${username}"`, (err, result) => {
        if(err) throw err;

        if(result.length > 0){
            //Comparamos la contraseña
            bcrypt.compare(pass, result[0].pass, function(err, decoded) {
                if(decoded){
                    
                    let token = jwt.sign( { userAdmin : username } , process.env.JWT_SECRET);

                    res.cookie( 'tokenAdmin' , token ).redirect('/admin');

                }else{
                    res.redirect('/login-admin');
                }
            });
        }else{
            res.redirect('/login-admin');
        }

    })

    //11_snFF_2 PASSWORD        
}

controller.verifyToken = (req,res,next) => {
    let {tokenAdmin} = req.cookies;

    if(tokenAdmin == undefined){
        res.redirect('/login-admin')
    }else{
        let cookDecoded = jwt.verify( tokenAdmin, process.env.JWT_SECRET );
        db.query(`SELECT * FROM useradmin WHERE username = "${cookDecoded.userAdmin}"`, (err,user) => {
            if(err) throw err;

            if(user.length > 0){
                next()
            }else{
                res.redirect('/login-admin')
            }

        });
    }


}


module.exports = controller;