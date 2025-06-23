import { useState } from 'react';
import type { Producto } from '../interfaces/Producto';
export default function AgregarProductoForm({ onAgregar }: { onAgregar: (nuevo:
Producto) => void }) {
 const [nombre, setNombre] = useState('');
 const [precio, setPrecio] = useState(0);
 const manejarEnvio = (e: React.FormEvent) => {
 e.preventDefault();
 const nuevoProducto: Producto = {
 id: Date.now(),
 nombre,
 precio,
 disponible: true,
 };
 onAgregar(nuevoProducto);
 setNombre('');
 setPrecio(0);
 };
 return (
 <form onSubmit={manejarEnvio}>
 <input value={nombre} onChange={(e) => setNombre(e.target.value)}
placeholder="Nombre" />
 <input type="number" value={precio} onChange={(e) => setPrecio(+e.target.value)}
placeholder="Precio" />
 <button type="submit">Agregar</button>
 </form>
 );
}