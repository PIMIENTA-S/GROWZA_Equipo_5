fetch("../../components/navbar/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });


// Productos estaticos
let productosEstaticos = [
    {
        titulo: "Vegetales",
        descripcion: "Vegetales productos vendidos por tomates Inc",
        precio: 1500,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Verduras"
    },
    {
        titulo: "Frutas",
        descripcion: "Frutas frescas y deliciosas",
        precio: 1200,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Frutas"
    },
    {
        titulo: "Legumbres",
        descripcion: "Legumbres orgánicas de alta calidad",
        precio: 1000,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Legumbres"
    },
    {
        titulo: "Vegetales",
        descripcion: "Vegetales productos vendidos por tomates Inc",
        precio: 1500,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Verduras"
    },
    {
        titulo: "Frutas",
        descripcion: "Frutas frescas y deliciosas y bonitas",
        precio: 1200,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Frutas"
    },
    {
        titulo: "Legumbres",
        descripcion: "Legumbres orgánicas de alta calidad",
        precio: 1000,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Legumbres"
    },
    {
        titulo: "Vegetales",
        descripcion: "Vegetales productos vendidos por tomates Inc",
        precio: 1500,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Verduras"
    },
    {
        titulo: "Frutas",
        descripcion: "Frutas frescas y deliciosas y bonitas",
        precio: 1200,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Frutas"
    },
    {
        titulo: "Legumbres",
        descripcion: "Legumbres orgánicas de alta calidad",
        precio: 1000,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Legumbres"
    },
    {
        titulo: "Legumbres",
        descripcion: "Legumbres orgánicas de alta calidad",
        precio: 1000,
        imagen: "../../../Public/images/manzana.jpg",
        categoria: "Legumbres"
    }
]


// Inicializa el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let todosLosProductos = [...productosEstaticos, ...productos];
const productosSection = document.getElementById("productos");

function mostrarProductos() {
    // 🔹 Solución: limpiar el contenedor antes de volver a renderizar
    productosSection.innerHTML = "";

    const fila = document.createElement("div");
    fila.classList.add("row");

    todosLosProductos.forEach(producto => {
        const col = document.createElement("div");

        col.classList.add("col-12", "col-md-6","col-lg-3","mt-3", "mb-3", "text-center");

        col.innerHTML = `
            <div class="card" style="width: 16rem;">
                <img src="${producto.imagen}" class="card-img-top" style="height: 200px;" alt="${producto.titulo}">
                <div class="card-body">
                    <h4 class="card-title"><strong>${producto.titulo}</strong></h4>
                    <p class="card-text" style="height:48px;">${producto.descripcion}</p>
                    <h3 class="mb-3">$${producto.precio}</h3>
                    <div class="m-auto">
                        <a href="#"><img src="../../../Public/images/heart.svg" alt="Me gusta"></a>
                        
                        <!-- Botón del ojo con data-* -->
                        <a href="#" class="btn ver-detalle" 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                            data-titulo="${producto.titulo}"
                            data-precio="${producto.precio}"
                            data-img="${producto.imagen}"
                            data-descripcion="${producto.descripcion}">
                            <img src="../../../Public/images/eye.svg" alt="Ver detalles">
                        </a>

                        <a href="#" class="add-to-cart" 
                            data-titulo="${producto.titulo}" 
                            data-precio="${producto.precio}" 
                            data-img="${producto.imagen}">
                            <img src="../../../Public/images/basket.svg" alt="Agregar al carrito">
                        </a>
                    </div>
                </div>
            </div>
        `;
        fila.appendChild(col);
    });

    productosSection.appendChild(fila);

    // Escuchar los clics en los botones del ojo
    document.querySelectorAll(".ver-detalle").forEach(btn => {
        btn.addEventListener("click", function () {
            let titulo = this.getAttribute("data-titulo");
            let precio = this.getAttribute("data-precio");
            let img = this.getAttribute("data-img");
            let descripcion = this.getAttribute("data-descripcion");

            // Rellenar modal con los datos
            document.querySelector("#exampleModal .modal-body img").src = img;
            document.querySelector("#exampleModal .modal-body img").alt = titulo;
            document.querySelector("#exampleModal .card-body h4").textContent = titulo;
            document.querySelector("#exampleModal .card-body .card-text small").textContent = descripcion;
            document.querySelector("#exampleModal .btn-filtro").textContent = `Comprar por: $${precio} Libra`;
        });
    });
}

// Llamada inicial
mostrarProductos();



// Llamado a modal carrito con su script
fetch("../../components/modalCarrito/modalCarritol.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("modalContainer").innerHTML = html;

        const script = document.createElement("script");
        script.src = "../../components/modalCarrito/modalCarrito.js";
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


                            Swal.fire({
                                title: "¡Eliminado!",
                                text: "El carrito ha sido vaciado.",
                                icon: "success"
                            });
                        }
                    });
                }

                // Cuando el modal se muestra, se actualiza el carrito
                carritoModal.addEventListener("shown.bs.modal", () => {
                    mostrarCarrito();
                });
            }
        };
        document.body.appendChild(script);
    });


function mostrarCarrito() {
    const contenedor = document.getElementById("cartItems");
    contenedor.innerHTML = "";

    let totalCarrito = 0;  

    carrito.forEach((prod, index) => {
        // Calculamos el total de cada producto
        const totalProducto = prod.precio * prod.cantidad;

        contenedor.innerHTML += `
            <div class="cart-item rounded p-3 mb-3">
                <div class="row align-items-center">
                    <div class="col-md-2 text-center">
                        <img src="${prod.imagen}" width="80" heigth="80">
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
                        <span><strong>Valor libra:</strong> $${prod.precio}</span>
                        <p style="margin-bottom: 0; margin-top: 15px;"><strong>Total :</strong> $${totalProducto}</p>
                    </div>
                </div>
            </div>
        `;
        totalCarrito += totalProducto;
    });

    document.getElementById("totalPagar").innerHTML = `<strong>Total a pagar:</strong> $${totalCarrito.toFixed(2)}`;
}


// Cambiar la cantidad en el carrito
function cambiarCantidadCarrito(index, cantidad) {
    const producto = carrito[index];
    let nuevaCantidad = producto.cantidad + cantidad;

    if (nuevaCantidad >= 1) {
        producto.cantidad = nuevaCantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}

//Eliminar del carrito  
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



// Agregar productos al carrito desde las tarjetas
document.addEventListener("click", function (e) {
    if (e.target.closest(".add-to-cart")) {
        e.preventDefault();
        const btn = e.target.closest(".add-to-cart");
        const producto = {
            titulo: btn.dataset.titulo,
            precio: btn.dataset.precio,
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

    }
});


// Configurar el botón del carrito
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


// Mostrar productos al cargar la página
mostrarProductos();

// Cargar el footer
fetch('../../components/footer/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });
