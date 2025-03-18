document.addEventListener('DOMContentLoaded', function() {
    // --- Header ---
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
            nav.style.zIndex = '100';
        } else {
            // Scroll hacia arriba
            topBar.classList.remove('hidden');
            if (scrollTop === 0) {
                nav.style.position = 'relative';
            }
        }
        lastScrollTop = scrollTop;
    });

    // --- Hero Carousel ---
    const indicators = document.querySelectorAll('.indicator');
    const carouselItems = [
        { logo: '/img/Scmail.png', correo: 'Correo', certificado: 'Certificado', descripcion: 'Plataforma única de comunicaciones certificadas' },
        { logo: '/img/2slide.png', correo: 'Reconocimiento', certificado: 'Facial', descripcion: 'Verificación biométrica y documental por medio de reconocimiento facial' },
        { logo: '/img/3slide.png', correo: 'eLogic', certificado: 'Workflow', descripcion: 'Firma de documentos electrónicos desde cualquier parte.' }
    ];

    let currentIndex = 0;
    const firstLogoWidth = document.querySelector('.hero-title .logo').offsetWidth;

    function updateHeroCarousel() {
        const currentItem = carouselItems[currentIndex];
        const logoImg = document.querySelector('.hero-title .logo');
        const correoText = document.querySelector('.hero-title .correo');
        const certificadoText = document.querySelector('.hero-title .certificado');
        const descripcionText = document.querySelector('.hero-description');

        logoImg.classList.add('carousel-transition');
        correoText.classList.add('carousel-transition');
        certificadoText.classList.add('carousel-transition');
        descripcionText.classList.add('carousel-transition');

        setTimeout(() => {
            logoImg.src = currentItem.logo;
            logoImg.style.width = firstLogoWidth + 'px';
            correoText.textContent = currentItem.correo;
            certificadoText.textContent = currentItem.certificado;
            descripcionText.textContent = currentItem.descripcion;

            setTimeout(() => {
                logoImg.classList.remove('carousel-transition');
                correoText.classList.remove('carousel-transition');
                certificadoText.classList.remove('carousel-transition');
                descripcionText.classList.remove('carousel-transition');
            }, 200);
        }, 200);

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
        updateHeroCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateHeroCarousel();
    }

    document.querySelector('.carousel-next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-prev').addEventListener('click', prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateHeroCarousel();
        });
    });

    setInterval(nextSlide, 5000);

    // --- Customer Carousel ---
    const track = document.querySelector(".slider-track");
    const images = Array.from(document.querySelectorAll(".slider-track img"));
    const prev = document.getElementById("customer-prev");
    const next = document.getElementById("customer-next");
    let customerIndex = 0;
    let autoSlideInterval;
    const visibleImages = 3;
    const imageWidth = 200;
    const imageMargin = 15;
    const totalImageWidth = imageWidth + (imageMargin * 2);
    const trackWidth = totalImageWidth * images.length;

    track.style.width = trackWidth + "px";

    function updateCustomerCarousel() {
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${customerIndex * totalImageWidth}px)`;
    }

    function moveCustomerSlide(direction) {
        customerIndex += direction;
        if (customerIndex > images.length - visibleImages) {
            customerIndex = 0;
        } else if (customerIndex < 0) {
            customerIndex = images.length - visibleImages;
        }
        updateCustomerCarousel();
    }

    function autoCustomerSlide() {
        moveCustomerSlide(1);
    }

    function startAutoCustomerSlide() {
        autoSlideInterval = setInterval(autoCustomerSlide, 3000);
    }

    function stopAutoCustomerSlide() {
        clearInterval(autoSlideInterval);
    }

    next.addEventListener("click", () => moveCustomerSlide(1));
    prev.addEventListener("click", () => moveCustomerSlide(-1));
    track.addEventListener("mouseenter", stopAutoCustomerSlide);
    track.addEventListener("mouseleave", startAutoCustomerSlide);
    startAutoCustomerSlide();
});