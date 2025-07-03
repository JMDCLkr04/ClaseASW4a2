import type { usuario, CreateUsuarioRequest } from '../types/Usuario';

const SUPABASE_URL = 'https://arjjnnyvymlqtwtryen.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocmpqbm55dnltbHF0d3RyeWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODc2MTYsImV4cCI6MjA2NzA2MzYxNn0.ooRlaMfdAVEsSVeJXOSEBldNp1hFwe8md06QH3sVnrQ';
const API_BASE_URL = `${SUPABASE_URL}/rest/v1/usuario`;

// Headers comunes para todas las peticiones
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'apikey': SUPABASE_ANON_KEY
});

export const UsuarioService = {
  async getAllUsr(): Promise<usuario[]> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      
      const usuario = await response.json();
      return usuario;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async getUsrById(id: string): Promise<usuario> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener el usuario');
      }
      
      const usuario = await response.json();
      if (usuario.length === 0) {
        throw new Error('Usuario no encontrado');
      }
      
      return usuario[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async createUsuario(movie: CreateUsuarioRequest): Promise<usuario> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          ...getHeaders(),
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(movie),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
      
      const createdUsr = await response.json();
      return createdUsr[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async updateUsuario(id: string, usuario: CreateUsuarioRequest): Promise<usuario> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          ...getHeaders(),
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(usuario),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
      
      const updatedUsuario = await response.json();
      if (updatedUsuario.length === 0) {
        throw new Error('Producto no encontrado para actualizar');
      }
      
      return updatedUsuario[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async deleteUsr(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}; 