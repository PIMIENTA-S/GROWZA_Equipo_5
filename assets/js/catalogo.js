// ==========================
// 🔹 CARGAR NAVBAR
// ==========================
fetch("../partials/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
        // Inicializamos el contador al cargar el navbar
        actualizarContadorCarrito();
    });


<<<<<<< HEAD:src/pages/catalogo/catalogo.js
// Productos estaticos
=======
// ==========================
// 🔹 PRODUCTOS ESTÁTICOS
// ==========================
>>>>>>> 6f97cd3b6ad445d795c3e6aa1731665b66f0dcdc:assets/js/catalogo.js
let productosEstaticos = [
    { titulo: "Brocoli", descripcion: "El brócoli, superalimento crucífero, pariente de la coliflor y la col.", precio: 7.995, imagen: "/assets/img/brocoli.jpg", categoria: "Verduras" },
    { titulo: "Espinaca", descripcion: "La espinaca es una planta anual de la familia de las amarantáceas.", precio: 5.980, imagen: "/assets/img/espinaca.jpg", categoria: "Verduras" },
    { titulo: "Zanahoria", descripcion: "La zanahoria es una hortaliza versátil y deliciosa para consumir.", precio: 2.840, imagen: "/assets/img/zanahoria.jpg", categoria: "Verduras" },
    { titulo: "Aguacate", descripcion: "El aguacate Hass impulsó las exportaciones de tres departamentos del país.", precio: 6.390, imagen: "/assets/img/aguacate.jpg", categoria: "Verduras" },
    { titulo: "Manzana", descripcion: "La manzana o poma​ es la fruta comestible de la especie Malus domestica, el manzano común.", precio: 7.559, imagen: "/assets/img/manzana.jpg", categoria: "Frutas" },
    { titulo: "Banano", descripcion: "El banano es una fruta tropical dulce de la planta Musa con pulpa suave.", precio: 1.890, imagen: "/assets/img/banano.jpg", categoria: "Frutas" },
    { titulo: "Arándanos", descripcion: "Los arándanos son frutos pequeños, bayas de la especie Vaccinium.", precio: 7.490, imagen: "/assets/img/arandanos.jpg", categoria: "Frutas" },
    { titulo: "Fresa", descripcion: "La fresa es un género de plantas rastreras estoloníferas de la familia Rosaceae.", precio: 6.980, imagen: "/assets/img/fresas.jpg", categoria: "Frutas" },
    { titulo: "Agua de Coco", descripcion: "Líquido que se encuentra de forma natural en el hoyo interior del coco.", precio: 6.500, imagen: "/assets/img/aguaCoco.jpg", categoria: "Bebidas" },
    { titulo: "Jugo Verde", descripcion: "Contribuye a mejor digestión, sistema inmunológico fuerte y desintoxicar el organismo.", precio: 9.000, imagen: "/assets/img/jugoVerde.jpg", categoria: "Bebidas" }
];


// ==========================
// 🔹 CARRITO Y PRODUCTOS DINÁMICOS
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let todosLosProductos = [...productosEstaticos, ...productos];

const productosSection = document.getElementById("productos");


// ==========================
// 🔹 MOSTRAR PRODUCTOS
// ==========================
function mostrarProductos() {
    productosSection.innerHTML = "";

    const fila = document.createElement("div");
    fila.classList.add("row");

    todosLosProductos.forEach(producto => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-3", "mt-3", "mb-3", "text-center");

        col.innerHTML = `
            <div class="card" style="width: 16rem; height: 400px;" id="card-catalogo">
                <img src="${producto.imagen}" class="card-img-top" style="height: 200px;" alt="${producto.titulo}">
                <div class="card-body">
                    <h4 class="card-title"><strong>${producto.titulo}</strong></h4>
                    <p class="card-text" style="height:72px; margin-bottom: 10px;">${producto.descripcion}</p>
                    <h3 class="mb-3">$${Number(producto.precio).toFixed(3)}</h3>
                    <div class="d-flex flex-column position-absolute top-0 end-0">
                        <a href="#" id="btn-card"><img src="/assets/img/heart-fill.svg" alt="Me gusta" ></a>
                        <a href="#" class="btn ver-detalle" id="btn-card1"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                            data-titulo="${producto.titulo}"
                            data-precio="${Number(producto.precio).toFixed(3)}"
                            data-img="${producto.imagen}"
                            data-descripcion="${producto.descripcion}">
                            <img src="/assets/img/eye-bold.svg" alt="Ver detalles">
                        </a>
                        <a href="#" class="add-to-cart" id="btn-card2"
                            data-titulo="${producto.titulo}" 
                            data-precio="${Number(producto.precio).toFixed(3)}" 
                            data-img="${producto.imagen}">
                            <img src="/assets/img/basket-bold.svg" alt="Agregar al carrito">
                        </a>
                    </div>
                </div>
            </div>
        `;
        fila.appendChild(col);
    });

    productosSection.appendChild(fila);

    // Modal del ojo
    document.querySelectorAll(".ver-detalle").forEach(btn => {
        btn.addEventListener("click", function () {
            let titulo = this.getAttribute("data-titulo");
            let precio = this.getAttribute("data-precio");
            let img = this.getAttribute("data-img");
            let descripcion = this.getAttribute("data-descripcion");

            document.querySelector("#exampleModal .modal-body img").src = img;
            document.querySelector("#exampleModal .modal-body img").alt = titulo;
            document.querySelector("#exampleModal .card-body h4").textContent = titulo;
            document.querySelector("#exampleModal .card-body .card-text small").textContent = descripcion;
            document.querySelector("#exampleModal .btn-filtro").textContent = `Comprar por: $${Number(precio).toFixed(3)} Libra`;
        });
    });
}

