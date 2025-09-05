// admin.js
// Inicializa el array de productos desde localStorage
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Obtiene los elementos del formulario
const titulo = document.getElementById("titulo-form");
const categoria = document.getElementById("categoria-form");
const imagen = document.getElementById("imagen-form");
const descripcion = document.getElementById("descripcion-form");

// Nuevos campos para los valores nutricionales y el dato curioso
const energia = document.getElementById("energia-form");
const carbohidratos = document.getElementById("carbohidratos-form");
const fibra = document.getElementById("fibra-form");
const agua = document.getElementById("agua-form");
const datoCurioso = document.getElementById("dato-curioso-form");

// Obtiene los botones
const btnGuardar = document.getElementById("btn-guardar");
const btnEliminar = document.getElementById("btn-eliminar");

/**
 * Guarda un nuevo producto en localStorage con toda su información.
 */
function guardarProducto() {
    const file = imagen.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        // Crea el objeto producto con todos los datos del formulario
        const producto = {
            titulo: titulo.value,
            categoria: categoria.value,
            imagen: event.target.result,
            descripcion: descripcion.value,
            // Nuevos campos para el modal
            energia: energia.value,
            carbohidratos: carbohidratos.value,
            fibra: fibra.value,
            agua: agua.value,
            datoCurioso: datoCurioso.value
        };

        // Agrega el nuevo producto al array y lo guarda en localStorage
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));

        console.log("productos agregados: ", JSON.stringify(productos, null, 2));

        // Limpia todos los campos del formulario
        titulo.value = "";
        categoria.value = "Selecciona una categoria";
        imagen.value = "";
        descripcion.value = "";
        energia.value = "";
        carbohidratos.value = "";
        fibra.value = "";
        agua.value = "";
        datoCurioso.value = "";
    };

    // Si hay un archivo, lee la imagen; de lo contrario, no hace nada
    if (file) {
        reader.readAsDataURL(file);
    }
}

/**
 * Elimina todos los productos de localStorage.
 */
function eliminarProducto(){
    productos = [];
    localStorage.removeItem("productos");
    console.log("se eliminaron los productos");
}

// Asocia las funciones a los eventos de los botones
btnGuardar.addEventListener("click", guardarProducto);
btnEliminar.addEventListener("click", eliminarProducto);