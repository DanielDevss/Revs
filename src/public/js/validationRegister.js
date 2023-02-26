let login = document.querySelector('#formularioLogin');
let email = document.querySelector('#inpEmail');
let pass = document.querySelector('#inpPass');

const expRegLogin = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pass: /^[a-zA-Z0-9._-]{8,16}$/,
}

const submitLogin = {
    email : false,
    pass : false,
}

email.addEventListener('blur', () => expRegVal(expRegLogin.email, "Email", "No es un formato de correo válido"));
pass.addEventListener('blur', () => {
    if(expRegVal(expRegLogin.pass, "Pass", "La contraseña no es valida")){
        submitLogin.pass = true;
    }
});

login.addEventListener('submit', function(e){

    e.preventDefault()
    if(submitLogin.email || submitLogin.pass){
        this.submit()
    }
})


function expRegVal (expReg, inp, message){
    let input = document.querySelector(`#inp${inp}`);
    let spanErr = document.querySelector(`#spanErr__${inp}`)

    if(!expReg.test(input.value) || input.value === ""){
        spanErr.textContent = message;
        return false      
    }
    else{
        spanErr.textContent = "";
        return true
    }
}


//STUB - FORMULARIO DE REGISTRO
let spans = document.querySelectorAll('.span__alert');
let inputs = document.querySelectorAll('.formulario__input');
let terminos = document.querySelector('#terminos');
let formularioRegister = document.querySelector('#formularioRegister');
let btnSubmit = document.querySelector('#btnSubmitRegister');

const expReg = {
    name : /^[A-Za-zÁÉÍÓÚáéíóúÜüñÑ]+([ ]?[A-Za-zÁÉÍÓÚáéíóúÜüñÑ]+)*$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\d{10}$/,
    pass: /^[a-zA-Z0-9._-]{8,16}$/,

}

spans[0].textContent = "Solo se admiten nombres propios"
spans[1].textContent = "Seleccione una profesión"
spans[2].textContent = "Solo correos electrónicos validos"
spans[3].textContent = "El número de teléfono tiene que ser valido; solo escribir 10 dígitos"
spans[4].textContent = "De 8 a 16 caracteres, solo se permiten los simbolos; punto, guion medio y bajo."
spans[5].textContent = "La contraseña debe coincidir con la anterior"

const submitRegister = {
    name: false,
    profesion: false,
    email: false,
    phone: true,
    pass: false,
    repeat: false,
}


// ? INPUT NOMBRE
inputs[2].addEventListener('blur', () => {
    if(validarInputs(expReg.name, "Name")){
        submitRegister.name = true;
    }else{
        submitRegister.name = false
    }
})

// ? SELECT PROFESION
inputs[3].addEventListener('click', () => {
    if(validarSelects("Profesion")){
        submitRegister.profesion = true;
    }else{
        submitRegister.profesion = false;
    }
})

// ? INPUT EMAIL 
inputs[4].addEventListener('blur', () => {
    if(validarInputs(expReg.email, "Email")){
        submitRegister.email = true;
    }else{
        submitRegister.email = false
    }
})

// ? INPUT PHONE
inputs[5].addEventListener('blur', () => {
    if(!validarInputs(expReg.phone, "Phone")){
        submitRegister.phone = false;
    }
    if(inputs[0].value === ""){
        submitRegister.phone = true;
    }
})

// ? INPUT PASWORD
inputs[6].addEventListener('blur', () => {
    if(validarInputs(expReg.pass, "Pass")){
        submitRegister.pass = true;
    }else{
        submitRegister.pass = false
    }
})

// ? INPUT PASWORD REPEAT 
inputs[7].addEventListener('keyup', () => {
    if(validarPassRepeat()){
        submitRegister.repeat = true;
    }else{
        submitRegister.repeat = false;
    }
});


// ? VALIDAR SUBMIT

formularioRegister.addEventListener('submit', function(e) {
    e.preventDefault()
    if(submitRegister.name && submitRegister.profesion && submitRegister.email && submitRegister.phone && submitRegister.pass && submitRegister.repeat){
        console.log('Registrado');
        this.submit();
    }
})


function validarInputs (expReg, inp){
    let input = document.querySelector(`#inp${inp}Reg`);
    let spanErr = document.querySelector(`#spanAlert__${inp}`)

    if(!expReg.test(input.value) || input.value === ""){
        spanErr.classList.add('span__alert--active')
        return false      
    }
    else{
        spanErr.classList.remove('span__alert--active')
        return true
    }
}

function validarSelects (slct) {
    let select = document.querySelector(`#inp${slct}Reg`);
    if(select.value === ""){
        return false
    }else{
        return true
    }
}

function validarPassRepeat (){
    let repeat = inputs[7].value;
    let pass = inputs[6].value;
    let span = document.querySelector('#spanAlert__PassRepeat');
    if(pass === repeat){
        span.classList.remove('span__alert--active')
        return true;
    }else{
        span.classList.add('span__alert--active')
        return false;
    }
}
