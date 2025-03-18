function toggleCategory(id) {
    var element = document.getElementById(id);
    if (element.style.display === "flex") {
        element.style.display = "none";
    } else {
        element.style.display = "flex";
    }
}

document.getElementById('explorarBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.getElementById('servicios');
    targetElement.scrollIntoView({
        behavior: 'smooth'
    });
});

function renderCategories(data) {
    const container = document.getElementById("container");
    container.innerHTML = "";//limpia el contenedor.

    for (const category in data) {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";
        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        const categoryDescription = document.createElement("p");
        categoryDescription.textContent = data[category].Descripcion;
        categoryDiv.appendChild(categoryDescription);
        categoryDiv.onclick = () => toggleCategory(category);
        const servicesDiv = document.createElement("div");
        servicesDiv.className = "services";
        servicesDiv.id = category;

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
            serviceCard.appendChild(img);
            serviceCard.appendChild(title);
            serviceCard.appendChild(description);
            serviceCard.appendChild(details);
            serviceCard.appendChild(link);
            servicesDiv.appendChild(serviceCard);
        });

        container.appendChild(categoryDiv);
        container.appendChild(servicesDiv);
    }
}

fetch('/json/servicios.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        renderCategories(data);
    })
    .catch(error => {
        console.error('Hubo un problema al leer el archivo JSON:', error);
    });