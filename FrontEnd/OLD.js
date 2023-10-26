// Recuperer les travaux depuis l'API //
async function recupererTravaux() {
  const response = await fetch('http://localhost:5678/api/works');
  const data = await response.json();
  // return data
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

// refactoriser
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

//fin refactorisation

// Sélectionner la popup
const popup = document.querySelector('.popup-overlay');
// Fonction pour ouvrir et fermer la popup
function openPopup() {
  popup.style.display = 'flex';
}
function closePopup() {
  popup.style.display = 'none';
}
function resetPopup() {
  popupTitle.innerText = "Galerie photo";
  popupGrid.style.display = 'grid';
  popupAddPhoto.style.display = 'none';
}
// Ajouter des listeners au clic pour ouvrir/fermer
document.querySelector('.edit-mode-button').addEventListener('click', openPopup);
document.querySelector('.close-button').addEventListener('click', closePopup);
document.querySelector('.back-button').addEventListener('click', resetPopup);

//Selectionner bouton et éléments ajout photo | Selectionner popup grid
const popupGrid = document.querySelector(".popup-grid")
const popupAddPhotoButton = document.querySelector(".add-photo-button")
popupAddPhoto = document.querySelector(".popup-add-photo-container")
const popupTitle = document.querySelector(".popup-wrapper h3")

// fonction pour modifier popup
function replacePopup() {
  // Changement titre
  popupTitle.innerText = "Ajout photo";
  //Retirer grid
  popupGrid.style.display = 'none';
  //Afficher les éléments d'ajout photo
  popupAddPhoto.style.display ='block';
  //Modification du bouton ajout photo qui devient bouton valider
  popupAddPhotoButton.innerText = "Valider";

}

//Listener Bouton Ajouter Photo poru changer la popup
document.querySelector(".add-photo-button").addEventListener('click', replacePopup)