let inpName = document.querySelector('#name'), 
    inpPhone = document.querySelector('#phone'),
    spanName = document.querySelector('.span-name'),
    spanPhone = document.querySelector('.span-phone'),
    formulario = document.querySelector('#userUpdateForm');

inpName.addEventListener('blur', () => {
    validarName()
})
inpPhone.addEventListener('blur', () => {
    validarPhone()
})
formulario.addEventListener('submit', function(e){
    e.preventDefault()
    if(validados.name && validarPhone){
        this.submit();
    }
})


const validados = {
    name    :   true,
    phone   :   true
}

const expReg = {
    name : /^[A-Za-zÁÉÍÓÚáéíóúÜüñÑ]+([ ]?[A-Za-zÁÉÍÓÚáéíóúÜüñÑ]+)*$/,
    phone: /^\d{10}$/,
}

function validarName(){
    if(expReg.name.test(inpName.value)){
        spanName.textContent = ""
        spanName.classList.remove('span__alert--active')
        validados.name = true;
    }
    else if(inpName.value === ""){
        spanName.textContent = "El campo no puede ir vacio"
        spanName.classList.add('span__alert--active')
        validados.name = false;
    }else{
        spanName.textContent = "Solo se admiten nombres"
        spanName.classList.add('span__alert--active')
        validados.name = false;
    }
}


function validarPhone(){
    if(expReg.phone.test(inpPhone.value)){
        spanPhone.textContent = ""
        spanPhone.classList.remove('span__alert--active')
        validados.phone = true;
        
    }
    else if(inpPhone.value.length > 10){
        let phone = inpPhone.value.replace(" ", "").replace(" ", "");
        inpPhone.value = phone;
        validados.phone = false;
    }
    else{
        spanPhone.textContent = "Solo se admiten 10 números"
        spanPhone.classList.add('span__alert--active')
        validados.phone = false;
    }
}
