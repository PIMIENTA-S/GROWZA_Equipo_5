// const productos = [
//   {
//     nombre: "Zanahoria",
//     descripcion: "Rica en vitamina A y antioxidantes.",
//     calorias: "41 kcal",
//     img: "https://i.ibb.co/m4yX7bG/zanahoria.jpg"
//   },
//   {
//     nombre: "Brócoli",
//     descripcion: "Fuente de fibra, hierro y calcio.",
//     calorias: "55 kcal",
//     img: "https://i.ibb.co/znK5Xyc/brocoli.jpg"
//   },
//   {
//     nombre: "Manzana",
//     descripcion: "Fruta rica en fibra y antioxidantes.",
//     calorias: "52 kcal",
//     img: "manzana.jpg"
//   },
//   {
//     nombre: "Naranja",
//     descripcion: "Excelente fuente de vitamina C.",
//     calorias: "47 kcal",
//     img: "https://i.ibb.co/fQ4p7Mh/naranja.jpg"
//   },
//   {
//     nombre: "Espinaca",
//     descripcion: "Contiene hierro, vitaminas A y C.",
//     calorias: "23 kcal",
//     img: "https://i.ibb.co/wwT0jRr/espinaca.jpg"
//   },
//   {
//     nombre: "Tomate",
//     descripcion: "Alto en licopeno y vitamina C.",
//     calorias: "18 kcal",
//     img: "https://i.ibb.co/1sFkB6S/tomate.jpg"
//   },
//   {
//     nombre: "Agua de Coco",
//     descripcion: "Hidratante natural rica en minerales.",
//     calorias: "19 kcal",
//     img: "https://i.ibb.co/XYwJdp0/coco.jpg"
//   },
//   {
//     nombre: "Té Verde",
//     descripcion: "Potente antioxidante natural.",
//     calorias: "0 kcal",
//     img: "https://i.ibb.co/6XxNGdm/te-verde.jpg"
//   },
//   {
//     nombre: "Granola",
//     descripcion: "Fuente de energía con fibra.",
//     calorias: "120 kcal",
//     img: "https://i.ibb.co/XtQ5qdk/granola.jpg"
//   },
//   {
//     nombre: "Chips de Plátano",
//     descripcion: "Snack crujiente y saludable.",
//     calorias: "150 kcal",
//     img: "https://i.ibb.co/3kYbfPp/chips.jpg"
//   },
//     {
//     nombre: "Banano",
//     descripcion: "Fuente de energía con fibra.",
//     calorias: "120 kcal",
//     img: "banano.jpg"
//   },
// ];


let productos = JSON.parse(localStorage.getItem("productos")) || [];
const catalogo = document.getElementById("catalogo");

function mostrarProductos() {
    catalogo.innerHTML = "";

    productos.forEach(producto => {
        const col = document.createElement("div");
        col.classList.add("col-3", "mt-3", "mb-3", "text-center");

        col.innerHTML = `
            <div class="col-3 mt-3 mb-3 text-center">
                <div class="card" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="card-body">
                        <h4 class="card-title"><strong>${producto.titulo}</strong></h4>
                        <p class="card-text">${producto.descripcion}</p>
                        <h3>${producto.categoria}</h3>
                        <a href="#"><img src="../../../Public/images/heart.svg" alt=""></a>
                        <a href="#"><img src="../../../Public/images/eye.svg" alt=""></a>
                        <a href="#"><img src="../../../Public/images/shopping-cart.svg" alt=""></a>
                    </div>
                </div>    
            </div>
        `;

        catalogo.appendChild(col);
    });
}
mostrarProductos();

