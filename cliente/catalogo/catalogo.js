// Configuración de la API
const API_URL = 'http://localhost:4000/api';

// Elementos del DOM
const productosGrid = document.getElementById('productos-grid');
const busquedaInput = document.getElementById('busqueda');
const ordenarSelect = document.getElementById('ordenar');
const categoriaSelect = document.getElementById('categoria');
const noProductos = document.getElementById('no-productos');

// Cargar productos desde la API
async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error al cargar productos:', error);
        return [];
    }
}

// Cargar categorías desde la API
async function cargarCategorias() {
    try {
        const response = await fetch(`${API_URL}/productos/categorias`);
        const categorias = await response.json();
        
        // Limpiar opciones existentes excepto "Todas las categorías"
        while (categoriaSelect.options.length > 1) {
            categoriaSelect.remove(1);
        }
        
        // Agregar nuevas categorías
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
            categoriaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

// Crear tarjeta de producto
function crearProductoCard(producto) {
    const card = document.createElement('div');
    card.className = 'producto-card';
    
    card.innerHTML = `
        <div class="producto-imagen">
            <img src="http://localhost:4000${producto.imagen}" alt="${producto.nombre}">
            ${producto.stock <= 5 && producto.stock > 0 ? 
                '<span class="stock-bajo">¡Últimas unidades!</span>' : ''}
        </div>
        <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${Number(producto.precio).toFixed(2)}</p>
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
        window.location.href = `http://localhost:4000/cliente/detalle.html?id=${producto.id}`;
    });

    const btnAgregarCarrito = card.querySelector('.btn-agregar-carrito');
    if (btnAgregarCarrito) {
        btnAgregarCarrito.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });
    }
    
    return card;
}

// Agregar producto al carrito
async function agregarAlCarrito(producto) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '../login/index.html';
            return;
        }

        const response = await fetch(`${API_URL}/carrito/agregar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                productoId: producto.id,
                cantidad: 1
            })
        });

        if (response.ok) {
            alert('Producto agregado al carrito');
        } else {
            throw new Error('Error al agregar al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar al carrito');
    }
}

// Filtrar y ordenar productos
async function actualizarProductos() {
    const busqueda = busquedaInput.value.toLowerCase();
    const categoria = categoriaSelect.value;
    const ordenar = ordenarSelect.value;
    
    try {
        let url = `${API_URL}/productos`;
        if (categoria !== 'todas') {
            url = `${API_URL}/productos/categoria/${categoria}`;
        }
        
        const response = await fetch(url);
        let productos = await response.json();
        
        // Filtrar por búsqueda
        productos = productos.filter(p => 
            p.nombre.toLowerCase().includes(busqueda)
        );
        
        // Ordenar productos
        productos.sort((a, b) => {
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
        noProductos.style.display = productos.length === 0 ? 'block' : 'none';
        
        // Limpiar y actualizar grid
        productosGrid.innerHTML = '';
        productos.forEach(producto => {
            productosGrid.appendChild(crearProductoCard(producto));
        });
    } catch (error) {
        console.error('Error al actualizar productos:', error);
        noProductos.style.display = 'block';
        noProductos.textContent = 'Error al cargar los productos';
    }
}

// Event listeners
busquedaInput.addEventListener('input', actualizarProductos);
ordenarSelect.addEventListener('change', actualizarProductos);
categoriaSelect.addEventListener('change', actualizarProductos);

// Inicializar
async function inicializar() {
    await cargarCategorias();
    await actualizarProductos();
}

inicializar(); 