function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  document.getElementById('prevBtn').classList.toggle('disabled', index === 0);
  document.getElementById('nextBtn').classList.toggle('disabled', index === slides.length - 1);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("/src/components/navbar/navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;

      // Re inicializa dropdowns, collapse y demás
      const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
      [...dropdownTriggerList].map(el => new bootstrap.Dropdown(el));
    });
});



fetch('../../components/footer/footer.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById("footer").innerHTML = data;
});
