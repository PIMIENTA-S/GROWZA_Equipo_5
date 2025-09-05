let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const nombre = document.getElementById("inputnombre");
const apellido = document.getElementById("inputapellido");
const direccion = document.getElementById("inputdireccion");
const email = document.getElementById("inputemail");
const contraseña = document.getElementById("inputcontraseña");
const btnRegistrar = document.getElementById("btn-registrar");
const contendoralerta = document.getElementById("alerta-container")

function mostrarAlerta (mensaje, tipo = "danger"){
    contendoralerta.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show p-2" role="alert">
            ${mensaje}
            <button type="button" class="btn-close p-3" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
}

function validarEmail (email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function registrar(e){
    e.preventDefault();

    if(!nombre.value.trim() || !apellido.value.trim() || !direccion.value.trim()){
        mostrarAlerta("Todos los campos son obligatorios","danger");
        return
    }

    if(contraseña.value.length < 8){
        mostrarAlerta("La contraseña debe tener al menos 8 caracteres","warning");
        return;
    }

    const existente = usuarios.find(u => u.email.value);
    if(existente){
        mostrarAlerta("Ese correo ya se encuentra registrado","danger");
        return;
    }

    const usuario = {
        Nombre: nombre.value,
        Apellido: apellido.value,
        Direccion: direccion.value,
        Email: email.value,
        Contraseña: contraseña.value
    };

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarAlerta("Usuario registrado correctamente","success");

    nombre.value = "";
    apellido.value = "";
    direccion.value = "";
    email.value = "";
    contraseña.value = "";

};

btnRegistrar.addEventListener("click", registrar);