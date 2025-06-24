import { useEffect, useState } from 'react';
import type { bar } from '../interfaces/Bar';

export default function BarList(){
const [bar, setBar] = useState<bar[]>([]);
 useEffect(() => {
 const data: bar[] = [
 { id: 1, nombre: 'Margarita', ubicacion: "Tu casita", stack: "Full", disponibilidad: true },
 { id: 2, nombre: 'Margarita', ubicacion: "A lado de mi casa", stack: "Vacio", disponibilidad: false },
 ];
 setTimeout(() => setBar(data), 1000); // Simula carga asincrónica
 }, []);
 return (
 <div>
 <h2>Bares</h2>
 {bar.map((p) => (
   <div key={p.id}>
	 <p>Bar: {p.nombre}</p>
	 <p>Ubicacion: {p.ubicacion}</p>
	 <p>stack: {p.stack}</p>
	 <p>Disponibilidad: {p.disponibilidad}</p>
   </div>
 ))}
 </div>
 );
}