document.addEventListener('DOMContentLoaded', function() {
    const topBar = document.querySelector('.top-bar');
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll hacia abajo
            topBar.classList.add('hidden');
            nav.style.position = 'sticky';
            nav.style.top = '0';
            nav.style.zIndex = '100'; // Asegura que el navbar esté por encima de otros elementos
        } else {
            // Scroll hacia arriba
            topBar.classList.remove('hidden');
            if (scrollTop === 0) {
                nav.style.position = 'relative'; // Vuelve a la posición original si está en la parte superior
            }
        }
        lastScrollTop = scrollTop;
    });

    const indicators = document.querySelectorAll('.indicator');
    const carouselItems = [
        {
            logo: '/img/Scmail.png',
            correo: 'Correo',
            certificado: 'Certificado',
            descripcion: 'Plataforma única de comunicaciones certificadas'
        },
        {
            logo: '/img/2slide.png',
            correo: 'Reconocimiento',
            certificado: 'Facial',
            descripcion: 'Verificación biométrica y documental por medio de reconocimiento facial'
        },
        {
            logo: '/img/3slide.png',
            correo: 'eLogic',
            certificado: 'Workflow',
            descripcion: 'Firma de documentos electrónicos desde cualquier parte.'
        }
    ];

    let currentIndex = 0;
    const firstLogoWidth = document.querySelector('.hero-title .logo').offsetWidth;

    function updateCarousel() {
        const currentItem = carouselItems[currentIndex];
        const logoImg = document.querySelector('.hero-title .logo');
        const correoText = document.querySelector('.hero-title .correo');
        const certificadoText = document.querySelector('.hero-title .certificado');
        const descripcionText = document.querySelector('.hero-description');

        // Agregar la clase de transición
        logoImg.classList.add('carousel-transition');
        correoText.classList.add('carousel-transition');
        certificadoText.classList.add('carousel-transition');
        descripcionText.classList.add('carousel-transition');

        // Actualizar el contenido después de un breve retraso
        setTimeout(() => {
            logoImg.src = currentItem.logo;
            logoImg.style.width = firstLogoWidth + 'px';
            correoText.textContent = currentItem.correo;
            certificadoText.textContent = currentItem.certificado;
            descripcionText.textContent = currentItem.descripcion;

            // Remover la clase de transición después de otro breve retraso
            setTimeout(() => {
                logoImg.classList.remove('carousel-transition');
                correoText.classList.remove('carousel-transition');
                certificadoText.classList.remove('carousel-transition');
                descripcionText.classList.remove('carousel-transition');
            }, 200); // Ajusta este valor para la duración de la transición
        }, 200); // Ajusta este valor para el retraso antes de actualizar el contenido

        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    }

    document.querySelector('.carousel-next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-prev').addEventListener('click', prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
});




    // Auto-rotación (opcional)
    setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    /* JavaScript */

});
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const images = Array.from(document.querySelectorAll(".carousel-track img"));
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    let index = 0;
    let autoSlideInterval;

    function updateCarousel() {
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${index * 210}px)`;
    }

    function moveSlide(direction) {
        index += direction;
        if (index >= images.length) {
            index = 0;
            track.style.transition = "none";
            track.style.transform = "translateX(0px)";
        } else if (index < 0) {
            index = images.length - 1;
            track.style.transition = "none";
            track.style.transform = `translateX(-${index * 210}px)`;
        }
        setTimeout(updateCarousel, 50);
    }

    function autoSlide() {
        moveSlide(1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(autoSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    next.addEventListener("click", () => moveSlide(1));
    prev.addEventListener("click", () => moveSlide(-1));
    track.addEventListener("mouseenter", stopAutoSlide);
    track.addEventListener("mouseleave", startAutoSlide);
    startAutoSlide();
});

