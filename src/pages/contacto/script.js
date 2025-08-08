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
