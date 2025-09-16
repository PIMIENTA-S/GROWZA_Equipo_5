document.addEventListener("DOMContentLoaded", function () {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (!dropdownMenu) return;

    dropdownMenu.innerHTML = ""; // limpia opciones anteriores

    if (usuarioActivo) {
        // Usuario logueado → mostrar acceso al panel y logout
        dropdownMenu.innerHTML = `
            <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="/vistaUsuario.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--verde-oscuro)" viewBox="0 0 256 256">
                        <path d="M128,128a44,44,0,1,0-44-44A44,44,0,0,0,128,128Zm0,24c-36.48,0-68.7,20.53-85.26,51.05a12,12,0,0,0,20.77,11.9C77.06,192.74,101.62,180,128,180s50.94,12.74,64.49,34.95a12,12,0,0,0,20.77-11.9C196.7,172.53,164.48,152,128,152Z"></path>
                    </svg>
                    Panel de Usuario
                </a>
            </li>
            <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="#" id="cerrarSesionNavbar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--verde-oscuro)" viewBox="0 0 256 256">
                        <path d="M144.49,136.49l-40,40a12,12,0,0,1-17-17L107,140H24a12,12,0,0,1,0-24h83L87.51,96.49a12,12,0,0,1,17-17l40,40A12,12,0,0,1,144.49,136.49ZM200,28H136a12,12,0,0,0,0,24h52V204H136a12,12,0,0,0,0,24h64a12,12,0,0,0,12-12V40A12,12,0,0,0,200,28Z"></path>
                    </svg>
                    Cerrar sesión
                </a>
            </li>
        `;

        // Evento cerrar sesión
        document.getElementById("cerrarSesion").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioActivo");
            window.location.href = "/index.html"; // redirigir al inicio
        });

    } else {
        // Usuario NO logueado → mostrar login/registro
        dropdownMenu.innerHTML = `
            <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="/inicioSesion.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="var(--verde-oscuro)" viewBox="0 0 256 256">
                        <path d="M144.49,136.49l-40,40a12,12..."></path>
                    </svg>
                    Iniciar sesión
                </a>
            </li>
            <li>
                <a class="dropdown-item d-flex align-items-center gap-2" href="/registro.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="var(--verde-oscuro)" viewBox="0 0 256 256">
                        <path d="M256,136a12,12,0,0,1-12,12h-8..."></path>
                    </svg>
                    Registrarse
                </a>
            </li>
        `;
    }
});
