import { useEffect, useState } from 'react';
import type { usuario } from '../interfaces/Usuario';

export default function ProductoList() {
    const [productos, setProductos] = useState<usuario[]>([]);

    useEffect(() => {
        const data: usuario[] = [
            { id: 1, nombre: 'CafeLover', estado: true, direccion: 'mi casa', telefono: '1234567890', email: 'belcas@tumarido.com' },
            { id: 2, nombre: 'PerroEspacial', estado: true, direccion: 'su casa', telefono: '0987654321', email: 'moises@ebrahim.com' },
        ];
        setProductos(data);
    }, []);

    return (
        <ul>
            {productos.map((usuario) => (
                <li key={usuario.id}>
                    {usuario.nombre} - {usuario.email}
                </li>
            ))}
        </ul>
    );
}