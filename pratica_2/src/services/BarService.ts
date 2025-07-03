import type { bar, CreateBarRequest } from '../types/Bar';

const SUPABASE_URL = 'https://ahrjjnnyvymlqtwtryen.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocmpqbm55dnltbHF0d3RyeWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODc2MTYsImV4cCI6MjA2NzA2MzYxNn0.ooRlaMfdAVEsSVeJXOSEBldNp1hFwe8md06QH3sVnrQ';
const API_BASE_URL = `${SUPABASE_URL}/rest/v1/bar`;

// Headers comunes para todas las peticiones
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'apikey': SUPABASE_ANON_KEY
});

export const barService = {
  async getAllBar(): Promise<bar[]> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los bares');
      }
      
      const bares = await response.json();
      return bares;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async getBarById(id: string): Promise<bar> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'GET',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener el bar');
      }
      
      const bares = await response.json();
      if (bares.length === 0) {
        throw new Error('Bar no encontrado');
      }
      
      return bares[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async createBar(bar: CreateBarRequest): Promise<bar> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          ...getHeaders(),
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(bar),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el bar');
      }
      
      const createdbar = await response.json();
      return createdbar[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async updateBar(id: string, bar: CreateBarRequest): Promise<bar> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          ...getHeaders(),
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(bar),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el bar');
      }
      
      const updatedBar = await response.json();
      if (updatedBar.length === 0) {
        throw new Error('Bar no encontrado para actualizar');
      }
      
      return updatedBar[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async deleteBar(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar el bar');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}; 