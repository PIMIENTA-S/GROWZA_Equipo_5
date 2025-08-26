
fetch("../../components/navbar/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });
let productos = JSON.parse(localStorage.getItem("productos")) || [];
const productosSection = document.getElementById("productos");

function mostrarProductos() {
    // 1. Crea un contenedor para la fila
    const fila = document.createElement("div");
    fila.classList.add("row");

    productos.forEach(producto => {
        // 2. Crea la columna para cada tarjeta
        const col = document.createElement("div");
        col.classList.add("col-3", "mt-3", "mb-3", "text-center");

        col.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" style="height: 200px; alt="${producto.titulo}">
                <div class="card-body">
                    <h4 class="card-title"><strong>${producto.titulo}</strong></h4>
                    <p class="card-text">${producto.descripcion}</p>
                    <h3 class="mb-3">${producto.categoria}</h3>
                    <div class="m-auto">
                        <a href="#"><img src="../../../Public/images/heart.svg" alt="Me gusta"></a>
                        <a href="#"><img src="../../../Public/images/eye.svg" alt="Ver"></a>
                        <a href="#"><img src="../../../Public/images/shopping-cart.svg" alt="Agregar al carrito"></a>
                    </div>
                </div>
            </div>
        `;
        fila.appendChild(col);
    });

    productosSection.appendChild(fila);
}

mostrarProductos();
