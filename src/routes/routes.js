// Importación de paquetes
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');

let verify = controller.verifyToken;

// Rutas
router.get("/", controller.index);
router.get("/getting-started", controller.gettingStarted);
router.get('/contacto', controller.contactoView);
router.get('/user', verify ,controller.userAccount);
router.get("/account", controller.register);
router.get("/informacion", controller.info);
router.get("/verify-correo", controller.verifyMailView);

// Rutas Post
router.post('/user-update/:_id', verify, controller.userUpdate)
router.post("/cookData", controller.saveDateCook);
router.post("/createCode", controller.crearCode);
router.post("/verify-correo", controller.verifyMail);
router.post("/send-message", controller.sendMessage);

//rutas de autenticación
router.post("/login", controller.auth);
router.post("/register", controller.registerUser);
router.post("/logout", controller.logout);

//rutas de interacciones
router.post("/saveWeb/:_idWeb", verify, controller.saveWebUser);
router.post("/deleteSaveWeb/:_id", verify, controller.delSaveUser);
router.post("/like/:_id", verify, controller.likeweb);

//rutas de categorias
router.get("/categories/:categorie", controller.categories);



// Exportacion de rutas
module.exports = router;