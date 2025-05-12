document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Validar que los campos no estén vacíos
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!nombre || !email || !password || !confirmPassword) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    // Redirigir directamente al catálogo
    window.location.href = '../catalogo/index.html';
}); 