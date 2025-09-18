(function () {
  function initNavbar() {
    console.log("%c[navbar] initNavbar running", "color:teal;font-weight:bold;");
    console.log("href:", window.location.href, "pathname:", window.location.pathname, "readyState:", document.readyState);

    // ==== Carrito: asegúrate que la id coincide con el HTML ====
    const carritoModal = document.getElementById("carritoModal");
    const cartButton = document.getElementById("carritoCompra") || document.getElementById("cartButton");
    console.log("carritoModal:", carritoModal, "cartButton:", cartButton);

    if (carritoModal && cartButton) {
      const bootstrapModal = new bootstrap.Modal(carritoModal);
      cartButton.addEventListener("click", function (e) {
        e.preventDefault();
        bootstrapModal.show();
      });
      const closeButton = carritoModal.querySelector(".btn-close");
      if (closeButton) closeButton.addEventListener("click", () => bootstrapModal.hide());
    } else {
      console.log("[navbar] El modal de carrito o el botón no se encuentran en el DOM.");
    }

    // ==== Menú hamburguesa ====
    const toggler = document.querySelector(".navbar-toggler");
    const overlay = document.querySelector(".menu-overlay");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const closeBtn = document.querySelector(".btn-close-menu");

    if (toggler && overlay && navbarCollapse && closeBtn) {
      toggler.addEventListener("click", () => {
        document.body.classList.toggle("menu-open");
        overlay.classList.toggle("active");
      });

      overlay.addEventListener("click", () => {
        navbarCollapse.classList.remove("show");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
      });

      closeBtn.addEventListener("click", () => {
        navbarCollapse.classList.remove("show");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    } else {
      console.log("[navbar] Algunos elementos del menú no se encuentran en el DOM.");
    }

    // ==== Lupa (buscar) - detección robusta de la página catálogo ====
    const hrefLower = window.location.href.toLowerCase();
    const pathLower = window.location.pathname.toLowerCase();
    const isCatalog =
      pathLower.endsWith("catalogo.html") ||
      hrefLower.includes("/catalogo") ||
      hrefLower.includes("catalogo.html") ||
      hrefLower.includes("catalogo");

    console.log("[navbar] isCatalog?", isCatalog);

    if (isCatalog) {
      const searchItem = document.getElementById("searchItem");
      const searchBox = document.getElementById("searchBox");
      const botonBuscar = document.getElementById("botonBuscar");
      console.log("searchItem, searchBox, botonBuscar:", searchItem, searchBox, botonBuscar);

      if (searchItem && searchBox && botonBuscar) {
        searchItem.classList.remove("d-none");

        // Si está dentro de un collapse, puede estar oculto hasta abrir el menú. 
        // Aquí solo toggleamos el input.
        botonBuscar.addEventListener("click", (e) => {
          e.preventDefault();
          searchBox.classList.toggle("d-none");
          const input = searchBox.querySelector("input");
          if (input && !searchBox.classList.contains("d-none")) input.focus();
        });
      } else {
        console.log("[navbar] Elementos de búsqueda no encontrados. ¿El HTML del navbar ya fue insertado en la página?");
      }
    }

    console.log("%c[navbar] initNavbar finished", "color:teal;");
  }

  // Si DOMContentLoaded ya pasó, ejecuta inmediatamente; si no, espera al evento.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavbar);
  } else {
    initNavbar();
  }

  // Exponer la función para páginas que insertan el navbar dinámicamente
  window.initNavbar = initNavbar;
})();
