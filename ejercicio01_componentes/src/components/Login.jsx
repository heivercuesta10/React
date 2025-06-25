
import React from 'react'
import { useState } from "react"
import './Login.css'; // Importamos el archivo CSS

function Login() {
  
   const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el login
    console.log('Datos del formulario:', formData);
    alert(`Usuario: ${formData.usuario}\nContraseña: ${formData.password}`);
  };
  
  
  
    return (
    <div>
        <h3> Formulario de Login </h3>

        <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        
        <div className="form-group">
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
      



    </div>
  )
}

export default Login
