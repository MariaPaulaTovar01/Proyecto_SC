function toggleCategory(id) {
    var element = document.getElementById(id);
    if (element.style.display === "flex") {
        element.style.display = "none";
    } else {
        element.style.display = "flex";
    }
}

//Desilzarse hasta las categorías
document.getElementById('explorarBtn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

    const targetElement = document.getElementById('servicios');
    targetElement.scrollIntoView({
        behavior: 'smooth' // Desplazamiento suave
    });
});

// JSON de ejemplo
// Renderizar dinámicamente las categorías y servicios
function renderCategories(data) {
    const container = document.getElementById("container");

    for (const category in data) {
        // Crear la categoría
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";

        // Crear el título de la categoría
        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        // Crear la descripción de la categoría
        const categoryDescription = document.createElement("p");
        categoryDescription.textContent = data[category].Descripcion;
        categoryDiv.appendChild(categoryDescription);
        categoryDiv.onclick = () => toggleCategory(category);

        // Crear el contenedor de servicios
        const servicesDiv = document.createElement("div");
        servicesDiv.className = "services";
        servicesDiv.id = category;
        

        // Crear los servicios
        data[category].Productos.forEach(service => {
            const serviceCard = document.createElement("div");
            serviceCard.className = "service";

            const img = document.createElement("img");
            img.src = service.imageUrl;
            img.alt = service.title;
            img.className = "service-icon";

            const title = document.createElement("h3");
            title.textContent = service.title;

            const description = document.createElement("p");
            description.className = "service-title";
            description.textContent = service.description;

            const details = document.createElement("p");
            details.textContent = service.details;

            const link = document.createElement("a");
            link.href = service.link;
            link.className = "btn";
            link.textContent = "MÁS INFO";

            // Agregar elementos al card
            serviceCard.appendChild(img);
            serviceCard.appendChild(title);
            serviceCard.appendChild(description);
            serviceCard.appendChild(details);
            serviceCard.appendChild(link);

            // Agregar el card al contenedor de servicios
            servicesDiv.appendChild(serviceCard);
        });

        // Agregar la categoría y los servicios al contenedor principal
        container.appendChild(categoryDiv);
        container.appendChild(servicesDiv);
    }
}

fetch('/json/servicios.json') // La ruta del archivo JSON
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json(); // Parsear la respuesta como JSON
    })
    .then(data => {
        console.log(data); // Mostrar el contenido en la consola
        renderCategories(data); // Llamar a una función para procesar los datos, si es necesario
    })
    .catch(error => {
        console.error('Hubo un problema al leer el archivo JSON:', error);
    });