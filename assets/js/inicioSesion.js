document.addEventListener("DOMContentLoaded", () => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const btnIniciar = document.querySelector(".btn-iniciar");
    const emailInput = document.getElementById("inputEmail");
    const passInput = document.getElementById("inputContra");
    const contendoralerta = document.getElementById("alerta-container");
    const form = document.querySelector("form");

    const adminExistente = usuarios.find(u => u.email === "admin@growza.com");
    if (!adminExistente) {
        usuarios.push({
            nombre: "Admin",
            apellido: "Growza",
            direccion: "N/A",
            email: "growzageneration@gmail.com",
            password: "admin123",
            rol: "admin" 
        });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    function mostrarAlerta(mensaje, tipo) {
        contendoralerta.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show mt-2" role="alert">
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    btnIniciar.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const password = passInput.value.trim();

        if (email === "" || password === "") {
            mostrarAlerta("Por favor, completa todos los campos.", "warning");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioValido = usuarios.find(user => user.email === email && user.password === password);

        if (usuarioValido) {
            mostrarAlerta("Inicio de sesión exitoso. Espere un momento...", "success");
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));

            setTimeout(() => {
                if (usuarioValido.rol === "admin") {
                    window.location.href = "/admin/admin.html"; 
                } else {
                    window.location.href = "/index.html"; 
                }
            }, 2000);
        } else {
            mostrarAlerta("Nombre de usuario o contraseña inválidos.", "danger");
        }
    });
});

fetch('../partials/navbar.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });
