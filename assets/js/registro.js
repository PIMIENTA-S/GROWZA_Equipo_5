document.addEventListener('DOMContentLoaded', () => {

    const passwordInput = document.getElementById("inputContra");
    const requisitos = document.getElementById("password-requirements");
    const registerForm = document.getElementById('register-form');
    const messageElement = document.getElementById('message-info');

    // Mapeo de requisitos de contraseña a sus elementos HTML
    const requirements = {
        length: document.getElementById("req-length"),
        uppercase: document.getElementById("req-uppercase"),
        lowercase: document.getElementById("req-lowercase"),
        number: document.getElementById("req-number"),
        special: document.getElementById("req-special"),
    };

    // Eventos para mostrar/ocultar y validar requisitos de contraseña
    if (passwordInput && requisitos) {
        passwordInput.addEventListener("focus", () => {
            requisitos.style.display = "block";
        });

        passwordInput.addEventListener("blur", () => {
            if (passwordInput.value === "") {
                requisitos.style.display = "none";
            }
        });

        passwordInput.addEventListener("input", () => {
            const value = passwordInput.value;
            let validCount = 0;

            const checks = [
                { id: "length", regex: /.{8,}/, text: "Al menos 8 caracteres" },
                { id: "uppercase", regex: /[A-Z]/, text: "Una letra mayúscula" },
                { id: "lowercase", regex: /[a-z]/, text: "Una letra minúscula" },
                { id: "number", regex: /[0-9]/, text: "Un número" },
                { id: "special", regex: /[^A-Za-z0-9]/.test(value), text: "Un carácter especial (!@#$%^&*)" }
            ];

            // Revisa cada requisito y actualiza el estado visual
            checks.forEach(check => {
                const el = requirements[check.id];
                const isValid = (check.id === "special") ? check.regex : check.regex.test(value);
                
                if (isValid) {
                    el.textContent = `✅ ${check.text}`;
                    el.classList.add("valid");
                    el.classList.remove("invalid");
                    validCount++;
                } else {
                    el.textContent = `❌ ${check.text}`;
                    el.classList.add("invalid");
                    el.classList.remove("valid");
                }
            });

            // Actualiza el borde del input de la contraseña
            if (validCount === checks.length) {
                passwordInput.classList.add("is-valid");
                passwordInput.classList.remove("is-invalid");
            } else {
                passwordInput.classList.add("is-invalid");
                passwordInput.classList.remove("is-valid");
            }
        });
    }

    // Lógica para enviar el formulario a la API
    const API_URL = 'http://localhost:8080/growza/usuarios/crear';

    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            console.log('El formulario de registro ha sido enviado.');
            event.preventDefault();

            const nombre = document.getElementById('inputNombre').value;
            const apellido = document.getElementById('inputApellido').value;
            const correo = document.getElementById('inputEmail').value;
            const password = document.getElementById('inputContra').value;

            // Valida que todos los campos estén llenos
            if (!nombre || !apellido || !correo || !password) {
                messageElement.textContent = "Todos los campos son obligatorios.";
                messageElement.style.color = "red";
                return;
            }

            // Valida la contraseña según los requisitos
            const passwordIsValid = (
                password.length >= 8 &&
                /[A-Z]/.test(password) &&
                /[a-z]/.test(password) &&
                /[0-9]/.test(password) &&
                /[^A-Za-z0-9]/.test(password)
            );

            if (!passwordIsValid) {
                messageElement.textContent = "La contraseña no cumple con todos los requisitos.";
                messageElement.style.color = "red";
                return;
            }

            console.log('Datos del usuario a enviar:', { nombre, apellido, correo, password });

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre,
                        apellido,
                        correo,
                        'contrasena': password // ✅ ¡CORREGIDO! Envía 'password'
                    })
                });

                console.log('Respuesta del servidor:', response.status, response.statusText);

                if (response.ok) {
                    // Si la respuesta es 200-299, fue exitosa
                    console.log('Respuesta OK. Registro exitoso.');
                    if (messageElement) {
                        messageElement.textContent = "¡Registro exitoso! Redirigiendo...";
                        messageElement.style.color = "green";
                    }
                    setTimeout(() => {
                        window.location.href = 'inicioSesion.html';
                    }, 2000);
                } else {
                    // Manejo de errores para cualquier estado que no sea 'ok'
                    let errorData;
                    // Clona la respuesta para poder leer el cuerpo dos veces si es necesario
                    const clonedResponse = response.clone();
                    try {
                        errorData = await response.json();
                        if (messageElement) {
                            messageElement.textContent = `Error en el registro: ${errorData.message || 'Error desconocido.'}`;
                            messageElement.style.color = "red";
                        }
                    } catch (e) {
                        // Si falla el JSON, lee el cuerpo como texto
                        errorData = await clonedResponse.text();
                        if (messageElement) {
                            messageElement.textContent = `Error en el registro: ${errorData || 'Error desconocido del servidor.'}`;
                            messageElement.style.color = "red";
                        }
                    }
                    console.error('Error del servidor:', errorData);
                }

            } catch (error) {
                console.error('Error de conexión:', error);
                if (messageElement) {
                    messageElement.textContent = `Ocurrió un error de conexión. Por favor, intenta más tarde.`;
                    messageElement.style.color = "red";
                }
            }
        });
    }
});