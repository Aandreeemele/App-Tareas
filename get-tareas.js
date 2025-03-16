const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Diami2025',
    database: 'todo_list',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function conectar(consulta_sql, params = []) {
    try {
        const conexion = await pool.getConnection();
        console.log("Conexión exitosa a la base de datos.");

        const [rows] = await conexion.execute(consulta_sql, params);
        conexion.release();

        return rows;
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        return null;
    }
}

// Registro de usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const consulta_sql = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
    const resultado = await conectar(consulta_sql, [username, password]);
    res.json(resultado);
});

// Login de usuario
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const consulta_sql = "SELECT id FROM usuarios WHERE username = ? AND password = ?";
    const resultado = await conectar(consulta_sql, [username, password]);
    if (resultado.length > 0) {
        res.json({ user_id: resultado[0].id });
    } else {
        res.status(401).json({ error: "Credenciales incorrectas" });
    }
});

// Obtener tareas de un usuario específico
app.get('/tareas/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const resultado = await conectar("SELECT * FROM tareas WHERE user_id = ?", [user_id]);
    res.json(resultado);
});

// Crear una nueva tarea para un usuario
app.post('/tareas', async (req, res) => {
    const { descripcion, user_id } = req.body;
    const consulta_sql = "INSERT INTO tareas (descripcion, user_id) VALUES (?, ?)";
    const resultado = await conectar(consulta_sql, [descripcion, user_id]);
    res.json(resultado);
});

// Marcar una tarea como completada
app.put('/tareas/:id', async (req, res) => {
    const { id } = req.params;
    const { completada, user_id } = req.body;
    const consulta_sql = "UPDATE tareas SET completada = ? WHERE id = ? AND user_id = ?";
    const resultado = await conectar(consulta_sql, [completada, id, user_id]);
    res.json(resultado);
});

// Eliminar una tarea
app.delete('/tareas/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    const consulta_sql = "DELETE FROM tareas WHERE id = ? AND user_id = ?";
    const resultado = await conectar(consulta_sql, [id, user_id]);
    res.json(resultado);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
