// Pantalla de carga
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  setTimeout(() => {
    loader.style.display = "none";
    content.classList.remove("hidden");
    document.querySelector(".hero-text").classList.add("animate");
  }, 2000);
});

// Botón "volver arriba"
const btnTop = document.getElementById("btn-top");
window.addEventListener("scroll", () => {
  btnTop.style.display = window.scrollY > 400 ? "block" : "none";
});
btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Menú móvil
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
