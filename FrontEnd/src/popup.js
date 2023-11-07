// Sélection des éléments DOM nécessaires.
const popup = document.querySelector('.popup-overlay');
const popupContainer = document.querySelector('.popup-container')
const popupGrid = document.querySelector('.popup-grid');
const popupAddWorkHeaderContainer = document.querySelector('.add-work-header-container');
const popupTitle = document.querySelector('.popup-wrapper h3');
const popupContainerButtons = document.querySelector('.popup-container-buttons');
const editModeButton = document.querySelector('.edit-mode-button');
const closeButton = document.querySelector('.close-button');
const backButton = document.querySelector('.back-button');
const addPhotoButton = document.querySelector('.add-photo-button');
const addWorkForm = document.getElementById('add-work-form');
const popupAddWorkHeaderButton = document.getElementById('add-work-header-button');
const addWorkHeader = document.querySelector('.add-work-header');
const previewPhotoWrapper = document.querySelector('.preview-photo-wrapper');
const previewPhoto = document.querySelector(".preview-photo");
const fileInputForm = document.getElementById('image');
const titleInputForm = document.getElementById('title');
const categoryInputForm = document.getElementById('category');
const popupConfirmDeleteContainer = document.getElementById('popup-confirm-delete-container');
const popupConfirmDelete = document.getElementById('popup-confirm-delete');
const confirmButton = document.getElementById('confirm-button');
const cancelButton = document.getElementById('cancel-button');


// Récupération du token dans le localstorage pour l'authentification
const token = localStorage.getItem('token');


// Permetre à l'utilisateur d'ajouter un nouveau travail à l'API
async function uploadWork(file, title, category) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);

    // pas de content-type ici car formdata avec fetch est automatiquement défini sur multipart/form-data
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Erreur lors de l'envoi du formulaire");
    }
}

// Variable pour stocker l'ID du travail actuel à supprimer
let currentWorkId = null;

// Fonction asynchrone pour récupérer les travaux depuis l'API et les afficher dans le container spécifié
async function renderWorks(containerSelector, showDeleteButton) {
    // Utilisation d'une fonction asynchrone getWorks() pour récupérer les travaux
    const works = await getWorks();

    // Sélectionne le conteneur où les travaux seront affichés
    const container = document.querySelector(containerSelector);

    // Vide le conteneur existant
    container.innerHTML = '';

    // Parcoure chaque travail et crée un élément pour lui
works.forEach((work) => {
    const workElement = document.createElement('div');
    workElement.className = 'popup-card';

    const imageElement = document.createElement('img');
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    // Ajoute l'image à l'élément de travail
    workElement.appendChild(imageElement);

    // Créez et ajoutez le bouton de suppression uniquement si showDeleteButton est true
    if (showDeleteButton) {
        const deleteButton = document.createElement('i');
        deleteButton.className = 'fa-regular fa-trash-can delete-button';
        //confirmation modal avant de supprimer élément
        deleteButton.addEventListener('click', function () {
<<<<<<< HEAD
            currentWorkId = work.id; // Stockez l'ID du travail actuel
=======
>>>>>>> e0b180c931e528ea73b36e90210922410f5958b1
            popupConfirmDeleteContainer.style.display = 'block';
        });

        workElement.appendChild(deleteButton);
    }

    // Ajoute l'élément de travail au conteneur
    container.appendChild(workElement);
});

    // Gestionnaires d'événements pour les boutons de confirmation et d'annulation
    confirmButton.addEventListener('click', function () {
        if (currentWorkId) {
            // Utilisez l'ID stocké pour supprimer le travail
            deleteWork(currentWorkId);
            // Réinitialisez l'ID après la suppression
            currentWorkId = null;
            popupConfirmDeleteContainer.style.display = 'none';
        }
    });

    cancelButton.addEventListener('click', function () {
        // Fermer la popup de confirmation sans supprimer l'élément
        popupConfirmDeleteContainer.style.display = 'none';
    });

    // Fermeture modal si clic en dehors de la fenetre
    popupConfirmDeleteContainer.addEventListener('click', function (event) {
        // Vérifie si l'élément cliqué est le container ou un de ses enfants
        if (!popupConfirmDelete.contains(event.target)) {
            popupConfirmDeleteContainer.style.display = 'none';
        }
    });

    // Gestionnaires d'événements pour les boutons de confirmation et d'annulation
    confirmButton.addEventListener('click', function () {
        // Code pour supprimer l'élément
        deleteWork(works.id);

        // Fermer la modal de confirmation
        popupConfirmDeleteContainer.style.display = 'none';
    });

    cancelButton.addEventListener('click', function () {
        // Fermer la popup de confirmation sans supprimer l'élément
        popupConfirmDeleteContainer.style.display = 'none';
    });

    // Fermeture modal si clic en dehors de la fenetre
    popupConfirmDeleteContainer.addEventListener('click', function (event) {
        // Vérifie si l'élément cliqué est le container ou un de ses enfants
        if (!popupConfirmDelete.contains(event.target)) {
            popupConfirmDeleteContainer.style.display = 'none';
        }
    });
}

// Fonction pour supprimer un travail
async function deleteWork(id) {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        await renderWorks('.popup-grid', true); // Rafraîchir la grille popup
        await renderWorks('.gallery', false); // Rafraîchir la grille homepage
        closePopup();
    }

}

// Supprimer/afficher des éléments en fonction des étapes de la popup
function popupStep(step) {
    if (step === 1) {
        backButton.style.display = 'none';
        popupContainerButtons.style.justifyContent = 'flex-end';
        addWorkForm.style.display = 'none';
    } else if (step === 2) {
        backButton.style.display = 'block';
        popupContainerButtons.style.justifyContent = 'space-between';
        addWorkForm.style.display = 'block';
        validateForm();
    }
}

