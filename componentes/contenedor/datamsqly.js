const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu_contraseña',
    database: 'nombre_base_datos'
});

db.connect();

app.get('/get-tareas', (req, res) => {
    db.query('SELECT id, nombre_tarea, IF(estado, "TRUE", "FALSE") AS estado FROM tareas', (err, results) => {
        if (err) {
            console.error('Error de consulta:', err);
            return res.status(500).send('Error al consultar la base de datos');
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
