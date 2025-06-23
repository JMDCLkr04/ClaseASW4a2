// Interface creada por David Cevallos
export interface Pedido{
    id: number;
    producto: string;
    direccion: string;
    usuario: string;
    estado: ["entregado", "en camino", "cancelado"]
}