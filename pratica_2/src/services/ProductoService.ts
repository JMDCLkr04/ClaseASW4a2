import type { Producto, CreateProductoRequest } from '../types/Producto';

const SUPABASE_URL = 'https://arjjnnyvymlqtwtryen.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocmpqbm55dnltbHF0d3RyeWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODc2MTYsImV4cCI6MjA2NzA2MzYxNn0.ooRlaMfdAVEsSVeJXOSEBldNp1hFwe8md06QH3sVnrQ';
const API_BASE_URL = `${SUPABASE_URL}/rest/v1/producto`;

// Headers comunes para todas las peticiones
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'apikey': SUPABASE_ANON_KEY
});

export const ProductoService = {
  async getAllProductos(): Promise<Producto[]> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      
      const movies = await response.json();
      return movies;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async getProductoById(id: string): Promise<Producto> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }
      
      const movies = await response.json();
      if (movies.length === 0) {
        throw new Error('Producto no encontrado');
      }
      
      return movies[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async createProducto(movie: CreateProductoRequest): Promise<Producto> {
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
      
      const createdMovies = await response.json();
      return createdMovies[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async updateProducto(id: string, movie: CreateProductoRequest): Promise<Producto> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          ...getHeaders(),
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(movie),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
      
      const updatedMovies = await response.json();
      if (updatedMovies.length === 0) {
        throw new Error('Producto no encontrado para actualizar');
      }
      
      return updatedMovies[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async deleteProducto(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}; 