// Smooth scroll para el botón "Explorar"
document.getElementById('explorarBtn').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' });
});

// Función para renderizar las categorías y cards
function renderCategories(data) {
    const categoryMenu = document.querySelector('.category-menu ul');
    const cardsContainer = document.querySelector('.cards-container');

    // Limpiar contenido previo
    categoryMenu.innerHTML = '';
    cardsContainer.innerHTML = '';

    // Recorrer las categorías y crear el menú
    Object.keys(data).forEach(category => {
        const menuItem = document.createElement('li');
        const menuLink = document.createElement('a');
        menuLink.href = `#${category.toLowerCase().replace(/ /g, '-')}`;
        menuLink.textContent = category;
        menuLink.addEventListener('click', (e) => {
            e.preventDefault();
            showCategorySlider(category, data);
            document.querySelectorAll('.category-menu a').forEach(link => link.classList.remove('active'));
            menuLink.classList.add('active');
        });
        menuItem.appendChild(menuLink);
        categoryMenu.appendChild(menuItem);
    });

    // Mostrar el primer slider por defecto
    const firstCategory = Object.keys(data)[0];
    showCategorySlider(firstCategory, data);
    document.querySelector('.category-menu a').classList.add('active');
}

// Función para mostrar el slider de una categoría
function showCategorySlider(category, data) {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');

    // Crear las cards para la categoría
    data[category].Productos.forEach(producto => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide', 'card');

        swiperSlide.innerHTML = `
            <img src="${producto.imageUrl}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>${producto.description}</p>
            <a href="${producto.link}">Más información</a>
        `;

        swiperWrapper.appendChild(swiperSlide);
    });

    const swiperContainer = document.createElement('div');
    swiperContainer.classList.add('swiper-container');
    swiperContainer.appendChild(swiperWrapper);

    // Botones de navegación
    const prevButton = document.createElement('div');
    prevButton.classList.add('swiper-button-prev');
    const nextButton = document.createElement('div');
    nextButton.classList.add('swiper-button-next');

    swiperContainer.appendChild(prevButton);
    swiperContainer.appendChild(nextButton);
    cardsContainer.appendChild(swiperContainer);

    // Inicializar Swiper
    new Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// Cargar el JSON y renderizar las categorías
fetch('/json/servicios.json')
    .then(response => response.json())
    .then(data => renderCategories(data))
    .catch(error => console.error('Error al cargar el JSON:', error));