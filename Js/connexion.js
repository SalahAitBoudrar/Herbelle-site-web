 function togglePassword(inputId, icon) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }

        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('login-error');
            
            // Réinitialiser le message d'erreur
            errorElement.textContent = '';
            
            // Récupérer les comptes enregistrés
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            
            // Vérifier si le compte existe
            const existingAccount = accounts.find(account => 
                account.email === email && account.password === password
            );
            
            if (existingAccount) {
                // Stocker l'état de connexion
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(existingAccount));
                
                // Redirection vers l'accueil
                window.location.href = 'index.html';
            } else {
                // Afficher le message d'erreur
                errorElement.textContent = 'Mot de passe incorrect ou compte inexistant';
            }
        });

        // Vérifier si l'utilisateur est déjà connecté au chargement de la page
        window.addEventListener('DOMContentLoaded', function() {
            if (localStorage.getItem('isLoggedIn') === 'true') {
                window.location.href = 'index.html';
            }
        });