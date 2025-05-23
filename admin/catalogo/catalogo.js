// Script base para mostrar productos en el catálogo admin
// Aquí se implementará la lógica de gestión de productos (agregar, editar, eliminar)

// Mostrar productos reales en la tabla de admin

document.addEventListener('DOMContentLoaded', async function() {
    const tablaBody = document.getElementById('tabla-productos-body');
    async function cargarProductos() {
        tablaBody.innerHTML = '';
        try {
            const response = await fetch('http://localhost:4000/api/productos');
            const productos = await response.json();
            productos.forEach(producto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="http://localhost:4000${producto.imagen}" alt="${producto.nombre}"></td>
                    <td>${producto.nombre}</td>
                    <td>$${Number(producto.precio).toFixed(2)}</td>
                    <td>${producto.categoria}</td>
                    <td>
                        <button class="btn-editar" data-id="${producto.id}">Editar</button>
                        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
                    </td>
                `;
                tablaBody.appendChild(tr);
            });
        } catch (error) {
            tablaBody.innerHTML = '<tr><td colspan="5">Error al cargar productos</td></tr>';
        }
    }

    tablaBody.addEventListener('click', async function(e) {
        if (e.target.classList.contains('btn-eliminar')) {
            const id = e.target.getAttribute('data-id');
            if (confirm('¿Seguro que deseas eliminar este producto?')) {
                try {
                    const response = await fetch(`http://localhost:4000/api/admin/productos/${id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        alert('Producto eliminado');
                        cargarProductos();
                    } else {
                        alert('Error al eliminar producto');
                    }
                } catch (error) {
                    alert('Error de conexión al eliminar producto');
                }
            }
        }
    });

    cargarProductos();
}); 