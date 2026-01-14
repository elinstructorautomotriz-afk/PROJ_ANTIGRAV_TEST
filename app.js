const i18n = {
    en: {
        "nav-home": "Home",
        "nav-certified": "Certified Shops",
        "hero-title": "Experience the Spirit of Bolivian Coffee",
        "hero-subtitle": "Discover and travel through the most exceptional coffee destinations in Bolivia, certified for quality and atmosphere.",
        "hero-cta": "Explore Certified Shops",
        "certified-title": "Certified Coffee Explorations",
        "footer-rights": "All rights reserved.",
        "score-label": "Average Score",
        "location-prefix": "Location: ",
        "criteria-1": "Coffee quality and variety",
        "criteria-2": "Menu items variety/quality",
        "criteria-3": "Price",
        "criteria-4": "Experience",
        "criteria-5": "Friendly for kids",
        "criteria-6": "Pet friendly",
        "criteria-7": "Ambient, music & installation",
        "menu-info": "Menu Information",
        "view-details": "View Details",
        "address-label": "Address"
    },
    es: {
        "nav-home": "Inicio",
        "nav-certified": "Cafés Certificados",
        "hero-title": "Vive el Espíritu del Café Boliviano",
        "hero-subtitle": "Descubre y viaja a través de los destinos de café más excepcionales de Bolivia, certificados por su calidad y atmósfera.",
        "hero-cta": "Explorar Cafeterías Certificadas",
        "certified-title": "Exploraciones de Café Certificadas",
        "footer-rights": "Todos los derechos reservados.",
        "score-label": "Puntaje Promedio",
        "location-prefix": "Ubicación: ",
        "criteria-1": "Calidad y variedad de café",
        "criteria-2": "Variedad/calidad de menú",
        "criteria-3": "Precio",
        "criteria-4": "Experiencia",
        "criteria-5": "Amigable para niños",
        "criteria-6": "Amigable para mascotas",
        "criteria-7": "Ambiente, música e instalación",
        "menu-info": "Información del Menú",
        "view-details": "Ver Detalles",
        "address-label": "Dirección"
    }
};

const shops = [
    {
        id: 1,
        name: "Café Kunturi",
        location: "La Paz, Bolivia",
        address: "Calle Sagárnaga 189, Zona Central, La Paz",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.438597025816!2d-68.139!3d-16.496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915edf0a5e82ac15%3A0x7d6b38c64bb9b52a!2sCalle%20Sagarnaga%2C%20La%20Paz!5e0!3m2!1sen!2sbo!4v1705260000000!5m2!1sen!2sbo",
        image: "assets/shop1.png",
        criteria: {
            coffee: 5,
            menu: 4,
            price: 3,
            experience: 5,
            kids: 2,
            pets: 4,
            ambient: 5
        },
        menuInfo: {
            en: "Specialty Geisha beans, artisanal pastries, and local llama-milk infusions.",
            es: "Granos Geisha de especialidad, pastelería artesanal e infusiones locales de leche de llama."
        }
    },
    {
        id: 2,
        name: "Café Amazonia",
        location: "Santa Cruz, Bolivia",
        address: "Av. San Martín, Equipetrol Norte, Santa Cruz de la Sierra",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15194.614603681438!2d-63.19!3d-17.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e8470a7df8cb%3A0x8896089d8132e08!2sEquipetrol%2C%20Santa%20Cruz%20de%20la%20Sierra!5e0!3m2!1sen!2sbo!4v1705260000000!5m2!1sen!2sbo",
        image: "assets/shop2.png",
        criteria: {
            coffee: 4,
            menu: 5,
            price: 4,
            experience: 5,
            kids: 5,
            pets: 5,
            ambient: 5
        },
        menuInfo: {
            en: "Tropical coffee blends, exotic fruit bowls, and house-made achachairu desserts.",
            es: "Mezclas de café tropical, bowls de frutas exóticas y postres caseros de achachairú."
        }
    }
];

