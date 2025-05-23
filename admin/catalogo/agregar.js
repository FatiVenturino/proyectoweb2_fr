document.getElementById('form-agregar-producto').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const producto = {
        nombre: form.nombre.value,
        precio: form.precio.value,
        descripcion: form.descripcion.value,
        imagen: form.imagen.value,
        categoria: form.categoria.value
    };
    try {
        const response = await fetch('http://localhost:4000/api/admin/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (response.ok) {
            alert('Producto agregado correctamente');
            window.location.href = 'index.html';
        } else {
            alert('Error al agregar producto');
        }
    } catch (error) {
        alert('Error de conexión al agregar producto');
    }
}); 