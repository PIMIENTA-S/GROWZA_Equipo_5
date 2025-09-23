// admin.js

// ----------------------------------------------------
// PRODUCTOS ESTÁTICOS (de prueba)
// ----------------------------------------------------
const productosEstaticos = [
    { titulo: "Brocoli", descripcion: "El brócoli, superalimento crucífero, pariente de la coliflor y la col.", precio: 7995, imagen: "/assets/img/brocoli.webp", categoria: "Verduras", id_producto: 'static-1' },
    { titulo: "Espinaca", descripcion: "La espinaca es una planta anual de la familia de las amarantáceas.", precio: 5980, imagen: "/assets/img/espinaca.webp", categoria: "Verduras", id_producto: 'static-2' },
    { titulo: "Zanahoria", descripcion: "La zanahoria es una hortaliza versátil y deliciosa para consumir.", precio: 2840, imagen: "/assets/img/zanahoria.webp", categoria: "Verduras", id_producto: 'static-3' },
    { titulo: "Aguacate", descripcion: "El aguacate Hass impulsó las exportaciones de tres departamentos del país.", precio: 6390, imagen: "/assets/img/aguacate.webp", categoria: "Verduras", id_producto: 'static-4' },
    { titulo: "Manzana", descripcion: "La manzana o poma​ es la fruta comestible de la especie Malus domestica.", precio: 7559, imagen: "/assets/img/manzana.webp", categoria: "Frutas", id_producto: 'static-5' },
    { titulo: "Banano", descripcion: "El banano es una fruta tropical dulce de la planta Musa con pulpa suave.", precio: 1890, imagen: "/assets/img/banano.webp", categoria: "Frutas", id_producto: 'static-6' },
    { titulo: "Arándanos", descripcion: "Los arándanos son frutos pequeños, bayas de la especie Vaccinium.", precio: 7490, imagen: "/assets/img/arandanos.webp", categoria: "Frutas", id_producto: 'static-7' },
    { titulo: "Fresa", descripcion: "La fresa es un género de plantas rastreras estoloníferas de la familia Rosaceae.", precio: 6980, imagen: "/assets/img/fresas.webp", categoria: "Frutas", id_producto: 'static-8' },
    { titulo: "Agua de Coco", descripcion: "Líquido que se encuentra de forma natural en el hoyo interior del coco.", precio: 6500, imagen: "/assets/img/aguaCoco.webp", categoria: "Bebidas", id_producto: 'static-9' },
    { titulo: "Jugo Verde", descripcion: "Contribuye a mejor digestión, sistema inmunológico fuerte y desintoxicar el organismo.", precio: 9000, imagen: "/assets/img/jugoVerde.webp", categoria: "Bebidas", id_producto: 'static-10' }
];

// ----------------------------------------------------
// ELEMENTOS DEL DOM
// ----------------------------------------------------
const formulario = document.getElementById("formulario");
const idProductoOculto = document.getElementById("id-producto-oculto");
const listaProductosContainer = document.getElementById("lista-productos");
const btnGuardar = document.getElementById("btn-guardar");
const previewCard = document.getElementById("preview-card");
const previewImage = previewCard.querySelector(".card-img-top");
const previewTitle = previewCard.querySelector(".card-title strong");
const previewDescription = previewCard.querySelector(".card-text");
const previewPrice = previewCard.querySelector("h3");
const vistaListado = document.getElementById('vista-listado');
const vistaFormulario = document.getElementById('vista-formulario');
const btnVerProductos = document.getElementById('btn-ver-productos');
const btnAgregarProducto = document.getElementById('btn-agregar-producto');
const btnEliminarTodos = document.getElementById('btn-eliminar-todos');

const API_BASE_URL = 'http://localhost:8080/growza/productos';
const API_CATEGORIES_URL = 'http://localhost:8080/growza/categorias';

let categoriasDisponibles = [];

