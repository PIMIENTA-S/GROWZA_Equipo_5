(function () {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    const loginItem = document.getElementById("loginItem");
    const registerItem = document.getElementById("registerItem");
    const userPanel = document.getElementById("user-panel");

    if (usuarioActivo) {
        if (loginItem) loginItem.style.display = "none";
        if (registerItem) registerItem.style.display = "none";
        if (userPanel) userPanel.style.display = "block";
    } else {
        if (loginItem) loginItem.style.display = "block";
        if (registerItem) registerItem.style.display = "block";
        if (userPanel) userPanel.style.display = "none";
    }
})();

document.getElementById("cerrarSesionNavbar")?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioActivo");
    window.location.href = "/index.html";
});