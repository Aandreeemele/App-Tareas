import { createHeader } from "./componentes/header/header.js";
import { formulario, crearFormularioTarea } from "./componentes/contenedor/contenedor.js";
import { crearFormularioLogin } from "./componentes/contenedor/login.js";

async function cargarContenidoPrincipal() {
    try {
        let DOM = document.getElementById("root");
        if (!DOM) {
            console.error(" No se encontró el elemento con id 'root'");
            return;
        }

        DOM.innerHTML = ""; 
        console.log(' Cargando header...');
        DOM.appendChild(createHeader());

        console.log(' Cargando formulario...');
        const formularioElement = await formulario(); 
        DOM.appendChild(formularioElement);

        console.log(' Cargando formulario de tarea...');
        DOM.appendChild(crearFormularioTarea());
    } catch (error) {
        console.error(" Error al cargar el contenido principal:", error);
    }
}

function cargarDOM() {
    let DOM = document.getElementById("root");
    if (!DOM) {
        console.error(" No se encontró el elemento con id 'root'");
        return;
    }

    console.log('s Cargando formulario de login...');
    const formularioLogin = crearFormularioLogin(cargarContenidoPrincipal); 
    DOM.appendChild(formularioLogin);
}

document.addEventListener("DOMContentLoaded", cargarDOM);
