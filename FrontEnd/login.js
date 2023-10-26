// Utiliser l'API pour vérifier les identifiants de l'utilisateur //
async function seConnecter(email, password) {
    console.log("Début de la fonction seConnecter");
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    console.log("Réponse reçue", response);

    if (response.ok) {
        const login = await response.json();
        //console.log("Réponse JSON", login);
        // Vérifie si userId et token sont présents
        if (login.userId && login.token) {
            localStorage.setItem('token', login.token);
            return true;
        }
    }
    return false;
}

document.addEventListener('DOMContentLoaded', (event) => {
    //Redirection Accueil en cliquant sur le logo
    document.getElementById('logo-header').addEventListener('click', function() {
        window.location.href = '/FrontEnd/index.html';
    });
document.querySelector('form').addEventListener('submit', async (event) => {
    //console.log("Début de l'événement submit");
    event.preventDefault();

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    //Appel à la fonction d'authentification
    const loginSuccessful = await seConnecter(email, password);

    if (loginSuccessful) {
        console.log("Login object:", login);
        console.log("Stored token:", localStorage.getItem('token'));
        //console.log("Redirection vers index.html");
        window.location.href = '/FrontEnd/index.html';
    } else {
        //console.log("Affichage du message d'erreur");
        document.getElementById('login-error').style.display = 'flex';
    }
});
});


//SI USER CONNECTE

document.addEventListener('DOMContentLoaded', (event) => {
    // Récupère le token depuis le localStorage
    const token = localStorage.getItem('token');
    console.log("Stored token:", localStorage.getItem('token'));

    if (token) {
        // L'utilisateur est connecté

        // Changement onglet login
        const connected = document.getElementById('connected');
        if (connected) {
            connected.textContent = 'logout';
        }
        // Affichage mode edition
        const editMode = document.getElementById('edit-mode-header');
        if (editMode) {
            editMode.style.display = "flex";
        }
        // Affichage bouton mode edition
        const editButton = document.querySelector('.edit-mode-button');
        if (editButton) {
            editButton.style.display = "block";
        }
    }
});

//USER SE DECONNECTE

document.getElementById('connected').addEventListener('click', function() {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    
    // Recharger la page sans token afin de pouvoir se reconnecter
    window.location.href = 'index.html';
});
