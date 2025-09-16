document.addEventListener("DOMContentLoaded", function () {
    // Revisa si los elementos existen antes de usarlos
    const carritoModal = document.getElementById("carritoModal");
    const cartButton = document.getElementById("cartButton");

    if (carritoModal && cartButton) {
        const bootstrapModal = new bootstrap.Modal(carritoModal);

        // Agregar evento de click al botón del carrito
        cartButton.addEventListener("click", function (e) {
            e.preventDefault();
            bootstrapModal.show();
        });

        // Agregar evento de click al botón de cerrar del modal
        const closeButton = carritoModal.querySelector(".btn-close");
        if (closeButton) {
            closeButton.addEventListener("click", function () {
                bootstrapModal.hide();
            });
        }
    } else {
        console.log("El modal de carrito o el botón no se encuentran en el DOM.");
    }

    // Funcionalidad del menú hamburguesa (toggle)
    const toggler = document.querySelector('.navbar-toggler');
    const overlay = document.querySelector('.menu-overlay');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const closeBtn = document.querySelector('.btn-close-menu');

    // Verificar si los elementos del menú existen
    if (toggler && overlay && navbarCollapse && closeBtn) {
        // Mostrar el menú y la superposición al hacer clic
        toggler.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
            overlay.classList.toggle('active');
        });

        // Cerrar el menú al hacer clic fuera (en overlay)
    overlay.addEventListener('click', () => {
        navbarCollapse.classList.remove('show');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

        // Cerrar el menú al hacer clic en el botón de cerrar
        closeBtn.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    } else {
        console.log("Algunos elementos del menú no se encuentran en el DOM.");
    }

//funcion lupa
    if (window.location.pathname.includes("catalogo.html")) {
        const searchItem = document.getElementById("searchItem");
        const searchBox = document.getElementById("searchBox");
        const botonBuscar = document.getElementById("botonBuscar");

        if (searchItem && searchBox && botonBuscar) {
            searchItem.classList.remove("d-none");

            botonBuscar.addEventListener("click", (e) => {
                e.preventDefault();
                searchBox.classList.toggle("d-none");
                const input = searchBox.querySelector("input");
                if (!searchBox.classList.contains("d-none")) {
                    input.focus();
                }
            });
        }
    }
});


