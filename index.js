import { createHeader } from "./componentes/header/header.js";
import { createFooter } from "./componentes/footer/footer.js";
import { createSection } from "./componentes/contenedor/data.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const root = document.querySelector("#root");
        if (!root) throw new Error("No se encontró el elemento #root");

        const header = createHeader();
        root.appendChild(header);

        const section = await createSection();
        root.appendChild(section);

        const footer = createFooter();
        root.appendChild(footer);

        console.log("DOM cargado exitosamente");
    } catch (error) {
        console.error("Error al cargar el DOM:", error);
    }
});

