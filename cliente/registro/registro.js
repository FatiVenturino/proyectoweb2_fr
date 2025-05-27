document.getElementById('registerForm').addEventListener('submit', async function(e) {
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

    try {
        const direccion = ""; // Campo vacío por ahora
        const telefono = ""; // Campo vacío por ahora
        const response = await fetch('http://localhost:4000/api/auth/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password, direccion, telefono })
        });
        const data = await response.json();
        if (response.ok && data.data && data.data.token) {
            // Guardar token y usuario en localStorage
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userId', data.data.usuario.id);
            localStorage.setItem('userName', data.data.usuario.nombre);
            localStorage.setItem('userRol', data.data.usuario.rol);
            // Redirigir al catálogo
            window.location.href = '../catalogo/index.html';
        } else {
            alert(data.message || 'Error al registrar usuario');
        }
    } catch (error) {
        alert('Error al registrar usuario. Intenta nuevamente.');
    }
}); 