// ===================================
// 🌿 favoritos.js - Lógica de Favoritos
// ===================================

// Carga la barra de navegación y actualiza el contador de favoritos
fetch("../partials/navbar.html")
    .then(r => r.text())
    .then(html => {
        document.getElementById("navbar").innerHTML = html;
        actualizarContadorFavoritos();
    });

// Carga el modal del carrito de compras
fetch("../modals/carroCompras.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("modalContainer").innerHTML = data;
    });

// Carga el estado inicial de favoritos y carrito desde el almacenamiento local
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencia a la sección donde se mostrarán los favoritos
const favoritosSection = document.getElementById("favoritos");

// ---

// Muestra los productos favoritos en la página
function mostrarFavoritos() {
    if (!favoritosSection) return; // Se detiene si la sección no existe
    favoritosSection.innerHTML = ""; // Limpia el contenido anterior

    // Si no hay favoritos, muestra un mensaje amigable
    if (!Array.isArray(favoritos) || favoritos.length === 0) {
        favoritosSection.innerHTML = `<div class="col-12"><p class="no-favoritos">No tienes productos en favoritos</p></div>`;
        return;
    }

    // Crea una tarjeta por cada producto favorito
    favoritos.forEach(prod => {
        const titulo = prod.nombre || prod.titulo || "Sin nombre";
        const precio = (prod.precio || prod.precio === 0) ? Number(prod.precio) : 0;
        const imagen = prod.imagen || "/assets/img/no-image.png";

        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-3", "mt-3", "mb-3", "text-center");

        col.innerHTML = `
            <div class="card" style="width: 16rem; height: 360px;">
                <img src="${imagen}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${titulo}">
                <div class="card-body">
                    <h5 class="card-title"><strong>${titulo}</strong></h5>
                    <p class="precio">$${precio.toLocaleString('es-CO', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</p>
                    <div class="acciones">
                        <button class="cart-icon add-to-cart" 
                                title="Agregar al carrito"
                                data-titulo="${titulo}" 
                                data-precio="${precio}" 
                                data-img="${imagen}">
                                <svg class="nav-icons" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                        fill="#394d1f" viewBox="0 0 256 256">
                                        <path
                                            d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm36.84-.8-5.6,56A8,8,0,0,0,174.4,184a7.32,7.32,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.32,7.32,0,0,0,.81,0,8,8,0,0,0,7.16-8.76ZM239.93,89.06,224.86,202.12A16.06,16.06,0,0,1,209,216H47a16.06,16.06,0,0,1-15.86-13.88L16.07,89.06A8,8,0,0,1,24,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H232a8,8,0,0,1,7.93,9.06ZM89.63,80h76.74L128,36.15ZM222.86,96H33.14L47,200H209Z">
                                        </path>
                                    </svg>
                        </button>
                        <button class="btn-fav-remove btn-remove-fav" 
                                title="Eliminar de favoritos"
                                data-nombre="${titulo}">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
        favoritosSection.appendChild(col);
    });
}

// ---

// Añade un producto al carrito cuando se hace clic en el botón de agregar
document.addEventListener("click", function (e) {
    if (e.target.closest(".add-to-cart")) {
        e.preventDefault();
        // Verifica si el usuario está logueado antes de agregar productos
        const usuarioActivo = localStorage.getItem("usuarioActivo");
        if (!usuarioActivo) {
            Swal.fire({
                title: "¡Hola!",
                text: "Debes iniciar sesión para agregar productos al carrito.",
                icon: "warning",
                confirmButtonColor: "#9AC76E",
                confirmButtonText: "Iniciar Sesión"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "inicioSesion.html";
                }
            });
            return;
        }

        // Obtiene los datos del producto y lo agrega al carrito
        const btn = e.target.closest(".add-to-cart");
        const producto = {
            titulo: btn.dataset.titulo,
            precio: parseFloat(btn.dataset.precio),
            imagen: btn.dataset.img,
            cantidad: 1
        };

        const productoExistente = carrito.find(item => item.titulo === producto.titulo);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push(producto);
        }

        // Guarda el carrito y actualiza la UI
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Swal.fire({
            title: "Agregado!",
            icon: "success",
            draggable: true,
            confirmButtonColor: "#9AC76E"
        });
        actualizarContadorCarrito();
    }
});

// ---

// Elimina un producto de favoritos al hacer clic en el botón "Eliminar"
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-remove-fav");
    if (!btn) return;

    const key = (btn.dataset.nombre || btn.dataset.titulo || "").trim();
    if (!key) return;

    // Pide confirmación antes de eliminar
    Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Quieres eliminar ${key} de tus favoritos?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D08159",
        cancelButtonColor: "#9AC76E",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Elimina el producto y actualiza el almacenamiento
            favoritos = favoritos.filter(item => {
                const itemKey = (item.nombre || item.titulo || "").trim();
                return itemKey !== key;
            });
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            mostrarFavoritos();
            actualizarContadorFavoritos();

            Swal.fire({
                title: "¡Eliminado!",
                text: "El producto ha sido eliminado de favoritos.",
                icon: "success",
                confirmButtonColor: "#9AC76E"
            });
        }
    });
});

// ---

// Maneja la funcionalidad del botón "Vaciar todos"
const btnVaciar = document.getElementById("vaciar-favoritos");
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        if (favoritos.length === 0) {
            Swal.fire({
                title: "Lista vacía",
                text: "No tienes productos en favoritos para eliminar.",
                icon: "info",
                confirmButtonColor: "#9AC76E"
            });
            return;
        }

        // Pide confirmación para vaciar toda la lista
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas vaciar todos tus favoritos?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#D08159",
            cancelButtonColor: "#9AC76E",
            confirmButtonText: "Sí, vaciar todo",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                favoritos = [];
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                mostrarFavoritos();
                actualizarContadorFavoritos();

                Swal.fire({
                    title: "¡Vaciado!",
                    text: "Todos los favoritos han sido eliminados.",
                    icon: "success",
                    confirmButtonColor: "#9AC76E"
                });
            }
        });
    });
}

// ---

// Actualiza el contador de favoritos en el navbar
function actualizarContadorFavoritos() {
    const contador = document.getElementById("fav-count");
    if (!contador) return;
    const favCount = (JSON.parse(localStorage.getItem("favoritos")) || []).length;
    contador.textContent = favCount > 0 ? favCount : "";
    contador.style.display = favCount > 0 ? "inline-block" : "none";
}

// ---

// Muestra los productos en el modal del carrito
function mostrarCarrito() {
    const contenedor = document.getElementById("cartItems");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    let totalCarrito = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        const totalPagar = document.getElementById("totalPagar");
        if (totalPagar) totalPagar.textContent = "Total a pagar: $0.000";
        return;
    }

    carrito.forEach((prod, index) => {
        const totalProducto = prod.precio * prod.cantidad;
        contenedor.innerHTML += `
            <div class="cart-item rounded p-3 mb-3">
                <div class="row align-items-center">
                    <div class="col-md-2 text-center">
                        <img src="${prod.imagen}" width="80" height="80">
                    </div>
                    <div class="col-md-6">
                        <strong>${prod.titulo}</strong>
                        <div class="d-flex align-items-center">
                            <span style="color: #D08159; font-weight: bold;">Cantidad: ${prod.cantidad}</span>
                            <button class="btn btn-sm mx-2" style="border: 1px solid #D08159;" onclick="cambiarCantidadCarrito(${index}, -1)">−</button>
                            <button class="btn btn-sm mx-2" style="border: 1px solid #D08159;" onclick="cambiarCantidadCarrito(${index}, 1)">+</button>
                            <button class="remove btn btn-sm" data-index="${index}"></button>
                        </div>
                    </div>
                    <div class="col-md-4 text-end">
                        <span><strong>Valor libra:</strong> $${Number(prod.precio).toFixed(3)}</span>
                        <p style="margin-bottom: 0; margin-top: 15px;"><strong>Total :</strong> $${Number(totalProducto).toFixed(3)}</p>
                    </div>
                </div>
            </div>
        `;
        totalCarrito += totalProducto;
    });

    const totalPagar = document.getElementById("totalPagar");
    if (totalPagar) totalPagar.innerHTML = `<strong>Total a pagar:</strong> $${totalCarrito.toFixed(3)}`;
}

// ---

// Cambia la cantidad de un producto en el carrito
function cambiarCantidadCarrito(index, cantidad) {
    const producto = carrito[index];
    let nuevaCantidad = producto.cantidad + cantidad;
    if (nuevaCantidad >= 1) {
        producto.cantidad = nuevaCantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        actualizarContadorCarrito();
    }
}

// Carga el footer
fetch("../partials/footer.html")
    .then(r => r.text())
    .then(html => {
        const f = document.getElementById("footer");
        if (f) f.innerHTML = html;
    });

// ---

// Inicializa la vista mostrando los productos favoritos al cargar la página
mostrarFavoritos();