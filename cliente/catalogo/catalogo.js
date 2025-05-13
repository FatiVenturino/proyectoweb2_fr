// Datos de ejemplo (en un caso real, estos vendrían de una API)
const productos = [
    {
        id: 1,
        nombre: 'Producto 1',
        categoria: 'Electrónicos',
        precio: 99.99,
        descripcion: 'Descripción del producto 1',
        imagen: 'https://via.placeholder.com/300x200',
        stock: 10
    },
    {
        id: 2,
        nombre: 'Producto 2',
        categoria: 'Ropa',
        precio: 49.99,
        descripcion: 'Descripción del producto 2',
        imagen: 'https://via.placeholder.com/300x200',
        stock: 3
    },
    {
        id: 3,
        nombre: 'Producto 3',
        categoria: 'Hogar',
        precio: 149.99,
        descripcion: 'Descripción del producto 3',
        imagen: 'https://via.placeholder.com/300x200',
        stock: 0
    }
];

// Elementos del DOM
const productosGrid = document.getElementById('productos-grid');
const busquedaInput = document.getElementById('busqueda');
const ordenarSelect = document.getElementById('ordenar');
const categoriaSelect = document.getElementById('categoria');
const noProductos = document.getElementById('no-productos');

// Cargar categorías únicas en el select
function cargarCategorias() {
    const categorias = [...new Set(productos.map(p => p.categoria))];
    categorias
        .filter(categoria => !['Hogar', 'Ropa', 'Electrónicos', 'Electronica', 'Electrónica'].includes(categoria))
        .forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            categoriaSelect.appendChild(option);
        });
}

// Crear tarjeta de producto
function crearProductoCard(producto) {
    const card = document.createElement('div');
    card.className = 'producto-card';
    
    card.innerHTML = `
        <div class="producto-imagen">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            ${producto.stock <= 5 && producto.stock > 0 ? 
                '<span class="stock-bajo">¡Últimas unidades!</span>' : ''}
            ${producto.stock === 0 ? 
                '<span class="sin-stock">Agotado</span>' : ''}
        </div>
        <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio.toFixed(2)}</p>
            <p class="descripcion">${producto.descripcion}</p>
            <div class="producto-acciones">
                <button class="btn btn-primary btn-ver-detalles">Ver detalles</button>
                ${producto.stock > 0 ? 
                    '<button class="btn btn-success btn-agregar-carrito">Agregar al carrito</button>' : ''}
            </div>
        </div>
    `;
    
    // Agregar event listeners a los botones
    const btnVerDetalles = card.querySelector('.btn-ver-detalles');
    btnVerDetalles.addEventListener('click', () => {
        // TODO: Implementar vista de detalles
        console.log('Ver detalles:', producto.id);
    });

    const btnAgregarCarrito = card.querySelector('.btn-agregar-carrito');
    if (btnAgregarCarrito) {
        btnAgregarCarrito.addEventListener('click', () => {
            // TODO: Implementar agregar al carrito
            console.log('Agregar al carrito:', producto.id);
        });
    }
    
    return card;
}

// Filtrar y ordenar productos
function actualizarProductos() {
    const busqueda = busquedaInput.value.toLowerCase();
    const categoria = categoriaSelect.value;
    const ordenar = ordenarSelect.value;
    
    let productosFiltrados = productos.filter(p => {
        const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda);
        const coincideCategoria = categoria === 'todas' || p.categoria === categoria;
        return coincideBusqueda && coincideCategoria;
    });
    
    // Ordenar productos
    productosFiltrados.sort((a, b) => {
        switch (ordenar) {
            case 'precio-asc':
                return a.precio - b.precio;
            case 'precio-desc':
                return b.precio - a.precio;
            case 'nombre':
                return a.nombre.localeCompare(b.nombre);
            default:
                return 0;
        }
    });
    
    // Mostrar u ocultar mensaje de no productos
    noProductos.style.display = productosFiltrados.length === 0 ? 'block' : 'none';
    
    // Limpiar y actualizar grid
    productosGrid.innerHTML = '';
    productosFiltrados.forEach(producto => {
        productosGrid.appendChild(crearProductoCard(producto));
    });
}

// Event listeners
busquedaInput.addEventListener('input', actualizarProductos);
ordenarSelect.addEventListener('change', actualizarProductos);
categoriaSelect.addEventListener('change', actualizarProductos);

// Inicializar
cargarCategorias();
actualizarProductos(); 