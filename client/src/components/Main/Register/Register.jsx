import React,{ useState } from 'react';
import { signUp } from '../../../services/userServices';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, email, password);
      setSuccess('Usuario creado correctamente. Redirigiendo al login...');
      
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Nombre de usuario" 
          required 
        />
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Contraseña" 
          required 
        />
        <button type="submit">Registrarse</button>
      </form>
      {error!=null?<p>{error}</p>: null}
      {success!=null?<p>{success}</p>: null}
    </section>
  );
};

export default Register;
