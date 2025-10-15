// ----------------------------------------------------
// ADMIN CHECK
// ----------------------------------------------------
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "{}");
if (usuarioActivo.rol !== "admin") {
    alert("Acceso denegado. Debes ser admin.");
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
const listaUsuariosContainer = document.getElementById("lista-usuarios");
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
const vistaListadoUsuarios = document.getElementById('vista-listado-usuarios');
const btnVerUsuarios = document.getElementById('btn-ver-usuarios');

const API_BASE_URL = 'http://localhost:8080/growza/productos';
const API_CATEGORIES_URL = 'http://localhost:8080/growza/categorias';
const API_USERS_URL = 'http://localhost:8080/growza/usuarios';

let categoriasDisponibles = [];
let productosBackend = [];
let usuarios = [];
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
    vistaListadoUsuarios.style.display = 'none';
    document.getElementById(vistaId).style.display = 'block';
}

// ----------------------------------------------------
// CRUD PRODUCTOS
// ----------------------------------------------------

async function listarProductos() {
    listaProductosContainer.innerHTML = '';
    productosBackend = []; // Limpiar para evitar duplicados en cada carga
    try {
        const res = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
        if (res.ok) {
            productosBackend = await res.json();
        } else {
            console.warn("No se pudieron cargar los productos del backend. Usando estáticos.");
        }
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
                <button class="btn btn-sm edit" onclick="cargarProductoParaEditar('${idProd}')">Editar</button>
                <button class="btn btn-sm delete" onclick="eliminarProducto('${idProd}')">Eliminar</button>
            </div>
        `;
        listaProductosContainer.appendChild(productRow);
    });
}

// Listar Usuarios 
async function listarUsuarios() {
    listaUsuariosContainer.innerHTML = '';
    usuarios = []; // Limpiar para evitar duplicados en cada carga
    try {
        // Petición al endpoint de usuarios
        const res = await fetch(API_USERS_URL, { headers: getAuthHeaders() });

        if (res.ok) {
            usuarios = await res.json();
        } else {
            console.warn("No se pudieron cargar los usuarios del backend.");
            listaUsuariosContainer.innerHTML = '<p class="text-center text-danger">Error al cargar usuarios desde el backend.</p>';
            return;
        }
    } catch (error) {
        console.error("Error al cargar usuarios del backend:", error);
        listaUsuariosContainer.innerHTML = '<p class="text-center text-danger">Error de conexión al API de usuarios.</p>';
        return;
    }

    if (usuarios.length === 0) {
        listaUsuariosContainer.innerHTML = '<p class="text-center text-muted">No hay usuarios para mostrar.</p>';
        return;
    }

    // Crear el listado de usuarios
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-hover', 'mt-3');
    table.innerHTML = `
        <thead class="table-user">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Correo</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody id="usuarios-table-body">
        </tbody>
    `;
    listaUsuariosContainer.appendChild(table);
    const tableBody = document.getElementById('usuarios-table-body');

    usuarios.forEach(usuario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${usuario.id_usuario || usuario.id}</td>
            <td>${usuario.nombre || 'N/A'}</td>
            <td>${usuario.apellido || 'N/A'}</td>
            <td>${usuario.correo || 'N/A'}</td>
            <td>
                <button class="btn btn-sm delete-user" onclick="eliminarUsuario('${usuario.id_usuario || usuario.id}')">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function cargarCategorias() {
    try {
        const res = await fetch(API_CATEGORIES_URL, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error("Error al cargar categorías");
        categoriasDisponibles = await res.json();

        const selectCat = document.getElementById("categoria-form");
        if (!selectCat) {
            console.error("HTML Error: Elemento con id='categoria-form' no encontrado.");
            return; 
        }

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
    const stock = 10;
    const imagenInput = document.getElementById("imagen-form").files;

    const token = localStorage.getItem("jwt");
    if (!token) {
        Swal.fire("Error", "No autorizado. Por favor, inicia sesión.", "error");
        return;
    }

    const formData = new FormData();
    formData.append("nombreProducto", titulo);
    formData.append("descripcion", descripcion);
    formData.append("precio", parseFloat(precio));
    formData.append("stock", stock);
    formData.append("idCategoria", parseInt(idCategoria));
    if (imagenInput.length > 0) {
        formData.append("imagen", imagenInput[0]);
    }

    let url;
    let method;
    let mensaje;

    if (idProducto) {
        url = `${API_BASE_URL}/${idProducto}`;
        method = "PUT";
        mensaje = `"${titulo}" fue actualizado correctamente.`;
    } else {
        url = `${API_BASE_URL}/crearProductoCategoria`;
        method = "POST";
        mensaje = `"${titulo}" fue agregado correctamente.`;
    }

    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText);
        }

        limpiarFormulario();
        await listarProductos();
        mostrarVista("vista-listado");
        Swal.fire("¡Éxito!", mensaje, "success");
    } catch (error) {
        console.error("Error al guardar producto:", error);
        Swal.fire("Error", `No se pudo guardar el producto: ${error.message}`, "error");
    }
}


async function cargarProductoParaEditar(id) {
    if (id.startsWith('static-')) return Swal.fire("Info", "No se pueden editar productos estáticos.", "info");

    try {
        const res = await fetch(`${API_BASE_URL}/${id}`, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error("Producto no encontrado");
        const producto = await res.json();

        // 1. Cargar datos del formulario
        idProductoOculto.value = producto.id_producto;
        document.getElementById("titulo-form").value = producto.nombre_producto;
        document.getElementById("categoria-form").value = producto.categoria?.id_categoria || "";
        document.getElementById("descripcion-form").value = producto.descripcion;
        document.getElementById("precio-form").value = producto.precio;

        previewImage.src = producto.imagen_url ? `http://localhost:8080${producto.imagen_url}` : producto.imagen;
        
        btnGuardar.textContent = "Actualizar Producto";
        mostrarVista('vista-formulario');
        
        // 4. Asegurarnos de que la card se muestre
        actualizarVistaPrevia(); 
        
    } catch (error) {
        console.error("Error al cargar producto para editar:", error);
        Swal.fire("Error", "No se pudo cargar el producto.", "error");
    }
}

// CÓDIGO RECOMENDADO PARA limpiarFormulario
function limpiarFormulario() {
    formulario.reset();
    idProductoOculto.value = "";
    btnGuardar.textContent = "Guardar Producto";
    
    // Limpia la imagen de la card de preview
    if (previewImage) { 
        previewImage.src = "";
        previewImage.alt = "";
    }
    
    previewCard.style.display = "none";
}

async function eliminarProducto(id) {
    if (id.startsWith('static-')) return Swal.fire("Info", "No se pueden eliminar productos estáticos.", "info");

    const confirmacion = await Swal.fire({
        title: "¿Eliminar producto?",
        text: "¡Esta acción no se puede deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (confirmacion.isConfirmed) {
        try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders()
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }
            await listarProductos();
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

    // Event Listeners de navegación (Actualizados)
    btnVerProductos.addEventListener('click', () => { listarProductos(); mostrarVista('vista-listado'); });

    // ¡NUEVO EVENT LISTENER PARA VER USUARIOS!
    btnVerUsuarios.addEventListener('click', () => { listarUsuarios(); mostrarVista('vista-listado-usuarios'); });


    btnVerProductos.addEventListener('click', () => { listarProductos(); mostrarVista('vista-listado'); });
    btnAgregarProducto.addEventListener('click', () => { limpiarFormulario(); mostrarVista('vista-formulario'); actualizarVistaPrevia(); });
});