// Gérer ouverture/fermeture/reset de la popup
const openPopup = () => {
    popup.style.display = "flex";
    renderWorks(".popup-grid", true);
    popupStep(1);
};

const closePopup = () => {
    popup.style.display = 'none';
    resetPopup();
};


const resetPopup = () => {
    popupTitle.innerText = "Galerie photo";
    popupGrid.style.display = "grid";
    popupAddWorkHeaderContainer.style.display = 'block';
    popupStep(1);
    resetButton();

    // Reset la preview de l'image si l'user ferme la popup et la réouvre
    const previewPhoto = document.querySelector(".preview-photo");
    previewPhoto.style.display = "none";
    previewPhoto.src = "";

    // Reset le file input de l'image
    fileInputForm.value = "";

    // Remet le header photo d'origine
    addWorkHeader.style.display = "flex"
};

const replacePopup = () => {
    popupTitle.innerText = "Ajout photo";
    popupGrid.style.display = "none";
    addPhotoButton.innerText = "Valider";
    previewPhotoWrapper.style.display = "none";
    popupStep(2);
};

// Reset le bouton si l'user ferme la popup et la réouvre
const resetButton = () => {
    addPhotoButton.disabled = false;
    addPhotoButton.style.backgroundColor = "#1d6154";
    addPhotoButton.innerText = "Ajouter une photo";
};

// Ajout de la photo dans le form de la popup
function triggerFileInput() {
    fileInputForm.click();
}

//Verification du fichier image
function validateFileTypeAndSize(fileInput) {
    const file = fileInput.files[0];

    if (file) {
        const fileType = file['type'];
        const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        const fileSize = file.size / 1024 / 1024; //file.size (octets) / 1024 (Ko) / 1024 (Mo), on peut encore rajouter /1024 pour les Go

        if (!validImageTypes.includes(fileType)) {
            alert('Veuillez sélectionner un fichier de type jpg ou png.');
            fileInput.value = '';
            return false;
        }

        if (fileSize > 4) {
            alert('La taille du fichier ne doit pas dépasser 4 Mo.');
            fileInput.value = '';
            return false;
        }
        return true;
    }
    return false;
}

<<<<<<< HEAD
// Ajout de l'écouteur d'événements pour le bouton d'ajout de photo
addPhotoButton.addEventListener('click', async function () {
    replacePopup()
=======
// Obliger user à remplir le form et rendre le bouton "valider" inutilisable dans le cas contraire
function validateForm() {
>>>>>>> e0b180c931e528ea73b36e90210922410f5958b1
    // Initialisation des données de formulaire
    const file = fileInputForm.files[0];
    const title = titleInputForm.value;
    const category = categoryInputForm.value;

<<<<<<< HEAD
    if (file && title && category) {
        const result = await uploadWork(file, title, category);
        if (result) {
            console.log("Travail ajouté avec succès: ", result);
            await renderWorks(".gallery", false); // mise à jour affichage grille homepage
            await renderWorks(".popup-grid", true); // mise à jour affichage grille popup
            closePopup();
        }
    }
});

// Obliger user à remplir le form et rendre le bouton "valider" inutilisable dans le cas contraire
function validateForm() {
    const file = fileInputForm.files[0];
    const title = titleInputForm.value;
    const category = categoryInputForm.value;

=======
>>>>>>> e0b180c931e528ea73b36e90210922410f5958b1
    //Appel de la fonction de la verification fichier image
    if (!validateFileTypeAndSize(fileInputForm)) {
        return;
    }

    //Bouton qui reste désactivé tant que l'utilisateur ne remplit pas les informations
    if (file && title && category) {
        addPhotoButton.disabled = false;
        addPhotoButton.style.backgroundColor = "#1d6154";
    } else {
        addPhotoButton.disabled = true;
        addPhotoButton.style.backgroundColor = "#A7A7A7";
    }

    // Preview de l'image sélectionnée par l'utilisateur (indépendant des autres champs)
    if (file) {
        addWorkHeader.style.display = "none";
        previewPhotoWrapper.style.display = "flex";
        previewPhoto.style.display = "block";
        popupAddWorkHeaderContainer.style.display = "flex";
        popupAddWorkHeaderContainer.style.justifyContent = "center";
        const preview = new FileReader();
        preview.onload = function (event) {
            previewPhoto.src = event.target.result;
        };
        preview.readAsDataURL(file);
    } else {
        previewPhoto.style.display = "none";
    }
<<<<<<< HEAD
}

fileInputForm.onchange = validateForm;
titleInputForm.onkeyup = validateForm;
categoryInputForm.onchange = validateForm;

=======

    // Ajout de l'écouteur d'événements pour le bouton d'ajout de photo
    addPhotoButton.addEventListener('click', async function () {
        if (file && title && category) {
            const result = await uploadWork(file, title, category);
            if (result) {
                console.log("Travail ajouté avec succès: ", result);
                renderWorks(".popup-grid"); // mise à jour de l'affichage
            }
        }
    });
}

>>>>>>> e0b180c931e528ea73b36e90210922410f5958b1
// Ajoute des écouteurs d'événements aux boutons.
editModeButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
backButton.addEventListener('click', resetPopup);
popupAddWorkHeaderButton.addEventListener("click", triggerFileInput);
fileInputForm.addEventListener('change', validateForm);
titleInputForm.addEventListener('input', validateForm);
categoryInputForm.addEventListener('change', validateForm);