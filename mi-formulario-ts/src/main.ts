// main.ts
interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

let productos: Producto[] = [];

const formulario = document.getElementById("formulario") as HTMLFormElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const inputPrecio = document.getElementById("precio") as HTMLInputElement;

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  limpiarErrores();

  const nombre = inputNombre.value.trim();
  const precio = parseFloat(inputPrecio.value);

  let esValido = true;

  if (nombre === "") {
    mostrarError("error-nombre", "El nombre es obligatorio.");
    esValido = false;
  }

  if (isNaN(precio) || precio <= 0) {
    mostrarError("error-precio", "El precio debe ser mayor a 0.");
    esValido = false;
  }

  if (esValido) {
    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre,
      precio,
    };
    productos.push(nuevoProducto);
    renderProductos();
    formulario.reset();
  }
});

function mostrarError(id: string, mensaje: string) {
  const errorDiv = document.getElementById(id);
  if (errorDiv) {
    errorDiv.textContent = mensaje;
  }
}

function limpiarErrores() {
  mostrarError("error-nombre", "");
  mostrarError("error-precio", "");
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
    { id: 1, nombre: "Café", precio: 2.5 },
    { id: 2, nombre: "Té", precio: 1.8 },
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
