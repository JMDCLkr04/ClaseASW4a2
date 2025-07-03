import { useState, useEffect } from 'react';
import type { usuario, CreateUsuarioRequest } from './types/Usuario';
import { UsuarioService } from './services/UsuarioServ';
import { UsuarioList } from './components/UsuarioList';
import { UserForm } from './components/UsuarioForm';
import './App.css';

function App() {
  const [usuarios, setUsrs] = useState<usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingUsr, setEditingUsr] = useState<usuario | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsrs();
  }, []);

  const loadUsrs = async () => {
    try {
      setLoading(true);
      setError(null);
      const usrData = await UsuarioService.getAllUsr();
      setUsrs(usrData);
    } catch (err) {
      setError('Error al cargar las películas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUsr = async (usrData: CreateUsuarioRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newMovie = await UsuarioService.createUsuario(usrData);
      setUsrs(prev => [newMovie, ...prev]);
    } catch (err) {
      setError('Error al crear usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsr = async (usrData: CreateUsuarioRequest) => {
    if (!editingUsr) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedMovie = await UsuarioService.updateUsuario(editingUsr.id, usrData);
      setUsrs(prev => 
        prev.map(user => 
          user.id === editingUsr.id ? updatedMovie : user
        )
      );
      setEditingUsr(null);
    } catch (err) {
      setError('Error al actualizar la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await UsuarioService.deleteUsr(id);
      setUsrs(prev => prev.filter(usuarios => usuarios.id !== id));
    } catch (err) {
      setError('Error al eliminar la película');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMovie = (user: usuario) => {
    setEditingUsr(user);
  };

  const handleCancelForm = () => {
    setEditingUsr(null);
  };

  const handleSubmitForm = (usrData: CreateUsuarioRequest) => {
    if (editingUsr) {
      handleUpdateUsr(usrData);
    } else {
      handleCreateUsr(usrData);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestor de Usuarios</h1>
        <div className="header-info">
          <span className="users-count">
            {usuarios.length} película{usuarios.length !== 1 ? 's' : ''} registrada{usuarios.length !== 1 ? 's' : ''}
          </span>
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        <div className="crud-container">
          <div className="form-section">
            <UserForm
              usuario={editingUsr}
              onSubmit={handleSubmitForm}
              onCancel={handleCancelForm}
              loading={loading}
            />
          </div>
          
          <div className="list-section">
            <UsuarioList
              usuarios={usuarios}
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;