import { createHeader } from "./componentes/header/header.js";
import { createFooter } from "./componentes/footer/footer.js"; 
import { createSection } from "./componentes/contenedor/contenedor.js"; 

let DOM = document.querySelector("#root");

DOM.appendChild(createHeader()); 
DOM.appendChild(createSection()); 
DOM.appendChild(createFooter()); 
