// Récupérer les travaux depuis l'API
async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  const data = await response.json();
  return data;
}

// Afficher les travaux dynamiquement
async function renderWorks() {
  // Récupérer les données depuis l'API
  const works = await getWorks();

  // Sélectionner le conteneur où seront affichés les travaux
  const container = document.querySelector('.gallery');

  // Boucle à travers les travaux pour créer les éléments HTML
  works.forEach((work) => {
    const workElement = document.createElement('figure');
    // Ajoutez l'attribut category-id correspondant à la catégorie du travail
    workElement.setAttribute('category-id', work.categoryId);

    // Créez des éléments HTML pour afficher les détails du travail
    const imageElement = document.createElement('img');
    imageElement.src = work.imageUrl;
    
    const titleElement = document.createElement('figcaption');
    titleElement.textContent = work.title;

    // Ajoutez les éléments au conteneur
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
    container.appendChild(workElement);
  });

  // Ajoutez les écouteurs d'événements pour les boutons de filtrage
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach((button) => {
    button.addEventListener('click', filterWorks);
  });
}

// Filtrer les travaux en fonction de la catégorie
function filterWorks(event) {
  const categoryId = event.target.value;
  const works = document.querySelectorAll('figure');

  // Parcourir tous les éléments de la galerie pour les afficher ou les masquer
  works.forEach((work) => {
    const workCategoryId = work.getAttribute('category-id');
    if (categoryId === '0' || workCategoryId === categoryId) {
      work.style.display = 'block';
    } else {
      work.style.display = 'none';
    }
  });
}

// Appelez la fonction pour afficher les travaux dynamiquement
renderWorks();
