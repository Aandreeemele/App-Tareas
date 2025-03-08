async function createSection() {
    const section = document.createElement('section');
    section.className = "section-1";

    
    const tareas = await fetchTareas();
    tareas.forEach((tarea) => {
        section.appendChild(createTaskElement(tarea.id, tarea.descripcion, tarea.completada));
    });

   const newDiv = document.createElement('div');
    newDiv.className = "div-bus";
    newDiv.textContent = "Contenido de la tarea.....";
    section.appendChild(newDiv);

    
    const addTaskDiv = document.createElement('div');
    addTaskDiv.className = "div-special";
    addTaskDiv.textContent = "Agregar Tarea";

    
    addTaskDiv.addEventListener('click', async () => {
        const descripcion = prompt("Ingrese la descripción de la tarea:");
        if (descripcion) {
            const nuevaTarea = await agregarTarea(descripcion);
            section.insertBefore(createTaskElement(nuevaTarea.insertId, nuevaTarea.descripcion, false), newDiv);
        }
    });

    section.appendChild(addTaskDiv);

    return section;
}

function createTaskElement(id, descripcion, completada) {
    const div = document.createElement('div');
    div.className = `div-${id} tarea`;
    if (completada) div.classList.add('checked');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-tarea';
    checkbox.checked = completada;

    const label = document.createElement('label');
    label.textContent = ` Tarea: ${descripcion}`;


    div.addEventListener('click', async () => {
        checkbox.checked = !checkbox.checked;
        div.classList.toggle('checked', checkbox.checked);
        await marcarTareaCompletada(id, checkbox.checked);
    });

    checkbox.addEventListener('change', async () => {
        div.classList.toggle('checked', checkbox.checked);
        await marcarTareaCompletada(id, checkbox.checked);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener('click', async (event) => {
        event.stopPropagation(); 
        await eliminarTarea(id);
        div.remove();
    });

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(deleteButton);

    return div;
}


async function fetchTareas() {
    const response = await fetch('http://localhost:3000/tareas');
    return await response.json();
}

async function agregarTarea(descripcion) {
    const response = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion })
    });
    return await response.json();
}

async function marcarTareaCompletada(id, completada) {
    await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completada })
    });
}

async function eliminarTarea(id) {
    await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'DELETE'
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    const app = document.getElementById('app');
    const section = await createSection();
    app.appendChild(section);
});