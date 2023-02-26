const express = require('express');
const routerBack = express.Router();

const controller = require('../controllers/controllersBack');


let verify = controller.verifyToken;


// LINK - CATEGORY
routerBack.post('/insertCategory', verify,controller.insertCategory);
routerBack.post('/deleteCategory/:id', verify,controller.deleteCategory);
routerBack.post('/updateCategory/:id', verify,controller.updateCategory);


// LINK - WEBS
routerBack.post('/insertWeb', verify,controller.insertWeb);
routerBack.post('/deleteWeb/:id', verify,controller.deleteWeb);
routerBack.post('/updateWeb/:id', verify ,controller.updateWeb);

// LINK - PROFESIONES
routerBack.post('/add-profesion', verify , controller.addProfesion); 
routerBack.post('/delete-profesion/:_id', verify , controller.deleteProfesion); 

// LINK - MESSAGES
routerBack.post('/delete-msj/:_id', verify , controller.messageDel); 


// LINK - WEBS VIEWS
routerBack.get('/admin', verify,controller.index);
routerBack.get('/login-admin',  controller.loginView);
routerBack.get('/admin-users', verify , controller.users);
routerBack.get('/admin-webs', verify , controller.websView);
routerBack.get('/admin-messages', verify , controller.messageView);



// LINK AUTH ADMIN
routerBack.post('/authAdmin', controller.auth);

module.exports = routerBack;

