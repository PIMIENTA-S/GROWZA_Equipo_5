
// const API_URL = 'http://localhost:8080/growza/usuarios/loginConDTO';
const BACK_URL = 'https://ak2m4pjzs9.us-east-1.awsapprunner.com'; 
const API_URL = `${BACK_URL}/growza/usuarios/loginConDTO`
const loginForm = document.getElementById('login-form');

if (!loginForm) {
    console.error('No se encontró el formulario con id="login-form".');
} else {
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const correo = document.getElementById('inputEmail').value.trim();
        const password = document.getElementById('inputContra').value.trim();
        const errorMessage = document.getElementById('error-message');

        //  "admin" hardcodeado
        if (correo === "growzageneration@gmail.com" && password === "admin123") {
            console.log("Inicio de sesión exitoso como Admin.");

            // Guardar rol y poner el token (lo sacamos desde postman)
            localStorage.setItem("usuarioActivo", JSON.stringify({ rol: "admin" }));
            localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJncm93emFnZW5lcmF0aW9uQGdtYWlsLmNvbSIsImlhdCI6MTc1ODYyNjgxOSwiZXhwIjoxNzU4NjYyODE5fQ.CmpzZtvmBoojyz5YkMmAe_ZupIuA9XTRQ4Z20B3uMYc"); 

            window.location.href = "/admin/admin.html";
            return;
        }

        //  Si no es el admin, continuar con la lógica de autenticación 

        if (!correo || !password) {
            errorMessage.textContent = "Por favor, completa todos los campos.";
            errorMessage.style.color = "red";
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo,
                    contrasena: password
                })
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem('jwt', token);
                console.log("Login exitoso. Token recibido:", token);
                // Redirige a la página de inicio para usuarios regulares
                window.location.href = 'index.html';
            } else {
                const errorText = await response.text();
                errorMessage.textContent = `Error al iniciar sesión: ${errorText}`;
                errorMessage.style.color = "red";
                console.log("Respuesta del servidor (error):", errorText);
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            errorMessage.textContent = "Error de conexión con el servidor.";
            errorMessage.style.color = "red";
        }
    });
}