mostrarProductos();


// ==========================
// 🔹 MODAL DEL CARRITO
// ==========================
fetch("../modals/carroCompras.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("modalContainer").innerHTML = html;

        const script = document.createElement("script");
        script.src = "/assets/js/carroCompras.js";
        script.onload = () => {
            const carritoModal = document.getElementById("carritoModal");

            if (carritoModal) {
                setupCartButton();

                const vaciarBtn = document.getElementById("vaciarCarrito");
                if (vaciarBtn) {
                    vaciarBtn.addEventListener("click", async () => {
                        const result = await Swal.fire({
                            title: "¿Estás seguro?",
                            text: "No puedes devolver esta acción",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#9AC76E",
                            cancelButtonColor: "#D08159",
                            confirmButtonText: "Sí, eliminar",
                            cancelButtonText: "Cancelar"
                        });

                        if (result.isConfirmed) {
                            carrito = [];
                            localStorage.setItem("carrito", JSON.stringify(carrito));
                            mostrarCarrito();
                            actualizarContadorCarrito();

                            Swal.fire({
                                title: "¡Eliminado!",
                                text: "El carrito ha sido vaciado.",
                                icon: "success",
                                confirmButtonColor: "#9AC76E"
                            });
                        }
                    });
                }

                carritoModal.addEventListener("shown.bs.modal", () => {
                    mostrarCarrito();
                });
            }
        };
        document.body.appendChild(script);
    });


// ==========================
// 🔹 MOSTRAR CARRITO
// ==========================
function mostrarCarrito() {
    const contenedor = document.getElementById("cartItems");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    let totalCarrito = 0;

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


// ==========================
// 🔹 CAMBIAR CANTIDAD CARRITO
// ==========================
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


// ==========================
// 🔹 ELIMINAR PRODUCTO DEL CARRITO
// ==========================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
        const index = parseInt(e.target.dataset.index);

        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Este producto será eliminado del carrito!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#9AC76E",
            cancelButtonColor: "#D08159",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                if (!isNaN(index) && index >= 0 && index < carrito.length) {
                    carrito.splice(index, 1);
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    mostrarCarrito();
                    actualizarContadorCarrito();

                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El producto ha sido eliminado.",
                        icon: "success",
                        confirmButtonColor: "#9AC76E"
                    });
                }
            }
        });
    }
});


// ==========================
// 🔹 AGREGAR AL CARRITO DESDE TARJETAS
// ==========================
document.addEventListener("click", function (e) {
    // 1. Verificación: Si el usuario hizo clic en el botón de agregar al carrito
    if (e.target.closest(".add-to-cart")) {
        e.preventDefault();

        // 2. OBTENER EL USUARIO ACTIVO DEL LOCAL STORAGE
        const usuarioActivo = localStorage.getItem("usuarioActivo");

        // 3. VALIDACIÓN
        if (!usuarioActivo) { // Si no hay un usuario activo...
            Swal.fire({
                title: "¡Hola!",
                text: "Debes iniciar sesión para agregar productos al carrito.",
                icon: "warning",
                confirmButtonColor: "#9AC76E",
                confirmButtonText: "Iniciar Sesión"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "inicioSesion.html"; // Redirigir a la página de login
                }
            });
            return; // Detener la ejecución del código
        }

        // 4. LÓGICA DE AGREGAR PRODUCTO (solo se ejecuta si hay un usuario activo)
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


// ==========================
// 🔹 CONFIGURAR BOTÓN DEL CARRITO
// ==========================
function setupCartButton() {
    const cartButton = document.getElementById("cartButton");
    if (cartButton) {
        cartButton.addEventListener("click", function (e) {
            e.preventDefault();
            mostrarCarrito();
            const carritoModal = new bootstrap.Modal(document.getElementById("carritoModal"));
            carritoModal.show();
        });
    }
}


// ==========================
// 🔹 CONTADOR DEL CARRITO
// ==========================
function actualizarContadorCarrito() {
    const contador = document.getElementById("cart-count");
    if (!contador) return;
    let totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

    contador.textContent = totalItems > 0 ? totalItems : "";
    contador.style.display = totalItems > 0 ? "inline-block" : "none";
}


// ==========================
// 🔹 CARGAR FOOTER
// ==========================
fetch('../partials/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

    