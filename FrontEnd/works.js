// Recuperer les travaux depuis l'API //
async function recupererTravaux() {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
  }

  // Fonction pour filtrer les images en fonction de la catégorie //
  function filterImages(category) {
    const figures = document.querySelectorAll('.gallery figure');
    figures.forEach((figure) => {
      const img = figure.querySelector('img[data-category]');
      if (category === 'all') {
        figure.style.display = 'block';
      } else {
        figure.style.display = img && img.getAttribute('data-category') === category ? 'block' : 'none';
      }
    });
  }

  // Boutons des catégories afin de filtrer les images //

  // Bouton Tous
const allButton = document.querySelector('.filter-button[data-filter="all"]');
allButton.addEventListener("click", () => {
    console.log("Bouton 'Tous' cliqué");
    filterImages("all");
  });

  // Catégorie Objets
const objectCategory = document.querySelector('.filter-button[data-filter="objects"]');
objectCategory.addEventListener("click", () => {
    console.log("Bouton 'Objets' cliqué");
    filterImages("objects");
  });

  // Catégorie Appartements
const apartmentCategory = document.querySelector('.filter-button[data-filter="apartments"]');
apartmentCategory.addEventListener("click", () => {
    console.log("Bouton 'Appartements' cliqué");
    filterImages("apartments");
  });

  // Catégorie Hôtels et Restaurants
const hotelsCategory = document.querySelector('.filter-button[data-filter="hotels"]');
hotelsCategory.addEventListener("click", () => {
    console.log("Bouton 'Hotels' cliqué");
    filterImages("hotels");
  });