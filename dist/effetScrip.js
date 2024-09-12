const usernameInput = document.getElementById('username');
const passwordField = document.getElementById('passwordField');

// Fonction pour vérifier si une chaîne est une adresse e-mail valide
function isValidEmail(email) {
    // Expression régulière pour valider une adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Écouter les événements de saisie dans l'input du nom d'utilisateur
usernameInput.addEventListener('input', function() {
    const inputValue = this.value.trim();

    // Vérifier si l'entrée correspond à une adresse e-mail valide
    if (isValidEmail(inputValue)) {
        // Afficher le champ du mot de passe si l'input du nom d'utilisateur correspond à un format valide
        passwordField.style.display = 'block';
    } else {
        // Masquer le champ du mot de passe si l'input du nom d'utilisateur ne correspond pas à un format d'adresse e-mail valide
        passwordField.style.display = 'none';
    }
});

// Masquer le champ du mot de passe initialement
passwordField.style.display = 'none';


