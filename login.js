function crearFormularioLogin(cargarContenidoPrincipal) {
    let contenedorLogin = document.createElement("section");
    contenedorLogin.className = "login-container";

    let formularioLogin = document.createElement("form");
    formularioLogin.id = "login-form";

    let grupoUsuario = document.createElement("div");
    grupoUsuario.className = "input-group";

    let labelUsuario = document.createElement("label");
    labelUsuario.htmlFor = "username";
    labelUsuario.textContent = "Usuario";

    let inputUsuario = document.createElement("input");
    inputUsuario.type = "text";
    inputUsuario.id = "username";
    inputUsuario.name = "username";
    inputUsuario.required = true;

    grupoUsuario.appendChild(labelUsuario);
    grupoUsuario.appendChild(inputUsuario);

    let grupoContraseña = document.createElement("div");
    grupoContraseña.className = "input-group";

    let labelContraseña = document.createElement("label");
    labelContraseña.htmlFor = "password";
    labelContraseña.textContent = "Contraseña";

    let inputContraseña = document.createElement("input");
    inputContraseña.type = "password";
    inputContraseña.id = "password";
    inputContraseña.name = "password";
    inputContraseña.required = true;

    grupoContraseña.appendChild(labelContraseña);
    grupoContraseña.appendChild(inputContraseña);

    let botonEnvio = document.createElement("button");
    botonEnvio.type = "submit";
    botonEnvio.textContent = "Ingresar";

    formularioLogin.appendChild(grupoUsuario);
    formularioLogin.appendChild(grupoContraseña);
    formularioLogin.appendChild(botonEnvio);

    formularioLogin.addEventListener("submit", async function (evento) {
        evento.preventDefault();
        const username = inputUsuario.value.trim();  
        const password = inputContraseña.value.trim();  

        if (!username || !password) {
            alert("Por favor ingresa un nombre de usuario y una contraseña.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user_id", data.user_id);
                cargarContenidoPrincipal();
            } else {
                alert(data.error || "Credenciales incorrectas. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error en la solicitud de login:", error);
            alert("Hubo un problema al intentar iniciar sesión.");
        }
    });

    contenedorLogin.appendChild(formularioLogin);
    return contenedorLogin;
}
