import { useState } from 'react';
import type { ICoctelPersonalizado } from '../interfaces/CoctelPersonalizado';

export default function ICoctelPersonalizado({ onAgregarCoctel }: { onAgregarCoctel: (nuevo: ICoctelPersonalizado) => void }) {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    const manejarEnvio = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevoCoctel: ICoctelPersonalizado = {
            id: Date.now(),
            usuario: '',
            TipoLicor: '',
            Licor: '',
            ingredientes: '',
            precio: 0
        };
        onAgregarCoctel(nuevoCoctel);
        setNombre('');
        setPrecio(0);
    };
    return (
        <form onSubmit={manejarEnvio}>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
            <input type="number" value={precio} onChange={(e) => setPrecio(+e.target.value)} placeholder="Precio" />
            <button type="submit">Agregar</button>
        </form>
    );
}