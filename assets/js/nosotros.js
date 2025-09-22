function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    document.getElementById('prevBtn').classList.toggle('disabled', index === 0);
    document.getElementById('nextBtn').classList.toggle('disabled', index === slides.length - 1);
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("../partials/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
        fetch('../assets/js/auth.js')
            .then(res => res.text())
            .then(jsCode => {
                const script = document.createElement("script");
                script.textContent = jsCode; // Inserta el código como texto
                document.body.appendChild(script);
            })
            .catch(err => console.error("Error cargando auth.js:", err));
        // Inicializamos el contador al cargar el navbar
        actualizarContadorCarrito();
    });
    // fetch("../partials/navbar.html")
    //     .then(res => res.text())
    //     .then(data => {
    //         document.getElementById("navbar").innerHTML = data;

    //         // Re inicializa dropdowns, collapse y demás
    //         const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    //         [...dropdownTriggerList].map(el => new bootstrap.Dropdown(el));
    //     });
});



fetch('../partials/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });


// fetch("../../components/modalCarrito/modalCarritol.html")
//     .then(res => res.text())
//     .then(html => {
//         document.getElementById("modalContainer").innerHTML = html;
//     });

// function setupCartButton() {
//     document.getElementById("cartButton").addEventListener("click", function (e) {
//         e.preventDefault();
//         document.getElementById("cartModal").style.display = "block";
//     });

//     document.querySelector("#cartModal .close").addEventListener("click", function () {
//         document.getElementById("cartModal").style.display = "none";
//     });
// }
