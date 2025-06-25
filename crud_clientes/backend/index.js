

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_clientes'
});

// Verificar conexión
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Ruta para agregar un cliente
app.post('/clientes', (req, res) => {
  const { nombre, precio, disponibilidad } = req.body;
  db.query(
    'INSERT INTO clientes (nombre, precio, disponibilidad) VALUES (?, ?, ?)',
    [nombre, precio, disponibilidad],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Cliente agregado' });
    }
  );
});

// Ruta para actualizar un cliente
app.put('/clientes/:id', (req, res) => {
  const { nombre, precio, disponibilidad } = req.body;
  db.query(
    'UPDATE clientes SET nombre=?, precio=?, disponibilidad=? WHERE id=?',
    [nombre, precio, disponibilidad, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Cliente actualizado' });
    }
  );
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
  db.query('DELETE FROM clientes WHERE id=?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Cliente eliminado' });
  });
});

app.listen(5000, () => {
  console.log('Servidor backend en http://localhost:5000');
});