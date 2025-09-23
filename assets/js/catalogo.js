// ==========================
// 🔹 CARGAR NAVBAR
// ==========================

fetch("../partials/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
        const scriptNavbar = document.createElement("script");
        scriptNavbar.src = "../assets/js/navbar.js";
        document.body.appendChild(scriptNavbar);

        const scriptAuth = document.createElement("script");
        scriptAuth.src = "../assets/js/auth.js";
        document.body.appendChild(scriptAuth);

        // Inicializamos el contador al cargar el navbar
        actualizarContadorCarrito();
        actualizarContadorFavoritos();
    });

// ==========================
// 🔹 PRODUCTOS ESTÁTICOS
// ==========================
let productosEstaticos = [
    {
        titulo: "Brocoli",
        descripcion: "El brócoli, superalimento crucífero, pariente de la coliflor y la col.",
        datoCurioso: "El brócoli contiene más vitamina C que una naranja.",
        precio: 7.995,
        imagen: "/assets/img/brocoli.webp",
        categoria: "Verduras"
    },
    {
        titulo: "Espinaca",
        descripcion: "La espinaca es una planta anual de la familia de las amarantáceas.",
        datoCurioso: "La espinaca fue popularizada por Popeye por su alto contenido en hierro.",
        precio: 5.980,
        imagen: "/assets/img/espinaca.webp",
        categoria: "Verduras"
    },
    {
        titulo: "Zanahoria",
        descripcion: "La zanahoria es una hortaliza versátil y deliciosa para consumir.",
        datoCurioso: "Las zanahorias originalmente eran moradas, no naranjas.",
        precio: 2.840,
        imagen: "/assets/img/zanahoria.webp",
        categoria: "Verduras"
    },
    {
        titulo: "Aguacate",
        descripcion: "El aguacate Hass impulsó las exportaciones de tres departamentos del país.",
        datoCurioso: "El aguacate es una fruta, y técnicamente una baya con una sola semilla.",
        precio: 6.390,
        imagen: "/assets/img/aguacate.webp",
        categoria: "Verduras"
    },
    {
        titulo: "Manzana",
        descripcion: "La manzana o poma​ es la fruta comestible de la especie Malus domestica, el manzano común.",
        datoCurioso: "Existen más de 7.500 variedades de manzanas en el mundo.",
        precio: 7.559,
        imagen: "/assets/img/manzana.webp",
        categoria: "Frutas"
    },
    {
        titulo: "Banano",
        descripcion: "El banano es una fruta tropical dulce de la planta Musa con pulpa suave.",
        datoCurioso: "Los bananos son técnicamente hierbas y sus frutos son bayas.",
        precio: 1.890,
        imagen: "/assets/img/banano.webp",
        categoria: "Frutas"
    },
    {
        titulo: "Arándanos",
        descripcion: "Los arándanos son frutos pequeños, bayas de la especie Vaccinium.",
        datoCurioso: "Los arándanos tienen uno de los niveles más altos de antioxidantes entre todas las frutas.",
        precio: 7.490,
        imagen: "/assets/img/arandanos.webp",
        categoria: "Frutas"
    },
    {
        titulo: "Fresa",
        descripcion: "La fresa es un género de plantas rastreras estoloníferas de la familia Rosaceae.",
        datoCurioso: "Las fresas no son verdaderas bayas, pero sus semillas están en el exterior.",
        precio: 6.980,
        imagen: "/assets/img/fresas.webp",
        categoria: "Frutas"
    },
    {
        titulo: "Agua de Coco",
        descripcion: "Líquido que se encuentra de forma natural en el hoyo interior del coco.",
        datoCurioso: "El agua de coco fue utilizada como sustituto de plasma en la Segunda Guerra Mundial.",
        precio: 6.500,
        imagen: "/assets/img/aguaCoco.webp",
        categoria: "Bebidas"
    },
    {
        titulo: "Jugo Verde",
        descripcion: "Contribuye a mejor digestión, sistema inmunológico fuerte y desintoxicar el organismo.",
        datoCurioso: "El jugo verde combina vegetales y frutas, potenciando sus nutrientes y fibra.",
        precio: 9.000,
        imagen: "/assets/img/jugoVerde.webp",
        categoria: "Bebidas"
    }
];

function obtenerProductos() {
  // 🔹 Obtener productos de localStorage (si existen)
  let productosLS = JSON.parse(localStorage.getItem("productos")) || [];

  // 🔹 Unir con los estáticos
  return [...productosEstaticos, ...productosLS];
}