// ----------------------------------------------------
// FUNCIONES DE VISTA PREVIA (colocada arriba 👀)
// ----------------------------------------------------
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
    previewPrice.textContent = `$${isNaN(precioVal) ? '0.00' : precioVal.toFixed(3)}`;

    if (imagenInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = e => { previewImage.src = e.target.result; previewImage.alt = tituloVal; };
        reader.readAsDataURL(imagenInput.files[0]);
    } else if (document.getElementById("preview").src && document.getElementById("preview").style.display !== "none") {
        previewImage.src = document.getElementById("preview").src;
        previewImage.alt = tituloVal;
    } else {
        previewImage.src = "";
        previewImage.alt = "";
    }
}

// ----------------------------------------------------
// FUNCIONES DE NAVEGACIÓN
// ----------------------------------------------------
function mostrarVista(vistaId) {
    vistaListado.style.display = 'none';
    vistaFormulario.style.display = 'none';
    document.getElementById(vistaId).style.display = 'block';
}

// ----------------------------------------------------
// FUNCIONES DE CRUD - CONECTADO AL BACKEND
// ----------------------------------------------------
function getAuthHeaders() {
    const token = localStorage.getItem("jwt");
    if (!token || token === "token-admin-fake") {
        return { "Content-Type": "application/json" };
    }
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

async function guardarProducto(event) {
    event.preventDefault();

    const idProducto = document.getElementById("id-producto-oculto").value;
    const titulo = document.getElementById("titulo-form").value;
    const idCategoria = document.getElementById("categoria-form").value;
    const descripcion = document.getElementById("descripcion-form").value;
    const precio = document.getElementById("precio-form").value;
    const imagenInput = document.getElementById("imagen-form").files;

    const formData = new FormData();
    formData.append("nombreProducto", titulo);
    formData.append("descripcion", descripcion);
    formData.append("precio", parseFloat(precio));
    formData.append("stock", 10);
    formData.append("idCategoria", parseInt(idCategoria));

    if (imagenInput.length > 0) {
        formData.append("imagen", imagenInput[0]); // 👈 archivo real, no base64
    }

    let url = `${API_BASE_URL}/crearProductoCategoria`;
    let method = "POST";
    let mensaje = `"${titulo}" fue agregado correctamente.`;

    if (idProducto) {
        url = `${API_BASE_URL}/${idProducto}`;
        method = "PUT";
        mensaje = `"${titulo}" fue actualizado correctamente.`;
        formData.append("id_producto", idProducto);
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}` // 👈 ojo, no pongas Content-Type
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        limpiarFormulario();
        listarProductos();
        mostrarVista("vista-listado");

        Swal.fire({
            title: "¡Éxito!",
            text: mensaje,
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });
    } catch (error) {
        console.error("Error al guardar el producto:", error);
        Swal.fire({
            title: "¡Error!",
            text: `Hubo un problema al guardar el producto: ${error.message}.`,
            icon: "error",
            timer: 3000,
            showConfirmButton: false
        });
    }
}


async function listarProductos() {
    listaProductosContainer.innerHTML = '';

    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Error al obtener los productos del servidor.');
        const productosDesdeBD = await response.json();

        const productosTotales = [...productosEstaticos, ...productosDesdeBD];

        if (productosTotales.length === 0) {
            listaProductosContainer.innerHTML = '<p class="text-center text-muted">No hay productos para mostrar.</p>';
            return;
        }

        productosTotales.forEach(producto => {
            const productRow = document.createElement("div");
            productRow.classList.add("d-flex", "justify-content-between", "align-items-center", "my-2", "border", "rounded", "p-2");

            const imagenSrc = producto.imagen_url || producto.imagen;
            const tituloProd = producto.nombre_producto || producto.titulo;
            const idProd = producto.id_producto || producto.id;

            productRow.innerHTML = `
                <img src="${imagenSrc}" alt="${tituloProd}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 15px;">
                <div class="flex-grow-1">
                    <h5 class="mb-0">${tituloProd}</h5>
                    <p class="text-muted mb-0">${producto.categoria?.nombre_categoria || producto.categoria || 'Sin categoría'}</p>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="cargarProductoParaEditar('${idProd}')">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto('${idProd}')">Eliminar</button>
                </div>
            `;
            listaProductosContainer.appendChild(productRow);
        });

    } catch (error) {
        console.error("Error al listar productos:", error);
        listaProductosContainer.innerHTML = '<p class="text-center text-danger">Error al cargar los productos. Inténtalo de nuevo más tarde.</p>';
    }
}

async function cargarCategorias() {
    try {
        const response = await fetch(API_CATEGORIES_URL);
        if (!response.ok) throw new Error('Error al cargar las categorías.');
        categoriasDisponibles = await response.json();
        const categoriaSelect = document.getElementById("categoria-form");
        categoriaSelect.innerHTML = '<option value="">Selecciona una categoría</option>';
        categoriasDisponibles.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id_categoria;
            option.textContent = cat.nombre_categoria;
            categoriaSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error cargando categorías:", error);
        Swal.fire({
            title: "¡Error!",
            text: "No se pudieron cargar las categorías. Inténtalo de nuevo.",
            icon: "error",
            timer: 3000,
            showConfirmButton: false
        });
    }
}

async function cargarProductoParaEditar(id) {
    if (id.startsWith('static-')) {
        Swal.fire("Info", "No se pueden editar productos estáticos.", "info");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado.");
        const productoAEditar = await response.json();

        document.getElementById("id-producto-oculto").value = productoAEditar.id_producto;
        document.getElementById("titulo-form").value = productoAEditar.nombre_producto;
        document.getElementById("categoria-form").value = productoAEditar.categoria?.id_categoria || "";
        document.getElementById("descripcion-form").value = productoAEditar.descripcion;
        document.getElementById("precio-form").value = productoAEditar.precio;

        const previewImg = document.getElementById("preview");
        previewImg.src = productoAEditar.imagen_url;
        previewImg.style.display = "block";

        btnGuardar.textContent = "Actualizar Producto";
        mostrarVista('vista-formulario');
        actualizarVistaPrevia();
    } catch (error) {
        console.error("Error al cargar el producto para editar:", error);
        Swal.fire({
            title: "¡Error!",
            text: "No se pudo cargar la información del producto.",
            icon: "error",
            timer: 3000,
            showConfirmButton: false
        });
    }
}

function limpiarFormulario() {
    formulario.reset();
    document.getElementById("id-producto-oculto").value = "";
    btnGuardar.textContent = "Guardar Producto";
    document.getElementById("preview").style.display = "none";
    previewCard.style.display = "none";
}

async function eliminarProducto(id) {
    if (id.startsWith('static-')) {
        Swal.fire("Info", "No se pueden eliminar productos estáticos.", "info");
        return;
    }
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Este producto será eliminado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#9AC76E",
        cancelButtonColor: "#D08159",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${await response.text()}`);
                }

                listarProductos();
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "El producto fue eliminado correctamente.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                Swal.fire({
                    title: "¡Error!",
                    text: `Hubo un problema al eliminar el producto: ${error.message}.`,
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        }
    });
}

// ----------------------------------------------------
// EVENT LISTENERS
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
    await cargarCategorias();
    listarProductos();
    mostrarVista('vista-listado');
    formulario.addEventListener("submit", guardarProducto);
    btnEliminarTodos.addEventListener('click', () => Swal.fire("Info", "Endpoint /todos aún no implementado.", "info"));

    document.getElementById("titulo-form").addEventListener('input', actualizarVistaPrevia);
    document.getElementById("descripcion-form").addEventListener('input', actualizarVistaPrevia);
    document.getElementById("precio-form").addEventListener('input', actualizarVistaPrevia);
    document.getElementById("imagen-form").addEventListener('change', actualizarVistaPrevia);
    document.getElementById("categoria-form").addEventListener('change', actualizarVistaPrevia);
});

btnVerProductos.addEventListener('click', () => {
    listarProductos();
    mostrarVista('vista-listado');
});

btnAgregarProducto.addEventListener('click', () => {
    limpiarFormulario();
    mostrarVista('vista-formulario');
    actualizarVistaPrevia();
});
