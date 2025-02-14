function createSection() {
    let section = document.createElement('section');
    section.className = "section-1";
    
    for (let i = 1; i <= 12; i++) {
        section.appendChild(createTaskElement(i));
    }

    let newDiv = document.createElement('div');
    newDiv.className = "div-bus";
    newDiv.textContent = "Contenido de la tarea.....";
    section.appendChild(newDiv);

    let addTaskDiv = document.createElement('div');
    addTaskDiv.className = "div-special";
    addTaskDiv.textContent = "Agregar Tarea";

    addTaskDiv.addEventListener('click', () => {
        let taskCount = section.querySelectorAll('.tarea').length + 1;
        section.insertBefore(createTaskElement(taskCount), newDiv); // Agregar antes del input de contenido
    });

    section.appendChild(addTaskDiv);
    
    return section;
}

function createTaskElement(taskNumber) {
    let div = document.createElement('div');
    div.className = `div-${taskNumber} tarea`;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-tarea';

    let label = document.createElement('label');
    label.textContent = ` Tarea: ${taskNumber}`;

    div.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked; 
        div.classList.toggle('checked', checkbox.checked); 
    });


    checkbox.addEventListener('change', () => {
        div.classList.toggle('checked', checkbox.checked); 
    });


    div.appendChild(checkbox);
    div.appendChild(label);

    return div;
}

export { createSection };
