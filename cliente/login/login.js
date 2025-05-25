document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    // Lógica para admin
    if (email === 'admin' && password === 'admin') {
        window.location.href = '../../admin/catalogo/index.html';
        return;
    }
    // Login real contra el backend
    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok && data.data && data.data.token) {
            // Guardar token y usuario en localStorage
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userId', data.data.usuario.id);
            localStorage.setItem('userName', data.data.usuario.nombre);
            // Redirigir al catálogo
            window.location.href = '../catalogo/index.html';
        } else {
            alert(data.message || 'Email o contraseña incorrectos');
        }
    } catch (error) {
        alert('Error al iniciar sesión. Intenta nuevamente.');
    }
}); 