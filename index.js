import { createHeader } from "./componentes/header/header.js";
import { createFooter } from "./componentes/footer/footer.js";
import { createSection } from "./componentes/contenedor/data.js";

async function cargarDOM() {
   
    const root = document.querySelector("#root");

    const header = createHeader();
    root.appendChild(header);
   
    const section = await createSection();
    root.appendChild(section);
    
    const footer = createFooter();
    root.appendChild(footer);
}

cargarDOM();