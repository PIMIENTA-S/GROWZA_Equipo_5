// (function () {
//     const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

//     const loginItem = document.getElementById("loginItem");
//     const registerItem = document.getElementById("registerItem");
//     const userPanel = document.getElementById("user-panel");

//     if (usuarioActivo) {
//         if (loginItem) loginItem.style.display = "none";
//         if (registerItem) registerItem.style.display = "none";
//         if (userPanel) userPanel.style.display = "block";
//     } else {
//         if (loginItem) loginItem.style.display = "block";
//         if (registerItem) registerItem.style.display = "block";
//         if (userPanel) userPanel.style.display = "none";
//     }
// })();

// document.getElementById("cerrarSesionNavbar")?.addEventListener("click", (e) => {
//     e.preventDefault();
//     localStorage.removeItem("usuarioActivo");
//     window.location.href = "/index.html";
// });

function checkAdminAccess() {
    const adminLinkItem = document.getElementById("adminLinkItem");
    
    if (!adminLinkItem) return;

    const userActiveData = localStorage.getItem("usuarioActivo");

    // Ocultar por defecto
    adminLinkItem.classList.add("d-none");

    if (userActiveData) {
        try {
            const usuarioActivo = JSON.parse(userActiveData);
            
            // Si el rol es 'admin', lo mostramos.
            if (usuarioActivo && usuarioActivo.rol === "admin") {
                adminLinkItem.classList.remove("d-none");
                console.log("[auth] Opción Admin mostrada.");
            }
        } catch (error) {
            console.error("[auth] Error al parsear usuarioActivo de localStorage:", error);
        }
    }
}



(function () {
    const token = localStorage.getItem("jwt");

    const loginItem = document.getElementById("loginItem");
    const registerItem = document.getElementById("registerItem");
    const userPanel = document.getElementById("user-panel");

    if (token) {
        if (loginItem) loginItem.style.display = "none";
        if (registerItem) registerItem.style.display = "none";
        if (userPanel) userPanel.style.display = "block";
    } else {
        if (loginItem) loginItem.style.display = "block";
        if (registerItem) registerItem.style.display = "block";
        if (userPanel) userPanel.style.display = "none";
    }

    checkAdminAccess(); 
})();

document.getElementById("cerrarSesionNavbar")?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    
    // 💡 CORRECCIÓN CLAVE: Eliminar el rol de usuario
    localStorage.removeItem("usuarioActivo"); 
    
    window.location.href = "/index.html";
});