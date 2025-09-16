document.addEventListener("DOMContentLoaded", () => {
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!usuarioActivo) {
        window.location.href = "inicioSesion.html";
        return;
    }

document.getElementById("nombreUsuario").textContent = `${usuarioActivo.nombre} ${usuarioActivo.apellido}`;

document.getElementById("telefono").value = usuarioActivo.telefono || "";
document.getElementById("direccion").value = usuarioActivo.direccion || "";

function mostrarVista(vistaId) {
        document.querySelectorAll("main > div").forEach(div => div.style.display = "none");
        document.getElementById(vistaId).style.display = "block";
    }


document.getElementById("btn-opciones").addEventListener("click", (e) => {
        e.preventDefault();
        mostrarVista("vista-formulario");
    });

    document.getElementById("btn-preguntas").addEventListener("click", (e) => {
        e.preventDefault();
        mostrarVista("vista-faq");
    });

document.getElementById("formActualizar").addEventListener("submit", (e) => {
    e.preventDefault();



    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const validartelefono = /^[0-9]{7,10}$/;

    if(!telefono || !direccion){
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor llena todos los campos antes de continuar."
        });
        return;
    }

    if(!validartelefono.test(telefono)){
        Swal.fire({
            icon: "error",
            title: "Teléfono inválido",
            text: "El teléfono debe contener solo números y tener entre 7 y 10 dígitos."
        });
        return;
    }

    usuarioActivo.telefono = telefono;
    usuarioActivo.direccion = direccion;
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));


    const indice = usuarios.findIndex(u => u.email === usuarioActivo.email);
    if (indice !== -1) {
        usuarios[indice] = usuarioActivo;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Datos actualizados correctamente"
        });
});

mostrarVista("vista-formulario");
});

fetch('/partials/navbar.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
        const script = document.createElement("script");
                    script.src = "/assets/js/navbar.js";
                    document.body.appendChild(script);
        // Llama a actualizarContadorCarrito después de cargar el navbar
        actualizarContadorCarrito();
    });