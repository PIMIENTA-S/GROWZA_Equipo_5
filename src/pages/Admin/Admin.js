let productos = JSON.parse(localStorage.getItem("productos")) || [];
const titulo = document.getElementById("titulo-form");
const categoria = document.getElementById("categoria-form");
const imagen = document.getElementById("imagen-form");
const descripcion = document.getElementById("descripcion-form");
const btnGuardar = document.getElementById("btn-guardar");
const btnEliminar = document.getElementById("btn-eliminar");

function guardarProducto() {
    const file = imagen.files[0]; 
    const reader = new FileReader();

    reader.onload = function(event) {  
        const producto = {
            titulo: titulo.value,
            categoria: categoria.value,
            imagen: event.target.result, 
            descripcion: descripcion.value
        };

        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));

        console.log("productos agregados: ", JSON.stringify(productos, null, 2));


        titulo.value = "";
        categoria.value = "Selecciona una categoria";
        imagen.value = "";
        descripcion.value = "";
    };

    if(file) {
        reader.readAsDataURL(file);
    }
}


function eliminarProducto(){
    productos = [];
    localStorage.removeItem("productos");
    console.log("se eliminaron los productos");

}

btnGuardar.addEventListener("click", guardarProducto);
btnEliminar.addEventListener("click", eliminarProducto);
