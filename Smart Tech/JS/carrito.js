let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
    mostrarProductos();
});

function mostrarProductos() {
    const listaProductosDiv = document.getElementById('lista-productos');
    listaProductosDiv.innerHTML = '';

    productos.forEach(producto => {
        const productoHTML = `
            <div class="product-card">
                <img src="${producto.url_imagen}" alt="${producto.nombre}">
                <div class="card-body">
                    <h5>${producto.nombre}</h5>
                    <p>${producto.descripcion}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                    <button class="btn" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.url_imagen}', ${producto.stock})">Agregar al Carrito</button>
                    <button class="btn btn-primary mt-2" onclick="verDetalleProducto(${producto.id})">Detalles</button> <!-- Botón para ver detalles -->
           
               </div>
            </div>
        `;
        listaProductosDiv.innerHTML += productoHTML;
    });
}

function agregarAlCarrito(nombre, precio, imagen, stock) {
    const existingProduct = carrito.find(item => item.nombre === nombre);

    if (existingProduct) {
        if (existingProduct.cantidad < stock) {
            existingProduct.cantidad += 1;
            mostrarMensaje(`${nombre} se ha agregado al carrito.`, "success");
        } else {
            mostrarMensaje(`No hay suficiente stock de ${nombre}.`, "error");
        }
    } else {
        carrito.push({ nombre: nombre, precio: precio, imagen: imagen, cantidad: 1 });
        mostrarMensaje(`${nombre} se ha agregado al carrito.`, "success");
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    // Total de productos sumando cantidades
    const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    document.getElementById('carrito-count').innerText = totalProductos;

    const productosCarrito = document.getElementById('productos-carrito');
    productosCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        productosCarrito.innerHTML += `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <p>${producto.nombre}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: 
                        <button onclick="actualizarCantidad('${producto.nombre}', -1)">-</button>
                        <span>${producto.cantidad}</span>
                        <button onclick="actualizarCantidad('${producto.nombre}', 1)">+</button>
                    </p>
                    <p>Subtotal: $${subtotal}</p>
                </div>
            </div>`;
        total += subtotal;
    });

    document.getElementById('total-carrito').innerText = total;
}

function actualizarCantidad(nombre, cambio) {
    const producto = carrito.find(item => item.nombre === nombre);
    const stockProducto = productos.find(p => p.nombre === nombre).stock;

    if (producto) {
        if (producto.cantidad + cambio > stockProducto) {
            mostrarMensaje(`No hay suficiente stock de ${producto.nombre}.`, "error");
        } else {
            producto.cantidad += cambio;
            if (producto.cantidad <= 0) {
                carrito = carrito.filter(item => item.nombre !== nombre);
                mostrarMensaje(`${producto.nombre} ha sido eliminado del carrito.`, "info");
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        }
    }
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito();
    mostrarMensaje('El carrito ha sido vaciado.', "info");
}

// Mostrar y ocultar el carrito deslizante
document.getElementById('ver-carrito').addEventListener('click', function() {
    const carritoSlider = document.getElementById('carrito-slider');
    carritoSlider.classList.toggle('active');
});

// Cerrar el carrito deslizante
function cerrarCarrito() {
    document.getElementById('carrito-slider').classList.remove('active');
}

// Función para mostrar mensajes dinámicos
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById('mensaje-dinamico');
    mensajeDiv.innerText = mensaje;
    mensajeDiv.className = `mensaje-dinamico ${tipo}`;
    mensajeDiv.style.display = 'block';

    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}
