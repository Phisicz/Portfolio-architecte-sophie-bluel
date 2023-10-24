// Utiliser l'API pour vérifier l'authentification de l'utilisateur //
async function seConnecter(username, password) {
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
        const data = await response.json();
        return data.success;
    } else {
        return false;
    }
}

document.getElementById('login').addEventListener('submit', async (e) => {
    console.log("Le formulaire a été soumis");
    e.preventDefault();
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Appel à la fonction d'authentification
    const loginSuccessful = await seConnecter(username, password);
  
    if (loginSuccessful) {
      window.location.href = 'index.html';
    } else {
      document.getElementById('errorMessage').innerText = 'Erreur dans l\'email ou le mot de passe';
    }
  });