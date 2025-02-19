// Données des portfolios
const portfolios = [
    { name: "Jean Dupont", category: "web", description: "Développeur web full-stack.", link: "portfolio.html", date: "2023-10-01" },
    { name: "Marie Martin", category: "design", description: "Designer UI/UX créative.", link: "portfolio.html", date: "2023-09-15" },
    { name: "Pierre Lambert", category: "mobile", description: "Développeur d'applications mobiles.", link: "portfolio.html", date: "2023-08-20" },
    { name: "Sophie Leroy", category: "web", description: "Spécialiste en JavaScript et React.", link: "portfolio.html", date: "2023-07-10" }
];

// Éléments du DOM
const filters = document.querySelectorAll('.filters button');
const portfolioFeed = document.querySelector('.portfolio-feed');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

// Afficher les portfolios
function displayPortfolios(category, searchTerm = '', sortBy = 'name') {
    portfolioFeed.innerHTML = '';

    // Filtrer par catégorie
    let filteredPortfolios = category === 'all' ? portfolios : portfolios.filter(portfolio => portfolio.category === category);

    // Filtrer par recherche
    if (searchTerm) {
        filteredPortfolios = filteredPortfolios.filter(portfolio =>
            portfolio.name.toLowerCase().includes(searchTerm) ||
            portfolio.description.toLowerCase().includes(searchTerm)
        );
    }

    // Trier
    if (sortBy === 'name') {
        filteredPortfolios.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'date') {
        filteredPortfolios.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Afficher les portfolios filtrés
    filteredPortfolios.forEach(portfolio => {
        const portfolioCard = document.createElement('div');
        portfolioCard.classList.add('portfolio-card');
        portfolioCard.innerHTML = `
            <h3>${portfolio.name}</h3>
            <p>${portfolio.description}</p>
            <a href="${portfolio.link}" target="_blank">Voir le portfolio</a>
        `;
        portfolioFeed.appendChild(portfolioCard);
    });
}

// Gestion des filtres
filters.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        displayPortfolios(category, searchInput.value.toLowerCase(), sortSelect.value);
    });
});

// Gestion de la recherche
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const currentCategory = document.querySelector('.filters button.active')?.getAttribute('data-category') || 'all';
    displayPortfolios(currentCategory, searchTerm, sortSelect.value);
});

// Gestion du tri
sortSelect.addEventListener('change', () => {
    const currentCategory = document.querySelector('.filters button.active')?.getAttribute('data-category') || 'all';
    displayPortfolios(currentCategory, searchInput.value.toLowerCase(), sortSelect.value);
});

// Chargement initial
displayPortfolios('all');