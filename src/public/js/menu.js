let btnMenu, menu, bg;

btnMenu = document.querySelector('#btnMenu');
menu = document.querySelector('#menu');
bg = document.querySelector('.bgNavbar');


btnMenu.addEventListener('click', showMenu);
bg.addEventListener('click', close);

function showMenu() {
    menu.style.marginLeft = "0";
    bg.style.width = "100%";
    bg.style.opacity = "0.5";
}
function close() {
    menu.style.marginLeft = "-250px"
    bg.style.width = "0%";
    bg.style.opacity = "0";
}