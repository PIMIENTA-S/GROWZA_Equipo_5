// document.addEventListener("DOMContentLoaded", () => {
//     let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
//     const btnIniciar = document.querySelector(".btn-iniciar");
//     const emailInput = document.getElementById("inputEmail");
//     const passInput = document.getElementById("inputContra");
//     const contendoralerta = document.getElementById("alerta-container");
//     const form = document.querySelector("form");

//     const adminExistente = usuarios.find(u => u.email === "admin@growza.com");
//     if (!adminExistente) {
//         usuarios.push({
//             nombre: "Admin",
//             apellido: "Growza",
//             direccion: "N/A",
//             email: "growzageneration@gmail.com",
//             password: "admin123",
//             rol: "admin" 
//         });
//         localStorage.setItem("usuarios", JSON.stringify(usuarios));
//     }

//     function mostrarAlerta(mensaje, tipo) {
//         contendoralerta.innerHTML = `
//             <div class="alert alert-${tipo} alert-dismissible fade show mt-2" role="alert">
//                 ${mensaje}
//                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//             </div>
//         `;
//     }

//     btnIniciar.addEventListener("click", () => {
//         const email = emailInput.value.trim();
//         const password = passInput.value.trim();

//         if (email === "" || password === "") {
//             mostrarAlerta("Por favor, completa todos los campos.", "warning");
//             return;
//         }

//         const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

//         const usuarioValido = usuarios.find(user => user.email === email && user.password === password);

//         if (usuarioValido) {
//             mostrarAlerta("Inicio de sesión exitoso. Espere un momento...", "success");
//             localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));

//             setTimeout(() => {
//                 if (usuarioValido.rol === "admin") {
//                     window.location.href = "/admin/admin.html"; 
//                 } else {
//                     window.location.href = "/index.html"; 
//                 }
//             }, 2000);
//         } else {
//             mostrarAlerta("Nombre de usuario o contraseña inválidos.", "danger");
//         }
//     });
// });

// fetch('../partials/navbar.html')
//     .then(res => res.text())
//     .then(data => {
//         document.getElementById("navbar").innerHTML = data;
//     });

const API_URL = 'http://localhost:8080/growza/usuarios/loginConDTO';
const loginForm = document.getElementById('login-form');

if (!loginForm) {
    console.error('No se encontró el formulario con id="login-form".');
} else {
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const correo = document.getElementById('inputEmail').value.trim();
        const password = document.getElementById('inputContra').value.trim();
        const errorMessage = document.getElementById('error-message');

        // ✅ Lógica para el usuario "admin" hardcodeado
        if (correo === "growzageneration@gmail.com" && password === "admin123") {
            console.log("✅ Inicio de sesión exitoso como Admin.");

            // Guardar rol y token "fake"
            localStorage.setItem("usuarioActivo", JSON.stringify({ rol: "admin" }));
            localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJncm93emFnZW5lcmF0aW9uQGdtYWlsLmNvbSIsImlhdCI6MTc1ODYwNjU5MCwiZXhwIjoxNzU4NjQyNTkwfQ.O2kHnjExjrlFc5iEjoiohZcICLLcIT5dbavztaE7gMs"); // 👈 IMPORTANTE

            // Redirige al panel de administrador
            window.location.href = "/admin/admin.html";
            return;
        }

        // --- Si no es el admin, continuar con la lógica de autenticación del backend ---

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
                console.log("✅ Login exitoso. Token recibido:", token);
                // Redirige a la página de inicio para usuarios regulares
                window.location.href = 'index.html';
            } else {
                const errorText = await response.text();
                errorMessage.textContent = `❌ Error al iniciar sesión: ${errorText}`;
                errorMessage.style.color = "red";
                console.log("⚠️ Respuesta del servidor (error):", errorText);
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            errorMessage.textContent = "Error de conexión con el servidor.";
            errorMessage.style.color = "red";
        }
    });
}