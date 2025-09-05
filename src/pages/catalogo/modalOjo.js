// modal.js

// Escucha el evento 'show.bs.modal' de Bootstrap
const modalElement = document.getElementById('exampleModal');

modalElement.addEventListener('show.bs.modal', function (event) {
    // Botón que activó el modal
    const button = event.relatedTarget;

    // Obtener la información de los atributos data-*
    const titulo = button.getAttribute('data-titulo');
    const imagen = button.getAttribute('data-imagen');
    const energia = button.getAttribute('data-energia');
    const carbohidratos = button.getAttribute('data-carbohidratos');
    const fibra = button.getAttribute('data-fibra');
    const agua = button.getAttribute('data-agua');
    const datoCurioso = button.getAttribute('data-dato-curioso');
    
    // Obtener los elementos HTML del modal
    const modalImage = modalElement.querySelector('.modal-body img');
    const modalTitle = modalElement.querySelector('.modal-body .card-title');
    const modalDatoCurioso = modalElement.querySelector('.modal-body p small'); // Selector más específico

    // Actualizar el contenido del modal
    modalImage.src = imagen;
    modalTitle.textContent = titulo;
    modalDatoCurioso.textContent = datoCurioso;

    // Actualizar las barras de progreso dinámicamente
    // Seleccionamos los elementos de las barras por su ID
    const energiaFill = modalElement.querySelector('#energia-fill');
    const carbohidratosFill = modalElement.querySelector('#carbohidratos-fill');
    const fibraFill = modalElement.querySelector('#fibra-fill');
    const aguaFill = modalElement.querySelector('#agua-fill');

    // Cambiamos el estilo 'width' de cada barra con los porcentajes
    if (energiaFill) energiaFill.style.width = energia + '%';
    if (carbohidratosFill) carbohidratosFill.style.width = carbohidratos + '%';
    if (fibraFill) fibraFill.style.width = fibra + '%';
    if (aguaFill) aguaFill.style.width = agua + '%';
});