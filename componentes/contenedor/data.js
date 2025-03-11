async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tareas');
        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return [];
    }
}

async function addTaskToDatabase(description) {
    try {
        const response = await fetch('http://localhost:3000/tareas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion: description })
        });

        return await response.json();
    } catch (error) {
        console.error("Error al agregar tarea:", error);
    }
}

function createTaskElement(task) {
    let div = document.createElement('div');
    div.className = `div-${task.id} tarea`;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-tarea';
    checkbox.checked = task.completada;

    let label = document.createElement('label');
    label.textContent = ` ${task.descripcion}`;

    checkbox.addEventListener('change', async () => {
        await fetch(`http://localhost:3000/tareas/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completada: checkbox.checked })
        });
        div.classList.toggle('checked', checkbox.checked);
    });

    div.appendChild(checkbox);
    div.appendChild(label);

    return div;
}

async function createSection() {
    let section = document.createElement('section');
    section.className = "section-1";

    let tasks = await fetchTasks();
    tasks.forEach(task => section.appendChild(createTaskElement(task)));

    let addTaskDiv = document.createElement('div');
    addTaskDiv.className = "div-special";
    addTaskDiv.textContent = "Agregar Tarea";

    addTaskDiv.addEventListener('click', async () => {
        let taskDescription = prompt("Ingrese la descripción de la nueva tarea:");
        if (taskDescription) {
            let newTask = await addTaskToDatabase(taskDescription);
            section.appendChild(createTaskElement({ id: newTask.insertId, descripcion: taskDescription, completada: false }));
        }
    });

    section.appendChild(addTaskDiv);
    
    return section;
}

export { createSection };
