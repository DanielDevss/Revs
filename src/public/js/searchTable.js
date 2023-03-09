let inp = document.querySelector('#search');
let contenido = document.querySelector('tbody');


function filterCategorie(id){
    let categorie = document.querySelector(`#categorie${id}`).textContent.toUpperCase();
    const webName = contenido.getElementsByTagName("tr");

    for (let i = 0; i < webName.length; i++) {
        const a = webName[i].textContent;
        if (a.toUpperCase().indexOf(categorie) > -1) {
            webName[i].style.display = "";
        } else {
            webName[i].style.display = "none";
        }
    }

    if(inp.value === null){
        slide.style.display = "none";
    } 
}

inp.addEventListener('keypress', filtrar);

function filtrar(){

    const filter = inp.value.toUpperCase();
    const webName = contenido.getElementsByTagName("tr");

    for (let i = 0; i < webName.length; i++) {
        const a = webName[i].textContent;
        if (a.toUpperCase().indexOf(filter) > -1) {
            webName[i].style.display = "";
        } else {
            webName[i].style.display = "none";
        }
    }

    if(inp.value === null){
        slide.style.display = "none";
    } 

}