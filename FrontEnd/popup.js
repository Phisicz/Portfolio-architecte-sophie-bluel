
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