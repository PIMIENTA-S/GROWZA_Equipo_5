// ----------------------------------------------------
// ADMIN CHECK
// ----------------------------------------------------
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "{}");
if (usuarioActivo.rol !== "admin") {
    alert("❌ Acceso denegado. Debes ser admin.");
    window.location.href = "/index.html";
}

// ----------------------------------------------------
// PRODUCTOS ESTÁTICOS (solo lectura)
// ----------------------------------------------------
const productosEstaticos = [
    { titulo: "Brocoli", descripcion: "El brócoli, superalimento...", precio: 7995, imagen: "/assets/img/brocoli.webp", categoria: "Verduras", id_producto: 'static-1' },
    { titulo: "Espinaca", descripcion: "La espinaca es una planta...", precio: 5980, imagen: "/assets/img/espinaca.webp", categoria: "Verduras", id_producto: 'static-2' },
    { titulo: "Zanahoria", descripcion: "La zanahoria es una hortaliza...", precio: 2840, imagen: "/assets/img/zanahoria.webp", categoria: "Verduras", id_producto: 'static-3' },
    { titulo: "Aguacate", descripcion: "El aguacate Hass impulsó...", precio: 6390, imagen: "/assets/img/aguacate.webp", categoria: "Verduras", id_producto: 'static-4' },
    { titulo: "Manzana", descripcion: "La manzana o poma​ es...", precio: 7559, imagen: "/assets/img/manzana.webp", categoria: "Frutas", id_producto: 'static-5' },
    { titulo: "Banano", descripcion: "El banano es una fruta tropical...", precio: 1890, imagen: "/assets/img/banano.webp", categoria: "Frutas", id_producto: 'static-6' },
    { titulo: "Arándanos", descripcion: "Los arándanos son frutos pequeños...", precio: 7490, imagen: "/assets/img/arandanos.webp", categoria: "Frutas", id_producto: 'static-7' },
    { titulo: "Fresa", descripcion: "La fresa es un género de plantas...", precio: 6980, imagen: "/assets/img/fresas.webp", categoria: "Frutas", id_producto: 'static-8' },
    { titulo: "Agua de Coco", descripcion: "Líquido que se encuentra en el coco...", precio: 6500, imagen: "/assets/img/aguaCoco.webp", categoria: "Bebidas", id_producto: 'static-9' },
    { titulo: "Jugo Verde", descripcion: "Contribuye a mejor digestión...", precio: 9000, imagen: "/assets/img/jugoVerde.webp", categoria: "Bebidas", id_producto: 'static-10' }
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
// AUTENTICACIÓN HEADER
// ----------------------------------------------------
function getAuthHeaders() {
    const token = localStorage.getItem("jwt") || "";
    return {
        "Authorization": `Bearer ${token}`
    };
}

// ----------------------------------------------------
// FUNCIONES DE VISTA PREVIA
// ----------------------------------------------------
function actualizarVistaPrevia() {
    const tituloVal = document.getElementById("titulo-form").value;
    const descVal = document.getElementById("descripcion-form").value;
    const precioVal = parseFloat(document.getElementById("precio-form").value);
    const imagenInput = document.getElementById("imagen-form");

    if (!tituloVal && !descVal && isNaN(precioVal) && imagenInput.files.length === 0) {
        previewCard.style.display = 'none';
        return;
    }
    previewCard.style.display = 'block';
    previewTitle.textContent = tituloVal;
    previewDescription.textContent = descVal;
    previewPrice.textContent = `$${isNaN(precioVal) ? '0.00' : precioVal.toFixed(3)}`;

    if (imagenInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = e => { previewImage.src = e.target.result; previewImage.alt = tituloVal; };
        reader.readAsDataURL(imagenInput.files[0]);
    } else {
        previewImage.src = "";
        previewImage.alt = "";
    }
}

// ----------------------------------------------------
// NAVEGACIÓN
// ----------------------------------------------------
function mostrarVista(vistaId) {
    vistaListado.style.display = 'none';
    vistaFormulario.style.display = 'none';
    document.getElementById(vistaId).style.display = 'block';
}

// ----------------------------------------------------
// CRUD PRODUCTOS
// ----------------------------------------------------let productosBackend = [];

async function listarProductos() {
    listaProductosContainer.innerHTML = '';
    try {
        const res = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
        if (res.ok) productosBackend = await res.json();
    } catch (error) {
        console.error("Error al cargar productos del backend:", error);
    }

    const productosTotales = [...productosEstaticos, ...productosBackend];

    if (productosTotales.length === 0) {
        listaProductosContainer.innerHTML = '<p class="text-center text-muted">No hay productos para mostrar.</p>';
        return;
    }

    productosTotales.forEach(producto => {
        const productRow = document.createElement("div");
        productRow.classList.add("d-flex", "justify-content-between", "align-items-center", "my-2", "border", "rounded", "p-2");

        const imagenSrc = producto.imagen_url ? `http://localhost:8080${producto.imagen_url}` : producto.imagen;
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
}

async function cargarCategorias() {
    try {
        const res = await fetch(API_CATEGORIES_URL, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error("Error al cargar categorías");
        categoriasDisponibles = await res.json();

        const selectCat = document.getElementById("categoria-form");
        selectCat.innerHTML = '<option value="">Selecciona una categoría</option>';
        categoriasDisponibles.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id_categoria;
            option.textContent = cat.nombre_categoria;
            selectCat.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudieron cargar las categorías.", "error");
    }
}

async function guardarProducto(event) {
    event.preventDefault();

    const idProducto = idProductoOculto.value;
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
    if (imagenInput.length > 0) formData.append("imagen", imagenInput[0]);

    let url = `${API_BASE_URL}/crearProductoCategoria`;
    let method = "POST";
    let mensaje = `"${titulo}" fue agregado correctamente.`;
    listarProductos(); 

    if (idProducto) {
        url = `${API_BASE_URL}/${idProducto}`;
        method = "PUT";
        mensaje = `"${titulo}" fue actualizado correctamente.`;
        formData.append("id_producto", idProducto);
    }

    try {
        const res = await fetch(url, { method, headers: { "Authorization": `Bearer ${localStorage.getItem("jwt")}` }, body: formData });
        if (!res.ok) throw new Error(await res.text());
        limpiarFormulario();
        listarProductos();
        mostrarVista("vista-listado");

        Swal.fire("¡Éxito!", mensaje, "success");
    } catch (error) {
        console.error(error);
        Swal.fire("Error", `No se pudo guardar el producto: ${error.message}`, "error");
    }
}

async function cargarProductoParaEditar(id) {
    if (id.startsWith('static-')) return Swal.fire("Info", "No se pueden editar productos estáticos.", "info");

    try {
        const res = await fetch(`${API_BASE_URL}/${id}`, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error("Producto no encontrado");
        const producto = await res.json();

        idProductoOculto.value = producto.id_producto;
        document.getElementById("titulo-form").value = producto.nombre_producto;
        document.getElementById("categoria-form").value = producto.categoria?.id_categoria || "";
        document.getElementById("descripcion-form").value = producto.descripcion;
        document.getElementById("precio-form").value = producto.precio;

        const previewImg = document.getElementById("preview");
        previewImg.src = producto.imagen_url;
        previewImg.style.display = "block";

        btnGuardar.textContent = "Actualizar Producto";
        mostrarVista('vista-formulario');
        actualizarVistaPrevia();
    } catch (error) {
        Swal.fire("Error", "No se pudo cargar el producto.", "error");
    }
}

function limpiarFormulario() {
    formulario.reset();
    idProductoOculto.value = "";
    btnGuardar.textContent = "Guardar Producto";
    document.getElementById("preview").style.display = "none";
    previewCard.style.display = "none";
}

async function eliminarProducto(id) {
    if (id.startsWith('static-')) return Swal.fire("Info", "No se pueden eliminar productos estáticos.", "info");

    const confirm = await Swal.fire({
        title: "¿Eliminar producto?",
        text: "¡Esta acción no se puede deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar"
    });

    if (confirm.isConfirmed) {
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE", headers: getAuthHeaders() });
            if (!res.ok) throw new Error(await res.text());
            listarProductos();
            Swal.fire("¡Eliminado!", "Producto eliminado correctamente.", "success");
        } catch (error) {
            Swal.fire("Error", `No se pudo eliminar el producto: ${error.message}`, "error");
        }
    }
}

// ----------------------------------------------------
// EVENT LISTENERS
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
    await cargarCategorias();
    listarProductos();
    mostrarVista('vista-listado');

    formulario.addEventListener("submit", guardarProducto);

    document.getElementById("titulo-form").addEventListener('input', actualizarVistaPrevia);
    document.getElementById("descripcion-form").addEventListener('input', actualizarVistaPrevia);
    document.getElementById("precio-form").addEventListener('input', actualizarVistaPrevia);
    document.getElementById("imagen-form").addEventListener('change', actualizarVistaPrevia);
    document.getElementById("categoria-form").addEventListener('change', actualizarVistaPrevia);

    btnVerProductos.addEventListener('click', () => { listarProductos(); mostrarVista('vista-listado'); });
    btnAgregarProducto.addEventListener('click', () => { limpiarFormulario(); mostrarVista('vista-formulario'); actualizarVistaPrevia(); });
    btnEliminarTodos.addEventListener('click', () => Swal.fire("Info", "Función eliminar todos aún no implementada.", "info"));
});
