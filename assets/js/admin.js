// admin.js

// Productos estáticos (ya que no los incluiste en tu ejemplo, se asume que siguen esta estructura)
const productosEstaticos = [
    { titulo: "Brocoli", descripcion: "El brócoli, superalimento crucífero, pariente de la coliflor y la col.", precio: 7995, imagen: "/assets/img/brocoli.jpg", categoria: "Verduras" },
    { titulo: "Espinaca", descripcion: "La espinaca es una planta anual de la familia de las amarantáceas.", precio: 5980, imagen: "/assets/img/espinaca.jpg", categoria: "Verduras" },
    { titulo: "Zanahoria", descripcion: "La zanahoria es una hortaliza versátil y deliciosa para consumir.", precio: 2840, imagen: "/assets/img/zanahoria.jpg", categoria: "Verduras" },
    { titulo: "Aguacate", descripcion: "El aguacate Hass impulsó las exportaciones de tres departamentos del país.", precio: 6390, imagen: "/assets/img/aguacate.jpg", categoria: "Verduras" },
    { titulo: "Manzana", descripcion: "La manzana o poma​ es la fruta comestible de la especie Malus domestica, el manzano común.", precio: 7559, imagen: "/assets/img/manzana.jpg", categoria: "Frutas" },
    { titulo: "Banano", descripcion: "El banano es una fruta tropical dulce de la planta Musa con pulpa suave.", precio: 1890, imagen: "/assets/img/banano.jpg", categoria: "Frutas" },
    { titulo: "Arándanos", descripcion: "Los arándanos son frutos pequeños, bayas de la especie Vaccinium.", precio: 7490, imagen: "/assets/img/arandanos.jpg", categoria: "Frutas" },
    { titulo: "Fresa", descripcion: "La fresa es un género de plantas rastreras estoloníferas de la familia Rosaceae.", precio: 6980, imagen: "/assets/img/fresas.jpg", categoria: "Frutas" },
    { titulo: "Agua de Coco", descripcion: "Líquido que se encuentra de forma natural en el hoyo interior del coco.", precio: 6500, imagen: "/assets/img/aguaCoco.jpg", categoria: "Bebidas" },
    { titulo: "Jugo Verde", descripcion: "Contribuye a mejor digestión, sistema inmunológico fuerte y desintoxicar el organismo.", precio: 9000, imagen: "/assets/img/jugoVerde.jpg", categoria: "Bebidas" }
];


// Inicializa los productos desde localStorage
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Elementos del DOM
const formulario = document.getElementById("formulario");
const idProductoOculto = document.getElementById("id-producto-oculto");
const listaProductosContainer = document.getElementById("lista-productos");
const btnGuardar = document.getElementById("btn-guardar");

// Elementos de navegación
const btnVerProductos = document.getElementById('btn-ver-productos');
const btnAgregarProducto = document.getElementById('btn-agregar-producto');
const btnEliminarTodos = document.getElementById('btn-eliminar-todos');


// Vistas
const vistaListado = document.getElementById('vista-listado');
const vistaFormulario = document.getElementById('vista-formulario');

// ----------------------------------------------------
// Novedades para la Vista Previa de la Tarjeta
// ----------------------------------------------------

const previewCard = document.getElementById("preview-card");
const previewImage = previewCard.querySelector(".card-img-top");
const previewTitle = previewCard.querySelector(".card-title strong");
const previewDescription = previewCard.querySelector(".card-text");
const previewPrice = previewCard.querySelector("h3");

// ----------------------------------------------------
// FUNCIONES DE NAVEGACIÓN
// ----------------------------------------------------

function mostrarVista(vistaId) {
    vistaListado.style.display = 'none';
    vistaFormulario.style.display = 'none';

    document.getElementById(vistaId).style.display = 'block';
}

// ----------------------------------------------------
// FUNCIONES DE CRUD
// ----------------------------------------------------

