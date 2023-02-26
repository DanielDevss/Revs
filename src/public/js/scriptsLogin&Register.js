//FIXME - EFECTO FLIP
let forms = document.querySelectorAll('.formulario');

let btnShowLogin = document.querySelector('#btnShowLogin');
let btnShowRegister = document.querySelector('#btnShowRegister');

btnShowLogin.addEventListener('click', showLogin);
btnShowRegister.addEventListener('click', showRegister);

document.title = "Iniciar sesión";

function showRegister(){
    forms[0].style.transform = "perspective(500px) rotateY(180deg)";
    forms[1].style.transform = "perspective(500px) rotateY(360deg)";
    document.title = "Registrate";
    
}
function showLogin(){
    document.title = "Iniciar sesión";
    forms[0].style.transform = "perspective(500px) rotateY(0deg)";
    forms[1].style.transform = "perspective(500px) rotateY(180deg)";
}

//FIXME SHOW PASS
// seccion de login
let btnShowPass = document.querySelector('#showPass');
let inpPass = document.querySelector('#inpPass');

btnShowPass.addEventListener('click', showPass)

function showPass(){
    let iconShow = document.querySelector('.iconEye');
    if(iconShow.name === "eye-outline"){
        
        iconShow.name = "eye-off-outline";
        inpPass.type = "text";
        
    }else{
        
        iconShow.name = "eye-outline";
        inpPass.type = "password";
    
    }
};

//sección de registro

let inputPass = document.querySelector('#inpPassReg');
let inputRepeat = document.querySelector('#inpPassRepeatReg');
let btnShowPassRegis = document.querySelector('#showPassReg');

btnShowPassRegis.addEventListener('click', showPassRegis);

function showPassRegis(){
    let iconShow = document.querySelector('#showPassRegIcon');
    if(iconShow.name === "eye-outline"){
        
        iconShow.name = "eye-off-outline";
        inputPass.type = "text";
        inputRepeat.type = "text";
        
    }else{
        
        iconShow.name = "eye-outline";
        inputPass.type = "password";
        inputRepeat.type = "password";
    
    }
}