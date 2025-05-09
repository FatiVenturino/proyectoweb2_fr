// Funciones de utilidad compartidas

// Formatear precio
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(precio);
}

// Mostrar mensaje de alerta
function mostrarAlerta(mensaje, tipo = 'success') {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = mensaje;
    
    document.body.insertBefore(alerta, document.body.firstChild);
    
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

// Guardar en localStorage
function guardarEnStorage(clave, valor) {
    try {
        localStorage.setItem(clave, JSON.stringify(valor));
        return true;
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        return false;
    }
}

// Obtener de localStorage
function obtenerDeStorage(clave) {
    try {
        const valor = localStorage.getItem(clave);
        return valor ? JSON.parse(valor) : null;
    } catch (error) {
        console.error('Error al obtener de localStorage:', error);
        return null;
    }
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar teléfono
function validarTelefono(telefono) {
    const regex = /^\+?[\d\s-]{10,}$/;
    return regex.test(telefono);
}

// Formatear fecha
function formatearFecha(fecha) {
    return new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(fecha));
} 