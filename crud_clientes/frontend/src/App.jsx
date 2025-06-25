import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    disponibilidad: true
  });
  const [editingId, setEditingId] = useState(null);

  // Obtener clientes
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const res = await axios.get('http://localhost:5000/clientes');
    setClientes(res.data);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Enviar formulario (Crear/Actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/clientes/${editingId}`, formData);
    } else {
      await axios.post('http://localhost:5000/clientes', formData);
    }
    fetchClientes();
    setFormData({ nombre: '', precio: '', disponibilidad: true });
    setEditingId(null);
  };

  // Editar cliente
  const handleEdit = (cliente) => {
    setFormData({
      nombre: cliente.nombre,
      precio: cliente.precio,
      disponibilidad: cliente.disponibilidad
    });
    setEditingId(cliente.id);
  };

  // Eliminar cliente
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/clientes/${id}`);
    fetchClientes();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD de Clientes</h1>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
        <label>
          Disponible:
          <input
            type="checkbox"
            name="disponibilidad"
            checked={formData.disponibilidad}
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          {editingId ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      {/* Tabla de clientes */}
      <table border="1" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>${cliente.precio}</td>
              <td>{cliente.disponibilidad ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(cliente)}>Editar</button>
                <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;