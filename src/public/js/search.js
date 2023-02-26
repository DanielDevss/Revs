let inpSearch, categories, slide;

inpSearch = document.querySelector('#searchInput');
contenido = document.querySelector('#contenido');
slide = document.querySelector('#containerCarousel');

inpSearch.style.display = "block";

//LINK - Al hacer click enfocamos el contenido
inpSearch.addEventListener('click', () => contenido.scrollIntoView({ behavior: "smooth" }))

//LINK - Filtración de datos desde el buscador 
inpSearch.addEventListener('keyup', filtrar);




function filtrar() {
    const filter = inpSearch.value.toUpperCase();
    const webName = contenido.getElementsByTagName("li");

    for (let i = 0; i < webName.length; i++) {
        const a = webName[i].textContent;
        if (a.toUpperCase().indexOf(filter) > -1) {
            webName[i].style.display = "";
        } else {
            webName[i].style.display = "none";
        }
    }

    if(inpSearch.value === null){
        slide.style.display = "none";
    } 
}


