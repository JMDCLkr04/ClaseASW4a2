export interface usuario{
    id: string,
    nombre: string,
    estado: boolean,
    direccion: string,
    telefono: string,
    email: string
}
export interface CreateUsuarioRequest {
  nombre: string;
  email: string;
  direccion: string;
  telefono: string; 
} 