// ==========================
// 🔹 CARRITO Y PRODUCTOS DINÁMICOS
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let todosLosProductos = [...productosEstaticos, ...productos];

const productosSection = document.getElementById("productos");


// ==========================
// 🔹 MOSTRAR PRODUCTOS
// ==========================
function mostrarProductos(lista = obtenerProductos()) {
    productosSection.innerHTML = "";

    const fila = document.createElement("div");
    fila.classList.add("row");

    lista.forEach(producto => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-3", "mt-3", "mb-3", "text-center");

        col.innerHTML = `
                <div class="card h-100" id="card-catalogo">
                <img src="${producto.imagen}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${producto.titulo}">
                <div class="card-body d-flex flex-column">
                    <h4 class="card-title"><strong>${producto.titulo}</strong></h4>
                    <p class="card-text flex-grow-1" style="margin-bottom: 10px;">${producto.descripcion}</p>
                    <h3 class="mb-3">$${Number(producto.precio).toFixed(3)}</h3>
                    <div class="d-flex flex-column position-absolute top-0 end-0 m-2">
                    
                        <!-- FAVORITOS -->
                        <a href="#" class="btn-favorito" id="btn-card"
                            data-titulo="${producto.titulo}"
                            data-precio="${Number(producto.precio).toFixed(3)}"
                            data-img="${producto.imagen}">
                            <img src="/assets/img/heart-fill.svg" alt="Me gusta">
                        </a>
                        
                        <!-- 👁️ VER DETALLE -->
                        <a href="#" class="btn ver-detalle" id="btn-card1"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                            data-titulo="${producto.titulo}"
                            data-precio="${Number(producto.precio).toFixed(3)}"
                            data-img="${producto.imagen}"
                            data-descripcion="${producto.datoCurioso}">
                            <img src="/assets/img/eye-bold.svg" alt="Ver detalles">
                        </a>

                        <!-- 🛒 AGREGAR CARRITO -->
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

    // Eventos de detalle
    document.querySelectorAll(".ver-detalle").forEach(btn => {
        btn.addEventListener("click", function () {
            let titulo = this.getAttribute("data-titulo");
            let precio = this.getAttribute("data-precio");
            let img = this.getAttribute("data-img");
            let descripcion = this.getAttribute("data-descripcion");

            document.querySelector("#exampleModal .modal-body img").src = img;
            document.querySelector("#exampleModal .modal-body img").alt = titulo;
            document.querySelector("#exampleModal .card-body h4").textContent = titulo;

            const curiosoElem = document.querySelector("#exampleModal .dato-curioso");
            if (curiosoElem) {
                curiosoElem.textContent = descripcion ? `💡 ${descripcion}` : "Este producto no tiene un dato curioso.";
            }

            document.querySelector("#exampleModal .btn-filtro").textContent =
                `Comprar por: $${Number(precio).toFixed(3)} Libra`;
        });
    });
}

mostrarProductos();

// fetch("../modals/carroCompras.html")
//     .then(res => res.text())
//     .then(html => {
//         document.getElementById("modalContainer").innerHTML = html;

//         const script = document.createElement("script");
//         script.src = "/assets/js/carroCompras.js";
//         script.onload = () => {
//             const carritoModal = document.getElementById("carritoModal");

//             if (carritoModal) {
//                 setupCartButton();

//                 const vaciarBtn = document.getElementById("vaciarCarrito");
//                 if (vaciarBtn) {
//                     vaciarBtn.addEventListener("click", async () => {
//                         const result = await Swal.fire({
//                             title: "¿Estás seguro?",
//                             text: "No puedes devolver esta acción",
//                             icon: "warning",
//                             showCancelButton: true,
//                             confirmButtonColor: "#9AC76E",
//                             cancelButtonColor: "#D08159",
//                             confirmButtonText: "Sí, eliminar",
//                             cancelButtonText: "Cancelar"
//                         });

//                         if (result.isConfirmed) {
//                             carrito = [];
//                             localStorage.setItem("carrito", JSON.stringify(carrito));
//                             mostrarCarrito();
//                             actualizarContadorCarrito();

//                             Swal.fire({
//                                 title: "¡Eliminado!",
//                                 text: "El carrito ha sido vaciado.",
//                                 icon: "success",
//                                 confirmButtonColor: "#9AC76E"
//                             });
//                         }
//                     });
//                 }

//                 carritoModal.addEventListener("shown.bs.modal", () => {
//                     mostrarCarrito();
//                 });
//             }
//         };
//         document.body.appendChild(script);
//     });


fetch("../modals/carroCompras.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("modalContainer").innerHTML = html;

        const script = document.createElement("script");
        script.src = "/assets/js/carroCompras.js";
        script.onload = () => {
            const carritoModal = document.getElementById("carritoModal");

            if (carritoModal) {
                // Esta función asegura que los botones del carrito funcionen.
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
                
                // ✅ IMPORTANTE: Se llama a la función mostrarCarrito()
                // cuando el modal se muestra, asegurando que siempre se
                // carguen los datos más recientes del localStorage.
                carritoModal.addEventListener("shown.bs.modal", () => {
                    mostrarCarrito();
                });
                
                // ✅ Agregamos esta llamada para que el carrito se inicialice
                // al cargar la página, en caso de que ya existan productos.
                mostrarCarrito();
            }
        };
        document.body.appendChild(script);
    });



// ==========================
// 🔹 AGREGAR A FAVORITOS
// ==========================
document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-favorito")) {
        e.preventDefault();
        const btn = e.target.closest(".btn-favorito");
        const producto = {
            titulo: btn.dataset.titulo,
            des: btn.dataset.descripcion,
            precio: parseFloat(btn.dataset.precio),
            imagen: btn.dataset.img
        };

        const existe = favoritos.some(item => item.titulo === producto.titulo);
        if (!existe) {
            favoritos.push(producto);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            Swal.fire({
                title: "Agregado a favoritos",
                icon: "success",
                confirmButtonColor: "#9AC76E"
            });
            
        } else {
            Swal.fire({
                title: "Ya está en favoritos",
                icon: "info",
                confirmButtonColor: "#9AC76E"
            });
        }

        actualizarContadorFavoritos();
    }
});

// ==========================
// 🔹 CONTADOR FAVORITOS
// ==========================
function actualizarContadorFavoritos() {
    const contador = document.getElementById("fav-count");
    if (!contador) return;
    contador.textContent = favoritos.length > 0 ? favoritos.length : "";
    contador.style.display = favoritos.length > 0 ? "inline-block" : "none";
}

actualizarContadorFavoritos();

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

        // 2. OBTENER EL TOKEN DEL LOCAL STORAGE
        const token = localStorage.getItem("jwt");

        // 3. VALIDACIÓN
        if (!token) { // Si no hay token => no hay sesión
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

        // 4. LÓGICA DE AGREGAR PRODUCTO (solo se ejecuta si hay sesión activa)
        const btn = e.target.closest(".add-to-cart");
        const producto = {
            titulo: btn.dataset.titulo,
            precio: parseFloat(btn.dataset.precio),
            imagen: btn.dataset.img,
            cantidad: 1
        };

        // Recuperar carrito existente o inicializar uno nuevo
        // let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const productoExistente = carrito.find(item => item.titulo === producto.titulo);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push(producto);
        }

        // Guardar carrito actualizado
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Swal.fire({
            title: "¡Producto agregado al carrito!",
            icon: "success",
            confirmButtonColor: "#9AC76E"
        });

        mostrarCarrito();
        // Actualizar contador del carrito (si tienes esa función definida)
        if (typeof actualizarContadorCarrito === "function") {
            actualizarContadorCarrito();
        }
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

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => { // esperar a que cargue el navbar
    const inputBusqueda = document.querySelector("#searchBox input");

    if (inputBusqueda) {
      inputBusqueda.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtrados = obtenerProductos().filter(prod =>
        prod.titulo.toLowerCase().includes(texto) ||
        prod.descripcion.toLowerCase().includes(texto) ||
        prod.categoria.toLowerCase().includes(texto)
    );

        mostrarProductos(filtrados);
      });
    }

    // 🔹 Mostrar todo al inicio
    mostrarProductos(obtenerProductos());
  }, 500); // delay pequeño para dar tiempo a que cargue el navbar
});


// ==========================
// 🔹 CARGAR FOOTER
// ==========================
fetch('../partials/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

// ==========================
// 🔹 INICIALIZACIÓN
// ==========================
mostrarProductos();
actualizarContadorCarrito();
actualizarContadorFavoritos();

// fetch("../modals/carroCompras.html")
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById("modalContainer").innerHTML = data;

//         // 🔹 Ahora que existe el modal en el DOM, mostramos el carrito
//         mostrarCarrito();
//     });
