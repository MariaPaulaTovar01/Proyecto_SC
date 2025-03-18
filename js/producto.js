document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".carousel-images img");
    const totalSlides = slides.length;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none"; // Muestra solo la imagen actual
        });
    }

    function moveSlide(direction) {
        currentIndex += direction;

        if (currentIndex >= totalSlides) {
            currentIndex = 0; // Si es la última imagen, vuelve a la primera
        } else if (currentIndex < 0) {
            currentIndex = totalSlides - 1; // Si es la primera y retrocede, va a la última
        }

        showSlide(currentIndex);
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            moveSlide(1); // Mueve al siguiente slide cada 3 segundos
        }, 3000);
    }

    function resetAutoSlide() {
        clearInterval(interval); // Detiene el auto-slide
        startAutoSlide(); // Lo reinicia
    }

    // Mostrar la primera imagen al cargar la página
    showSlide(currentIndex);
    startAutoSlide(); // Inicia el carrusel automático

    // Evento para botón ANTERIOR
    document.querySelector(".prev").addEventListener("click", function () {
        moveSlide(-1);
        resetAutoSlide(); // Reinicia el auto-slide cuando se usa un botón
    });

    // Evento para botón SIGUIENTE
    document.querySelector(".next").addEventListener("click", function () {
        moveSlide(1);
        resetAutoSlide();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");

    hamburger.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});
