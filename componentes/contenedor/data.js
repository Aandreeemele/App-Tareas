<<<<<<< HEAD
async function obtenerDatos() {
    try {
        const response = await fetch('http://localhost:5000/data'); 

        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); 

        const dataList = document.getElementById('data-list');
        if (!dataList) {
            console.error('El elemento con ID "data-list" no existe en el DOM.');
            return;
        }

        dataList.innerHTML = ''; 
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(item => {
                if (item.name) {
                    const li = document.createElement('li');
                    li.textContent = item.name; 
                    dataList.appendChild(li);
                } else {
                    console.warn('El objeto no tiene el campo "name":', item);
                }
            });
        } else {
            console.warn('Los datos no son un array o están vacíos:', data);
            dataList.innerHTML = '<li>No hay datos disponibles</li>';
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

obtenerDatos();
=======
function createSection() {
    let section = document.createElement('section');
    section.className = "section-1";

    // Realizar solicitud para obtener tareas
    fetch('/get-tareas')
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos:', data); // Verifica que los datos están llegando
            if (data.length > 0) {
                data.forEach(task => {
                    section.appendChild(createTaskElement(task)); // Usar los datos de la base de datos
                });
            } else {
                console.log('No hay tareas en la base de datos');
            }
        })
        .catch(error => {
            console.error('Error al obtener las tareas:', error);
        });

    let newDiv = document.createElement('div');
    newDiv.className = "div-bus";
    newDiv.textContent = "Contenido de la tarea.....";
    section.appendChild(newDiv);

    let addTaskDiv = document.createElement('div');
    addTaskDiv.className = "div-special";
    addTaskDiv.textContent = "Agregar Tarea";

    addTaskDiv.addEventListener('click', () => {
        let taskCount = section.querySelectorAll('.tarea').length + 1;
        section.insertBefore(createTaskElement({ id: taskCount, nombre_tarea: 'Nueva Tarea', estado: 'FALSE' }), newDiv); // Agregar tarea nueva
    });

    section.appendChild(addTaskDiv);
    
    return section;
}

function createTaskElement(task) {
    let div = document.createElement('div');
    div.className = `div-${task.id} tarea`;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-tarea';
    checkbox.checked = task.estado === 'TRUE'; // Establecer el estado del checkbox

    let label = document.createElement('label');
    label.textContent = `Tarea: ${task.nombre_tarea}`;

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
>>>>>>> 78b8f08 (version3322)
