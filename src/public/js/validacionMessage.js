/*
#nameUser
#email
#message
#btnSubmit
*/
let inpName,inpMail,textAreaMessage,btnSubmit;

inpName = document.querySelector('#nameUser');
inpMail = document.querySelector('#email');
message = document.querySelector('#message');


const expReg = {
    "inpName": /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    "inpMail": /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "message": /^^[a-zA-Z0-9.,:;?!]+[a-zA-Z0-9\s.,:;?!]*$/,
    "groserias":/^(?!.*\b(vergas|putos|culos|invesiles|idiotas|mierdas|tontos|ingratos|pendejos|verga|puto|culo|invesil|idiota|mierda|tonto|ingrato|pendejo)\b).*$/,
};

document.querySelector('.messageErrValidation').style.display = "none"

inpName.addEventListener('keyup', () => validar())

function validar() {
    let spanErr = document.querySelector('#messageErrValidation__name');
    let label = document.querySelector('#label__nameUser');
    if(!expReg.inpName.test(inpName.value)){
        inpName.classList.add('inpError');
        label.classList.add('labelError');
        spanErr.textContent = "Solo se permiten nombres de personas";
        spanErr.style.display = "inline";
    }else{
        label.classList.remove('labelError');
        inpName.classList.remove('inpError');
        spanErr.style.display = "none";
    }
    
    if(inpName.value === ""){
        label.classList.add('labelError');
        inpName.classList.add('inpError');
        spanErr.textContent = "Este campo es obligatorio"
        spanErr.style.display = "inline";
    }
}
