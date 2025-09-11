document.addEventListener("DOMContentLoaded", () => {
    const dropdownMenu = document.getElementById("dropdownMenu");

    // Función para actualizar la UI según el estado de la sesión
    function updateDropdownUI() {
        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

        if (usuarioActivo) {
            // Usuario logueado: mostrar 'Cerrar sesión'
            dropdownMenu.innerHTML = `
                <li>
                    <a class="dropdown-item d-flex align-items-center gap-2" href="#" id="logoutLink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--verde-oscuro)"
                            viewBox="0 0 256 256">
                            <path
                                d="M152,24H56A24,24,0,0,0,32,48V208a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V192a12,12,0,0,0-24,0v16a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8v16a12,12,0,0,0,24,0V48A24,24,0,0,0,152,24Zm76.49,90.49L184,88.93a12,12,0,0,0-17,17l20.48,20.57H104a12,12,0,0,0,0,24h83.51L167,150.07a12,12,0,0,0,17,17l44.49-44.48A12,12,0,0,0,228.49,114.49Z">
                            </path>
                        </svg>
                        Cerrar sesión
                    </a>
                </li>
            `;

            // Agregar el evento de click para cerrar sesión
            const logoutLink = document.getElementById("logoutLink");
            if (logoutLink) {
                logoutLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    localStorage.removeItem("usuarioActivo");
                    window.location.href = "/index.html"; // Redirigir a la página de inicio
                });
            }

        } else {
            // Usuario no logueado: mostrar 'Iniciar sesión' y 'Registrarse'
            dropdownMenu.innerHTML = `
                <li>
                    <a class="dropdown-item d-flex align-items-center gap-2" href="/inicioSesion.html">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--verde-oscuro)"
                            viewBox="0 0 256 256">
                            <path
                                d="M144.49,136.49l-40,40a12,12,0,0,1-17-17L107,140H24a12,12,0,0,1,0-24h83L87.51,96.49a12,12,0,0,1,17-17l40,40A12,12,0,0,1,144.49,136.49ZM200,28H136a12,12,0,0,0,0,24h52V204H136a12,12,0,0,0,0,24h64a12,12,0,0,0,12-12V40A12,12,0,0,0,200,28Z">
                            </path>
                        </svg>
                        Iniciar sesión
                    </a>
                </li>
                <li>
                    <a class="dropdown-item d-flex align-items-center gap-2" href="/registro.html">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--verde-oscuro)"
                            viewBox="0 0 256 256">
                            <path
                                d="M256,136a12,12,0,0,1-12,12h-8v8a12,12,0,0,1-24,0v-8h-8a12,12,0,0,1,0-24h8v-8a12,12,0,0,1,24,0v8h8A12,12,0,0,1,256,136Zm-54.81,56.28a12,12,0,1,1-18.38,15.44C169.12,191.42,145,172,108,172c-28.89,0-55.46,12.68-74.81,35.72a12,12,0,0,1-18.38-15.44A124.08,124.08,0,0,1,63.5,156.53a72,72,0,1,1,89,0A124,124,0,0,1,201.19,192.28ZM108,148a48,48,0,1,0-48-48A48.05,48.05,0,0,0,108,148Z">
                            </path>
                        </svg>
                        Registrarse
                    </a>
                </li>
            `;
        }
    }

    // Llamar a la función al cargar la página
    updateDropdownUI();

    // Opcional: Escuchar el evento 'storage' para actualizar la UI si cambia el localStorage en otra pestaña
    window.addEventListener("storage", updateDropdownUI);
});