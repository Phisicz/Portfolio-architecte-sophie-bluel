// Fonction pour récupérer les travaux depuis l'API
async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const data = await response.json();
    return data;
}

// Fonction pour gérer le filtre en fonction de la catégorie
function filterByCategory(categoryId) {
    // Récupérer tous les travaux
    const works = document.querySelectorAll('figure');

    // Parcourir tous les travaux
    works.forEach((work) => {
        // Récupérer la catégorie de chaque travail depuis un attribut category-id
        const workCategoryId = work.getAttribute('category-id');

        // Si la catégorie correspond à l'ID sélectionné afficher les travaux sinon les masquer
        // Et si la catégorie est 0 (tous) afficher tous les travaux
        if (categoryId === '0' || workCategoryId === categoryId) {
            work.style.display = 'block';
        } else {
            work.style.display = 'none';
        }
    });
}

// Listener sur les boutons de filtre pour afficher la categorie en question
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const categoryId = button.getAttribute('category-id');
        filterByCategory(categoryId);
    });
});
