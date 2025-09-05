// Navbar
fetch("../../components/navbar/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });

// Productos estáticos
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
  }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let todosLosProductos = [...productosEstaticos, ...productos];
const productosSection = document.getElementById("productos");

// Mostrar productos - catálogo
function mostrarProductos() {
  const fila = document.createElement("div");
  fila.classList.add("row");

  todosLosProductos.forEach(producto => {
    const col = document.createElement("div");
    col.classList.add("col-12", "col-md-4", "mt-3", "mb-3");

    col.innerHTML = `
      <div class="card">
        <!-- Iconos arriba derecha -->
        <div class="card-icons">
          <a href="#"><i class="fa-solid fa-heart"></i></a>
          <a href="#"><i class="fa-solid fa-eye"></i></a>
          <a href="#" class="add-to-cart" 
            data-titulo="${producto.titulo}" 
            data-precio="${producto.precio}" 
            data-img="${producto.imagen}">
            <i class="fa-solid fa-basket-shopping"></i>
          </a>
        </div>

        <!-- Imagen del producto -->
        <img src="${producto.imagen}" class="card-img-top" style="height: 200px;" alt="${producto.titulo}">

        <div class="card-body text-center">
          <h4 class="card-title"><strong>${producto.titulo}</strong></h4>
          <p class="card-text" style="height:48px;">${producto.descripcion}</p>
          <h3 class="mb-3">$${producto.precio}</h3>
        </div>
      </div>
    `;
    fila.appendChild(col);
  });

  productosSection.appendChild(fila);
}

// Footer
fetch('../../components/footer/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

// Mostrar productos al cargar
mostrarProductos();
