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

// Mostrar prodcutos - catalogo
function mostrarProductos() {
    const fila = document.createElement("div");
    fila.classList.add("row");

    todosLosProductos.forEach(producto => {
        const col = document.createElement("div");
        col.classList.add("col-3", "mt-3", "mb-3", "text-center");

        col.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" style="height: 200px;" alt="${producto.titulo}">
                <div class="card-body">
                    <h4 class="card-title"><strong>${producto.titulo}</strong></h4>
                    <p class="card-text">${producto.descripcion}</p>
                    <h3 class="mb-3">$${producto.precio}</h3>
                    <div class="m-auto">
                        <a href="#"><img src="../../../Public/images/heart.svg" alt="Me gusta"></a>
                        <a href="#"><img src="../../../Public/images/eye.svg" alt="Ver"></a>
                        <a href="#" class="add-to-cart" data-titulo="${producto.titulo}" data-precio="${producto.precio}" data-img="${producto.imagen}">
                            <img src="../../../Public/images/basket.svg" alt="Agregar al carrito">
                        </a>
                    </div>
                </div>
            </div>
        `;
        fila.appendChild(col);
    });

    productosSection.appendChild(fila);
}

// Llamdado a modal carrito con su script
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
                    vaciarBtn.addEventListener("click", () => {
                        
                        carrito = [];
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                        mostrarCarrito(); // <- Refrescar modal
                    });
                }

                carritoModal.addEventListener("shown.bs.modal", () => {
                    mostrarCarrito();
                });
            }
        };
        document.body.appendChild(script);
    });



// Mostrar productos en el carrito en el modal
function mostrarCarrito() {
    const contenedor = document.getElementById("cartItems");
    contenedor.innerHTML = "";

    carrito.forEach((prod, index) => {
        contenedor.innerHTML += `
            <div class="cart-item d-flex align-items-center justify-content-between mb-2">
                <img src="${prod.imagen}" width="50">
                <span>${prod.titulo}</span>
                <span>$${prod.precio}</span>
                <span>Cant: ${prod.cantidad}</span>
                <button class="remove btn btn-sm btn-danger" data-index="${index}">❌</button>
            </div>
        `;
    });
}

// Mostrar productos en el carrito con botones + y -
function mostrarCarrito() {
    const contenedor = document.getElementById("cartItems");
    contenedor.innerHTML = "";  // Limpiar el carrito

    carrito.forEach((prod, index) => {
        contenedor.innerHTML += `
            <div class="cart-item d-flex align-items-center justify-content-between mb-2">
                <img src="${prod.imagen}" width="50">
                <span>${prod.titulo}</span>
                <span>$${prod.precio}</span>
                
                <!-- Control de cantidad -->
                <div class="cantidad-control d-flex align-items-center">
                    <button class="btn btn-sm btn-secondary" onclick="cambiarCantidadCarrito(${index}, -1)">−</button>
                    <span class="mx-2">${prod.cantidad}</span>
                    <button class="btn btn-sm btn-secondary" onclick="cambiarCantidadCarrito(${index}, 1)">+</button>
                </div>

                <button class="remove btn btn-sm btn-danger" data-index="${index}">❌</button>
            </div>
        `;
    });
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


// Eliminar producto del carrito
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
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
        alert(`${producto.titulo} agregado al carrito`);
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