let currentLang = 'en';

function calculateAverage(criteria) {
    const values = Object.values(criteria);
    const sum = values.reduce((a, b) => a + b, 0);
    return (sum / values.length).toFixed(1);
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18n[currentLang][key];
    });
    renderShops();
}

function renderShops() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = '';

    shops.forEach(shop => {
        const avg = calculateAverage(shop.criteria);
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
            <div class="shop-img" style="background-image: url('${shop.image}')"></div>
            <div class="shop-info">
                <h3>${shop.name}</h3>
                <p class="shop-location">${shop.location}</p>
                <div class="shop-rating-summary">
                    <span class="stars">${renderStars(Math.round(avg))}</span>
                    <span class="final-score">${avg} / 5.0</span>
                </div>
            </div>
        `;
        card.onclick = () => openModal(shop);
        grid.appendChild(card);
    });
}

function openModal(shop) {
    const modal = document.getElementById('shop-modal');
    const body = document.getElementById('modal-body');
    const avg = calculateAverage(shop.criteria);

    body.innerHTML = `
        <div class="modal-hero" style="background-image: url('${shop.image}')"></div>
        <div class="modal-details">
            <h2>${shop.name}</h2>
            <p class="shop-location">${shop.location}</p>
            <p class="shop-address"><strong>${i18n[currentLang]['address-label']}:</strong> ${shop.address}</p>
            
            <div class="criteria-grid">
                <div class="criteria-item"><span>${i18n[currentLang]['criteria-1']}</span> <span class="stars">${renderStars(shop.criteria.coffee)}</span></div>
                <div class="criteria-item"><span>${i18n[currentLang]['criteria-2']}</span> <span class="stars">${renderStars(shop.criteria.menu)}</span></div>
                <div class="criteria-item"><span>${i18n[currentLang]['criteria-3']}</span> <span class="stars">${renderStars(shop.criteria.price)}</span></div>
                <div class="criteria-item"><span>${i18n[currentLang]['criteria-4']}</span> <span class="stars">${renderStars(shop.criteria.experience)}</span></div>
                <div class="criteria-item"><span>${i18n[currentLang]['criteria-5']}</span> <span class="stars">${renderStars(shop.criteria.kids)}</span></div>
                <div class="criteria-item"><span>${i18n[currentLang]['criteria-6']}</span> <span class="stars">${renderStars(shop.criteria.pets)}</span></div>
                <div class="criteria-item"><span>${i18n[currentLang]['criteria-7']}</span> <span class="stars">${renderStars(shop.criteria.ambient)}</span></div>
            </div>

            <div style="margin-top: 2rem; border-top: 1px solid #333; padding-top: 1rem;">
                <h3>${i18n[currentLang]['menu-info']}</h3>
                <p>${shop.menuInfo[currentLang]}</p>
            </div>

            <div class="map-container" style="margin-top: 2rem;">
                <iframe src="${shop.mapEmbed}" width="100%" height="300" style="border:0; border-radius: 10px;" allowfullscreen="" loading="lazy"></iframe>
            </div>

            <div class="shop-rating-summary" style="margin-top: 2rem; font-size: 1.5rem;">
                <strong>${i18n[currentLang]['score-label']}:</strong>
                <span class="stars">${renderStars(Math.round(avg))}</span>
                <span class="final-score">${avg}</span>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Event Listeners
document.getElementById('lang-en').onclick = () => {
    currentLang = 'en';
    document.getElementById('lang-en').classList.add('active');
    document.getElementById('lang-es').classList.remove('active');
    updateContent();
};

document.getElementById('lang-es').onclick = () => {
    currentLang = 'es';
    document.getElementById('lang-es').classList.add('active');
    document.getElementById('lang-en').classList.remove('active');
    updateContent();
};

document.querySelector('.close-modal').onclick = () => {
    document.getElementById('shop-modal').style.display = 'none';
};

window.onclick = (event) => {
    const modal = document.getElementById('shop-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Initial Load
updateContent();