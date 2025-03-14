export async function fetchTasks() {
    try {
        const response = await fetch("http://localhost:3000/tareas");
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const tasks = await response.json();
        console.log("Tareas obtenidas:", tasks);
        return tasks;
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return [];
    }
}

export async function createSection() {
    const section = document.createElement("section");
    section.className = "section-1";

    const tasks = await fetchTasks();
    if (tasks.length === 0) {
        section.innerHTML = "<p>No hay tareas disponibles.</p>";
        return section;
    }

    console.log("Tareas dentro de createSection:", tasks);
    tasks.forEach(task => section.appendChild(createTaskElement(task)));

    const addTaskDiv = document.createElement("div");
    addTaskDiv.className = "div-special";
    addTaskDiv.textContent = "Agregar Tarea";

    addTaskDiv.addEventListener("click", async () => {
        const descripcion = prompt("Ingrese la descripción de la tarea:");
        if (descripcion && descripcion.trim() !== "") {
            try {
                const newTask = await addTaskToDatabase(descripcion);
                section.appendChild(createTaskElement({ id: newTask.insertId, descripcion, completada: false }));
            } catch (error) {
                console.error("Error al agregar tarea:", error);
            }
        } else {
            console.log("Descripción de tarea no válida.");
        }
    });

    section.appendChild(addTaskDiv);
    return section;
}

async function addTaskToDatabase(descripcion) {
    try {
        const response = await fetch("http://localhost:3000/tareas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ descripcion }),
        });

        if (!response.ok) {
            throw new Error("Error al agregar la tarea");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al agregar tarea a la base de datos:", error);
        throw error;
    }
}

function createTaskElement(task) {
    const div = document.createElement("div");
    div.className = `div-${task.id}`;  // Usar task.id para asegurar que sea único
    if (task.completada) div.classList.add("checked");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-tarea";
    checkbox.checked = task.completada;

    const label = document.createElement("label");
    label.textContent = task.descripcion;

    checkbox.addEventListener("change", async () => {
        div.classList.toggle("checked", checkbox.checked);
        await updateTaskStatus(task.id, checkbox.checked);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", async (e) => {
        e.stopPropagation();  // Evitar que el clic en el botón también marque la tarea
        try {
            await deleteTask(task.id);
            div.remove();
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
        }
    });

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(deleteButton);
    return div;
}

async function updateTaskStatus(id, completada) {
    try {
        const response = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completada }),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el estado de la tarea");
        }

        console.log(`Tarea ${id} actualizada con éxito.`);
    } catch (error) {
        console.error("Error al actualizar estado de tarea:", error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la tarea");
        }

        console.log(`Tarea ${id} eliminada con éxito.`);
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
    }
}
