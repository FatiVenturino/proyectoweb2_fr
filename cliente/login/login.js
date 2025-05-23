document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    if (!usuario || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    // Lógica para admin
    if (usuario === 'admin' && password === 'admin') {
        window.location.href = '../../admin/catalogo/index.html';
        return;
    }
    // Validar usuario contra el backend
    try {
        const response = await fetch('http://localhost:4000/api/auth/validar-usuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario })
        });
        const data = await response.json();
        if (data.existe) {
            window.location.href = '../catalogo/index.html';
        } else {
            if (confirm('Usuario desconocido. ¿Deseas crear un usuario nuevo?')) {
                window.location.href = '../registro/index.html';
            }
        }
    } catch (error) {
        alert('Error al validar usuario. Intenta nuevamente.');
    }
}); 