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

// const catalogo = document.getElementById("catalogo");

// productos.forEach(prod => {
//   const card = document.createElement("div");
//   card.classList.add("card");

//   card.innerHTML = `
//     <div class="card-icons">
//       <i class="fa-regular fa-heart"></i>
//       <i class="fa-regular fa-eye"></i>
//       <i class="fa-solid fa-cart-shopping"></i>
//     </div>
//     <img src="${prod.img}" alt="${prod.nombre}">
//     <div class="card-content">
//       <h3>${prod.nombre}</h3>
//       <p>${prod.descripcion}</p>
//       <p><strong>Calorías:</strong> ${prod.calorias}</p>
//     </div>
//   `;

//   catalogo.appendChild(card);
// });
