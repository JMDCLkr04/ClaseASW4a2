var productos = [];
var formulario = document.getElementById('formulario');
var nombreInput = document.getElementById('nombre');
var precioInput = document.getElementById('precio');
var categoriaInput = document.getElementById('categoria');
var descripcionInput = document.getElementById('descripcion');
var disponibleInput = document.getElementById('disponible');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    limpiarErrores();
    var nombre = nombreInput.value.trim();
    var precio = parseFloat(precioInput.value);
    var esValido = true;
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
        var nuevoProducto = {
            id: Date.now(),
            nombre: nombre,
            precio: precio,
            categoria: categoriaInput.value,
            descripcion: descripcionInput.value || undefined,
            disponible: disponibleInput.checked
        };
        productos.push(nuevoProducto);
        renderProductos();
        formulario.reset();
    }
});
function mostrarError(input, mensaje) {
    var parent = input.parentElement;
    if (!parent)
        return;
    var prevError = parent.querySelector('.error');
    if (prevError)
        prevError.remove();
    if (mensaje) {
        var error = document.createElement('span');
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
    var contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";
    productos.forEach(function (producto) {
        var tarjeta = document.createElement("div");
        tarjeta.style.border = "1px solid #ccc";
        tarjeta.style.padding = "10px";
        tarjeta.style.margin = "10px 0";
        tarjeta.innerHTML = "\n            <strong>".concat(producto.nombre, "</strong><br>\n            Precio: $").concat(producto.precio.toFixed(2), "<br>\n            Categor\u00EDa: ").concat(producto.categoria, "<br>\n            ").concat(producto.descripcion ? "Descripci\u00F3n: ".concat(producto.descripcion, "<br>") : "", "\n            Disponible: ").concat(producto.disponible ? "Sí" : "No", "<br>\n        ");
        var btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = function () { return eliminarProducto(producto.id); };
        tarjeta.appendChild(btnEliminar);
        contenedor.appendChild(tarjeta);
    });
}
function eliminarProducto(id) {
    productos = productos.filter(function (p) { return p.id !== id; });
    renderProductos();
}
// Simulando "base de datos"
var db = {
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
