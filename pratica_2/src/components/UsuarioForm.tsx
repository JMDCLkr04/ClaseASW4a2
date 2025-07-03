
import { useState, useEffect } from 'react';
import type { usuario, CreateUsuarioRequest } from '../types/Usuario';

interface UserFormProps {
  usuario?: usuario | null;
  onSubmit: (usuario: CreateUsuarioRequest) => void;
  onCancel: () => void;
  loading: boolean;
}

export const UserForm = ({ usuario, onSubmit, onCancel, loading }: UserFormProps) => {
  const [formData, setFormData] = useState<CreateUsuarioRequest>({
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        direccion: usuario.direccion,
        telefono: usuario.telefono
      });
    } else {
      setFormData({
        nombre: '',
        email: '',
        direccion: '',
        telefono: ''
      });
    }
  }, [usuario]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre.trim() && formData.email.trim() && formData.direccion.trim() && formData.telefono.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="Usr-form">
      <h2>{usuario ? 'Editar usuario' : 'Nuevo usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

         <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
         <div className="form-group">
          <label htmlFor="direccion">Direccion:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
         <div className="form-group">
          <label htmlFor="telefono">Telefono:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (usuario ? 'Actualizar' : 'Crear')}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}; 