function listarProductos() {
    listaProductosContainer.innerHTML = '';
    const todosLosProductos = [...productosEstaticos, ...productos];

    if (todosLosProductos.length === 0) {
        listaProductosContainer.innerHTML = '<p class="text-center text-muted">No hay productos para mostrar.</p>';
        return;
    }

    todosLosProductos.forEach(producto => {
        const productRow = document.createElement("div");
        productRow.classList.add("d-flex", "justify-content-between", "align-items-center", "my-2", "border", "rounded");
        productRow.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-left: 10px;">
        <div class="flex-grow-1 ms-3">
        <h5 class="mb-0">${producto.titulo}</h5>
        <p class="text-muted mb-0">${producto.categoria}</p>
        </div>
        <div class="d-flex gap-2">
        <button class="btn btn-sm edit" onclick="cargarProductoParaEditar('${producto.id}')">Editar</button>
        <button class="btn btn-sm delete" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
        </div>
        `;
        listaProductosContainer.appendChild(productRow);
    });
}

function cargarProductoParaEditar(id) {
    const productoAEditar = productos.find(producto => producto.id == id);
    if (!productoAEditar) {
        console.error("Producto no encontrado.");
        return;
    }

    // Llenar formulario y mostrar la vista
    document.getElementById("id-producto-oculto").value = productoAEditar.id;
    document.getElementById("titulo-form").value = productoAEditar.titulo;
    document.getElementById("categoria-form").value = productoAEditar.categoria;
    document.getElementById("descripcion-form").value = productoAEditar.descripcion;
    document.getElementById("precio-form").value = productoAEditar.precio;
    document.getElementById("energia-form").value = productoAEditar.energia;
    document.getElementById("carbohidratos-form").value = productoAEditar.carbohidratos;
    document.getElementById("fibra-form").value = productoAEditar.fibra;
    document.getElementById("agua-form").value = productoAEditar.agua;
    document.getElementById("dato-curioso-form").value = productoAEditar.datoCurioso;

    const previewImg = document.getElementById("preview");
    previewImg.src = productoAEditar.imagen;
    previewImg.style.display = "block";

    btnGuardar.textContent = "Actualizar Producto";
    mostrarVista('vista-formulario');
    actualizarVistaPrevia(); // Llama a la función para mostrar la vista previa del producto editado
}

async function guardarProducto(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo-form").value;
    const categoria = document.getElementById("categoria-form").value;
    const descripcion = document.getElementById("descripcion-form").value;
    const precio = document.getElementById("precio-form").value;
    // const energia = document.getElementById("energia-form").value;
    // const carbohidratos = document.getElementById("carbohidratos-form").value;
    // const fibra = document.getElementById("fibra-form").value;
    // const agua = document.getElementById("agua-form").value;
    const datoCurioso = document.getElementById("dato-curioso-form").value;
    const imagen = document.getElementById("imagen-form").files;
    const id = document.getElementById("id-producto-oculto").value;

    const productoData = {
        titulo: titulo,
        categoria: categoria,
        descripcion: descripcion,
        precio: precio,
        // energia: energia,
        // carbohidratos: carbohidratos,
        // fibra: fibra,
        // agua: agua,
        datoCurioso: datoCurioso,
    };

    if (imagen.length > 0) {
        const file = imagen[0];
        const base64Image = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = event => resolve(event.target.result);
            reader.readAsDataURL(file);
        });
        productoData.imagen = base64Image;
    }

    let mensaje = "";
    if (id) {
        const index = productos.findIndex(p => p.id == id);
        if (index !== -1) {
            if (!productoData.imagen) {
                productoData.imagen = productos[index].imagen;
            }
            productos[index] = { ...productos[index], ...productoData };
            mensaje = `"${titulo}" fue actualizado correctamente.`;
        }
    } else {
        productoData.id = Date.now();
        productos.push(productoData);
        mensaje = `"${titulo}" fue agregado correctamente.`;
    }

    localStorage.setItem("productos", JSON.stringify(productos));
    limpiarFormulario();
    listarProductos();
    mostrarVista('vista-listado');

    // ✅ Mostrar alerta de éxito
    Swal.fire({
        title: "¡Éxito!",
        text: mensaje,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
    });
}


function limpiarFormulario() {
    formulario.reset();
    document.getElementById("id-producto-oculto").value = "";
    btnGuardar.textContent = "Guardar Producto";
    document.getElementById("preview").style.display = "none";

    // Limpia la vista previa de la tarjeta
    previewTitle.textContent = "";
    previewDescription.textContent = "";
    previewPrice.textContent = "$0.00";
    previewImage.src = "";
    previewCard.style.display = "none";
}

function eliminarProducto(id) {
    const todosLosProductos = [...productosEstaticos, ...productos];
    const productoAEliminar = todosLosProductos.find(p => p.id == id);

    // Verifica si encontró el producto
    if (!productoAEliminar) {
        console.error("Producto no encontrado con ID:", id);
        return;
    }

    Swal.fire({
        title: `¿Estás seguro de que quieres eliminar "${productoAEliminar.titulo}"?`,
        text: "¡Este producto será eliminado del carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#9AC76E",
        cancelButtonColor: "#D08159",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            productos = productos.filter(producto => producto.id != id);
            localStorage.setItem("productos", JSON.stringify(productos));
            listarProductos();

            Swal.fire({
                title: "¡Eliminado!",
                text: `"${productoAEliminar.titulo}" fue eliminado del carrito.`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}


// ----------------------------------------------------
// FUNCIONES DE VISTA PREVIA
// ----------------------------------------------------

/**
 * Actualiza la vista previa de la tarjeta con los datos del formulario.
 */
function actualizarVistaPrevia() {
    const tituloVal = document.getElementById("titulo-form").value;
    const descVal = document.getElementById("descripcion-form").value;
    const precioVal = parseFloat(document.getElementById("precio-form").value);
    const imagenInput = document.getElementById("imagen-form");

    if (tituloVal || descVal || !isNaN(precioVal) || imagenInput.files.length > 0) {
        previewCard.style.display = 'block';
    } else {
        previewCard.style.display = 'none';
        return;
    }

    previewTitle.textContent = tituloVal;
    previewDescription.textContent = descVal;
<<<<<<< HEAD
    previewPrice.textContent = `$${isNaN(precioVal) ? '0.00' : precioVal.toFixed(2)}`;
=======
    previewPrice.textContent = `$${isNaN(precioVal) ? '0.00' : precioVal.toFixed(3)}`;
>>>>>>> JohanaUsaquen

    if (imagenInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.alt = tituloVal;
        };
        reader.readAsDataURL(imagenInput.files[0]);
    } else if (document.getElementById("preview").src) {
        previewImage.src = document.getElementById("preview").src;
        previewImage.alt = tituloVal;
    } else {
        previewImage.src = "";
        previewImage.alt = "";
    }
}

// ----------------------------------------------------
// FUNCIONES para las barras de progreso
// ----------------------------------------------------

function actualizarBarraDeProgreso(inputElement, barElement) {
    let valor = parseInt(inputElement.value);

    if (isNaN(valor) || valor < 0 || valor > 100) {
        valor = 0;
    }

    barElement.style.width = valor + '%';
    barElement.setAttribute('aria-valuenow', valor);
    barElement.textContent = valor + '%';
}

// ----------------------------------------------------
// EVENT LISTENERS
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    listarProductos();
    mostrarVista('vista-listado');

    // Referencias a los campos de entrada y barras de progreso
    const energiaInput = document.getElementById('energia-form');
    const energiaBar = document.getElementById('energia-bar');
    const carbohidratosInput = document.getElementById('carbohidratos-form');
    const carbohidratosBar = document.getElementById('carbohidratos-bar');
    const fibraInput = document.getElementById('fibra-form');
    const fibraBar = document.getElementById('fibra-bar');
    const aguaInput = document.getElementById('agua-form');
    const aguaBar = document.getElementById('agua-bar');

    // Event listeners para los campos de entrada
    energiaInput.addEventListener('input', () => actualizarBarraDeProgreso(energiaInput, energiaBar));
    carbohidratosInput.addEventListener('input', () => actualizarBarraDeProgreso(carbohidratosInput, carbohidratosBar));
    fibraInput.addEventListener('input', () => actualizarBarraDeProgreso(fibraInput, fibraBar));
    aguaInput.addEventListener('input', () => actualizarBarraDeProgreso(aguaInput, aguaBar));
});

// Event listeners para la navegación
btnVerProductos.addEventListener('click', () => {
    listarProductos();
    mostrarVista('vista-listado');
});

btnAgregarProducto.addEventListener('click', () => {
    limpiarFormulario();
    mostrarVista('vista-formulario');
    actualizarVistaPrevia(); // Se asegura de que la tarjeta se oculte al iniciar
});

// Event listener para el formulario
formulario.addEventListener("submit", guardarProducto);
btnEliminarTodos.addEventListener('click', eliminarTodosLosProductos);

function eliminarTodosLosProductos() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Todos los productos personalizados serán eliminados!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#9AC76E",
        cancelButtonColor: "#D08159",
        confirmButtonText: "Sí, eliminar todos",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            productos = []; // Solo elimina los del localStorage, los estáticos se mantienen
            localStorage.removeItem("productos"); // Elimina del almacenamiento
            listarProductos(); // Actualiza la lista en pantalla

            Swal.fire({
                title: "¡Eliminados!",
                text: "Todos los productos fueron eliminados.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}


// Event listeners que activan la vista previa
document.getElementById("titulo-form").addEventListener('input', actualizarVistaPrevia);
document.getElementById("descripcion-form").addEventListener('input', actualizarVistaPrevia);
document.getElementById("precio-form").addEventListener('input', actualizarVistaPrevia);
document.getElementById("imagen-form").addEventListener('change', actualizarVistaPrevia);