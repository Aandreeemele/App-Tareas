import { createHeader } from "./componentes/header/header.js";
import { createFooter } from "./componentes/footer/footer.js"; 
import { createSection } from "./componentes/contenedor/data.js";

let DOM = document.querySelector("#root");

DOM.appendChild(createHeader()); 

// Manejo correcto de la función asíncrona
createSection().then(section => {
    DOM.appendChild(section);
}).catch(error => {
    console.error("Error al crear la sección:", error);
});

DOM.appendChild(createFooter());
