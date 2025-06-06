interface Producto {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    descripcion?: string; // Propiedad opcional
    disponible: boolean;
}

let productos: Producto[] = [];

const formulario = document.getElementById('formulario') as HTMLFormElement;
const nombreInput = document.getElementById('nombre') as HTMLInputElement;
const precioInput = document.getElementById('precio') as HTMLInputElement;
const categoriaInput = document.getElementById('categoria') as HTMLInputElement;
const descripcionInput = document.getElementById('descripcion') as HTMLInputElement;
const disponibleInput = document.getElementById('disponible') as HTMLInputElement;

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErrores();

    const nombre = nombreInput.value.trim();
    const precio = parseFloat(precioInput.value);

    let esValido = true;

    if (nombre === '') {
        mostrarError(nombreInput, 'El nombre es obligatorio');
        esValido = false;
    }
    if (isNaN(precio) || precio <= 0) {
        mostrarError(precioInput, 'El precio debe ser un número positivo');
        esValido = false;
    }
    if (categoriaInput.value.trim() === '') {
        mostrarError(categoriaInput, 'La categoría es obligatoria');
        esValido = false;
    }
    if (!disponibleInput.checked) {
        mostrarError(disponibleInput, 'El producto debe estar disponible');
        esValido = false;
    }
    if (esValido) {
        const nuevoProducto: Producto = {
            id: Date.now(),
            nombre,
            precio,
            categoria: categoriaInput.value,
            descripcion: descripcionInput.value || undefined,
            disponible: disponibleInput.checked
        };
        productos.push(nuevoProducto);
        renderProductos();
        formulario.reset();
    }
});

function mostrarError(input: HTMLInputElement, mensaje: string) {
    const parent = input.parentElement;
    if (!parent) return;
    const prevError = parent.querySelector('.error');
    if (prevError) prevError.remove();

    if (mensaje) {
        const error = document.createElement('span');
        error.className = 'error';
        error.textContent = mensaje;
        parent.appendChild(error);
    }
}

function limpiarErrores() {
    mostrarError(nombreInput, '');
    mostrarError(precioInput, '');
    mostrarError(categoriaInput, '');
    mostrarError(disponibleInput, '');
}

function renderProductos() {
    const contenedor = document.getElementById("lista-productos")!;
    contenedor.innerHTML = "";

    productos.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.style.border = "1px solid #ccc";
        tarjeta.style.padding = "10px";
        tarjeta.style.margin = "10px 0";

        tarjeta.innerHTML = `
            <strong>${producto.nombre}</strong><br>
            Precio: $${producto.precio.toFixed(2)}<br>
            Categoría: ${producto.categoria}<br>
            ${producto.descripcion ? `Descripción: ${producto.descripcion}<br>` : ""}
            Disponible: ${producto.disponible ? "Sí" : "No"}<br>
        `;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = () => eliminarProducto(producto.id);

        tarjeta.appendChild(btnEliminar);
        contenedor.appendChild(tarjeta);
    });
}

function eliminarProducto(id: number) {
    productos = productos.filter((p) => p.id !== id);
    renderProductos();
}

// Simulando "base de datos"
const db = {
    productos: [
        { id: 1, nombre: "Café", precio: 2.5, categoria: "Bebida", descripcion: "Café negro", disponible: true },
        { id: 2, nombre: "Té", precio: 1.8, categoria: "Bebida", descripcion: "Té verde", disponible: true },
    ],
    clientes: [
        { id: 1, nombre: "Ana" },
        { id: 2, nombre: "Luis" },
    ],
    pedidos: [
        { id: 1, clienteId: 1, productoId: 2 }
    ]
};

// Cargar datos iniciales
productos = db.productos;
renderProductos();