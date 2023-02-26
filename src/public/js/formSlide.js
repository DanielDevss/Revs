let containerParts = document.querySelector('#formularioRegister .register__containers');
let loader = document.querySelector('.charge');

function part1(){
    containerParts.style.marginLeft = "0%"
    loader.style.width = "33.33%"
    loader.style.background = "var(--colorDanger)"
}
function part2(){
    containerParts.style.marginLeft = "-100%";
    loader.style.width = "66.66%"
    loader.style.background = "#E79301"
}
function part3(){
    containerParts.style.marginLeft = "-200%";
    loader.style.width = "100%"
    loader.style.background = "var(--colorPrimary)"
}