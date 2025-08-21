document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  const correoRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  const telefonoRegex = /^\\d{7,15}$/;

  if (!nombre || !correoRegex.test(correo) || !telefonoRegex.test(telefono) || !mensaje) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  // Enviar formulario
  this.submit();
});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nuevoMensaje = {
      nombre: form.nombre.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      mensaje: form.mensaje.value,
      fecha: new Date().toISOString()
    };

    let mensajesGuardados = JSON.parse(localStorage.getItem("formContacto"));

    if (!Array.isArray(mensajesGuardados)) {
      mensajesGuardados = mensajesGuardados ? [mensajesGuardados] : [];
    }

    mensajesGuardados.push(nuevoMensaje);

    localStorage.setItem("formContacto", JSON.stringify(mensajesGuardados));

    Swal.fire({
      title: "¡Envíado!",
      text: "Gracias por tu mensaje. Te contactaremos pronto.",
      icon: "success",
      didOpen: () => {
        $(".swal2-popup").draggable({ handle: ".swal2-title" });
      }
    });

    form.reset();
  });
});

fetch("../../components/navbar/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });

fetch('../../components/footer/footer.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('footer').innerHTML = data;
});