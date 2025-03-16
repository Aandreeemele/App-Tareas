// Función para crear la sección de tareas
export function createSection() {
    let section = document.createElement('section');
    section.className = "section-1";

    let addTaskDiv = document.createElement('div');
    addTaskDiv.className = "div-special";
    addTaskDiv.textContent = "Agregar Tarea";

    addTaskDiv.addEventListener('click', () => {
        let taskCount = section.querySelectorAll('.tarea').length + 1;
        section.insertBefore(createTaskElement(taskCount), addTaskDiv); // Agregar antes del input de contenido
    });

    section.appendChild(addTaskDiv);
    
    return section;
}

// Función para crear un nuevo elemento de tarea
function createTaskElement(taskNumber) {
    let div = document.createElement('div');
    div.className = `div-${taskNumber} tarea`;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-tarea';

    let label = document.createElement('label');
    label.textContent = ` Tarea: ${taskNumber}`;

    div.appendChild(checkbox);
    div.appendChild(label);

    return div;
}
