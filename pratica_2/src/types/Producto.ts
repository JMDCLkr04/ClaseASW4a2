export interface Producto {
 id: number;
 nombre: string;
 precio: number;
 disponible: boolean;
}

export interface CreateProductoRequest {
  nombre: string;
  precio: string;
  disponible: string;
} 