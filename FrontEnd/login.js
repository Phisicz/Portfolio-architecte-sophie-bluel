// Utiliser l'API pour vérifier l'authentification de l'utilisateur //
async function seConnecter(email, password) {
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
        const login = await response.json();
        return login.success;
    } else {
        return false;
    }
}

document.getElementById('login').addEventListener('submit', async (event) => {
    console.log("test");
    event.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
  
    // Appel à la fonction d'authentification
    const loginSuccessful = await seConnecter(email, password);
  
    if (loginSuccessful) {
      window.location.href = 'index.html';
    } else {
      document.getElementById('login-error').style.display = 'flex';
    }
  });