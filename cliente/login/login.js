document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Validar que los campos no estén vacíos
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    if (!usuario || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    // Redirigir directamente al catálogo
    window.location.href = 'cliente/catalogo/index.html';
}); 