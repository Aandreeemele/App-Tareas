const express = require('express');
const app = express();
const mysql = require('mysql2');

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Diami2025',
    database: 'nombre_base_datos'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Define la ruta para obtener las tareas
app.get('/get-tareas', (req, res) => {
    db.query('SELECT id, nombre_tarea, IF(estado, "TRUE", "FALSE") AS estado FROM tareas', (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).send('Error al consultar la base de datos');
        }
        res.json(results); // Responde con los datos en formato JSON
    });
});

// Inicia el servidor en el puerto 3001 (puedes cambiarlo por cualquier otro puerto disponible)
app.listen(3001, () => {
    console.log('Servidor corriendo en puerto 3001');
});
