// Lista de productos
const productos = [
    {
        id: 1,
        nombre: "Celular Modelo A",
        descripcion: "Este celular cuenta con características de última tecnología, un excelente rendimiento y una cámara de alta calidad.",
        marca: "Marca A",
        precio: 299,
        stock: 50,
        categoria: "Celular",
        url_imagen: "https://http2.mlstatic.com/D_NQ_NP_828557-MLA75148190826_032024-O.webp"
    },
    {
        id: 2,
        nombre: "Celular Modelo B",
        descripcion: "Un teléfono con una pantalla impresionante y una duración de batería excepcional.",
        marca: "Marca B",
        precio: 399,
        stock: 30,
        categoria: "Celular",
        url_imagen: "https://acdn.mitiendanube.com/stores/105/049/products/combos-23-fd9fb1e217e72554be17044844111868-1024-1024.jpg"
    },
    {
        id: 3,
        nombre: "Funda Protectora",
        descripcion: "Funda de alta resistencia para proteger tu celular de caídas.",
        marca: "Marca C",
        precio: 19.99,
        stock: 100,
        categoria: "Accesorio",
        url_imagen: "https://acdn.mitiendanube.com/stores/001/474/949/products/productos-2021-04-17t002509-5411-a4af48b1df44ef73c716186300946688-640-0.png"
    },
    {
        id: 4,
        nombre: "Auriculares Inalámbricos",
        descripcion: "Auriculares Bluetooth con calidad de sonido superior.",
        marca: "Marca D",
        precio: 49.99,
        stock: 75,
        categoria: "Accesorio",
        url_imagen: "https://via.placeholder.com/500"
    }
];

function cargarProductos(categoria = null) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';  // Limpiar los productos existentes

    // Filtrar los productos según la categoría seleccionada
    const productosFiltrados = categoria 
        ? productos.filter(producto => {
            console.log(`Producto: ${producto.nombre}, Categoría: ${producto.categoria}`);  // Depuración
            return producto.categoria.toLowerCase() === categoria.toLowerCase();
        }) 
        : productos;

    if (productosFiltrados.length === 0) {
        listaProductos.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';  // Asegúrate de que este estilo esté definido en tu CSS
        card.innerHTML = `
            <img src="${producto.url_imagen}" alt="${producto.nombre}" style="width: 100%;">
            <div class="card-body">
                <h5>${producto.nombre}</h5>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <button class="btn" onclick="verDetalleProducto(${producto.id})">Detalles</button>
            </div>
        `;
        listaProductos.appendChild(card);
    });
}

// Cargar productos de la categoría 'Celular' al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos('Celular');  // Especificar la categoría
});

function cargarAccesorios() {
    const listaAccesorios = document.getElementById('lista-accesorios');
    listaAccesorios.innerHTML = '';  // Limpiar los productos existentes

    // Filtrar los productos según la categoría 'Accesorio'
    const accesoriosFiltrados = productos.filter(producto => {
        console.log(`Producto: ${producto.nombre}, Categoría: ${producto.categoria}`);  // Depuración
        return producto.categoria.toLowerCase() === 'accesorio';
    });

    if (accesoriosFiltrados.length === 0) {
        listaAccesorios.innerHTML = '<p>No hay accesorios disponibles.</p>';
        return;
    }

    accesoriosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';  // Asegúrate de que este estilo esté definido en tu CSS
        card.innerHTML = `
            <img src="${producto.url_imagen}" alt="${producto.nombre}" style="width: 100%;">
            <div class="card-body">
                <h5>${producto.nombre}</h5>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <button class="btn" onclick="verDetalleProducto(${producto.id})">Detalles</button>
            </div>
        `;
        listaAccesorios.appendChild(card);
    });
}

// Cargar accesorios al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarAccesorios();
});

function verDetalleProducto(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        localStorage.setItem('productoSeleccionado', JSON.stringify(producto));  // Guardar producto en localStorage
        window.location.href = 'Pages/producto.html';  // Redirigir a la página de detalles
    }
}

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();  // Cargar los productos al iniciar
});
