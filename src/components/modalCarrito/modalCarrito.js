
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Mostrar carrito en el modal
function mostrarCarrito() {
    const contenedor = document.getElementById("cartItems");
    contenedor.innerHTML = ""; 

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No tienes productos en el carrito.</p>";
    } else {
        carrito.forEach((prod, index) => {
            contenedor.innerHTML += `
                <div class="cart-item d-flex align-items-center justify-content-between mb-2">
                    <img src="${prod.imagen}" width="60" height="60">
                    <span>${prod.titulo}</span>
                    <span>$${prod.precio}</span>
                    <span>Cant: ${prod.cantidad}</span>
                    <button class="remove btn btn-sm btn-danger" data-index="${index}">❌</button>
                </div>
            `;
        });
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


document.addEventListener("DOMContentLoaded", function () {
    const carritoModal = document.getElementById("carritoModal");
    if (carritoModal) {
        const bootstrapModal = new bootstrap.Modal(carritoModal);
    } else {
        console.log("El modal no está presente en el DOM");
    }
});
