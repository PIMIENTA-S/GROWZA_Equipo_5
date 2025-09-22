let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const nombre = document.getElementById("inputnombre");
const apellido = document.getElementById("inputapellido");
const direccion = document.getElementById("inputdireccion");
const email = document.getElementById("inputemail");
const contraseña = document.getElementById("inputcontraseña");
const btnRegistrar = document.getElementById("btn-registrar");
const contendoralerta = document.getElementById("alerta-container");

function mostrarAlerta(mensaje, tipo = "danger") {
    contendoralerta.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show p-2" role="alert">
            ${mensaje}
            <button type="button" class="btn-close p-3" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function registrar(e) {
    e.preventDefault();

    if (!nombre.value.trim() || !apellido.value.trim() || !direccion.value.trim() || !email.value.trim() || !contraseña.value.trim()) {
        mostrarAlerta("Todos los campos son obligatorios", "danger");
        return;
    }

    if (!validarEmail(email.value)) {
        mostrarAlerta("Por favor ingrese un email válido", "warning");
        return;
    }

    if (contraseña.value.length < 8) {
        mostrarAlerta("La contraseña debe tener al menos 8 caracteres", "warning");
        return;
    }

    const existente = usuarios.find(u => u.email === email.value);
    if (existente) {
        mostrarAlerta("Ese correo ya se encuentra registrado", "danger");
        return;
    }


    const usuario = {
        nombre: nombre.value,
        apellido: apellido.value,
        direccion: direccion.value,
        email: email.value,
        password: contraseña.value,
        rol:"usuario"
    };

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarAlerta("Usuario registrado correctamente", "success");


    nombre.value = "";
    apellido.value = "";
    direccion.value = "";
    email.value = "";
    contraseña.value = "";
}

btnRegistrar.addEventListener("click", registrar);




// const API_URL = 'http://localhost:8080/growza/usuarios/crear';

// const registerForm = document.getElementById('register-form');
// const messageElement = document.getElementById('message-info');

// if (!registerForm) {
//     console.error('No se encontró el formulario con id="register-form".');
// } else {
//     registerForm.addEventListener('submit', async function (event) {
//         console.log('El formulario de registro ha sido enviado.');
//         event.preventDefault();

//         const nombre = document.getElementById('inputNombre').value;
//         const apellido = document.getElementById('inputApellido').value;
//         const correo = document.getElementById('inputEmail').value;
//         const password = document.getElementById('inputContra').value;

//         console.log('Datos del usuario a enviar:', { nombre, apellido, correo, password });

//         try {
//             const response = await fetch(API_URL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     nombre,
//                     apellido,
//                     correo,
//                     'contrasena': password
//                 })
//             });

//             console.log('Respuesta del servidor:', response.status, response.statusText);

//             if (response.ok) {
//                 console.log('Respuesta OK. Registro exitoso.');
//                 if (messageElement) {
//                     messageElement.textContent = "¡Registro exitoso! Redirigiendo...";
//                     messageElement.style.color = "green";
//                 }
//                 setTimeout(() => {
//                     window.location.href = 'inicioSesion.html';
//                 }, 2000);
//             } else {
//                 const errorMessage = await response.text();
//                 console.error('Error del servidor:', errorMessage);
//                 if (messageElement) {
//                     messageElement.textContent = `Error en el registro: ${errorMessage}`;
//                     messageElement.style.color = "red";
//                 }
//             }
//         } catch (error) {
//             console.error('Error de conexión:', error);
//             if (messageElement) {
//                 messageElement.textContent = `Ocurrió un error de conexión. Por favor, intenta más tarde.`;
//                 messageElement.style.color = "red";
//             }
//         }
//     });
// }
