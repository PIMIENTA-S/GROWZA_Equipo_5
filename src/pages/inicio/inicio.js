fetch("../../components/navbar/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });

fetch("../../components/footer/footer.html")
  .then(response => response.text())
  .then(data => {
  document.getElementById("footer").innerHTML = data;
});