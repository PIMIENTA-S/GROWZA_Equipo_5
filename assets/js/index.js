
// Carga la barra de navegación y el pie de página
fetch("../partials/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
        fetch('../assets/js/auth.js')
            .then(res => res.text())
            .then(jsCode => {
                const script = document.createElement("script");
                script.textContent = jsCode; // Inserta el código como texto
                document.body.appendChild(script);
            })
            .catch(err => console.error("Error cargando auth.js:", err));
        // Inicializamos el contador al cargar el navbar
        actualizarContadorCarrito();
    });

fetch('../partials/footer.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

// Asegúrate de inicializar la variable carrito al comienzo de tu script
// Carga el carrito desde localStorage, si no existe, crea un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// La función actualizarContadorCarrito también es necesaria
function actualizarContadorCarrito() {
    // Busca el elemento solo si no se ha encontrado antes
    const contador = document.getElementById("cart-count");
    if (!contador) return;

    let totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

    contador.textContent = totalItems > 0 ? totalItems : "";
    contador.style.display = totalItems > 0 ? "inline-block" : "none";
}

document.addEventListener("click", function (e) {
    if (e.target.closest(".add-to-cart")) {
        e.preventDefault();

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
// 🔹 AGREGAR AL CARRITO DESDE FAVORITOS
// ==========================
document.addEventListener("click", function (e) {
    if (e.target.closest(".botones")) {
        e.preventDefault();
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

        const btn = e.target.closest(".botones");
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
