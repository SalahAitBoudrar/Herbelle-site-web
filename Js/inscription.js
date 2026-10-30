 // Fonction pour basculer la visibilité du mot de passe
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

        // Gestion de l'inscription
        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();

            // Récupération des valeurs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();

            // Validation
            if (!name || !email || !password || !confirmPassword) {
                alert("Veuillez remplir tous les champs");
                return;
            }

            if (password !== confirmPassword) {
                alert("Les mots de passe ne correspondent pas");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Veuillez entrer un email valide");
                return;
            }

            // Gestion des comptes
            const accounts = JSON.parse(localStorage.getItem('herbelleAccounts')) || [];
            
            if (accounts.some(account => account.email === email)) {
                alert("Un compte existe déjà avec cet email");
                return;
            }

            // Création du compte
            const newAccount = {
                name: name,
                email: email,
                password: password,
                joinedAt: new Date().toISOString()
            };

            accounts.push(newAccount);
            localStorage.setItem('herbelleAccounts', JSON.stringify(accounts));
            localStorage.setItem('currentUser', JSON.stringify({ email, name }));

            // Feedback visuel
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Inscription réussie';
            submitBtn.style.backgroundColor = '#2ecc71';

            // Redirection
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
        // 
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Récupérer les comptes existants ou créer un nouveau tableau
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
    // Vérifier si l'email existe déjà
    const emailExists = accounts.some(account => account.email === email);
    
    if (emailExists) {
        alert('Cet email est déjà utilisé.');
    } else {
        // Ajouter le nouveau compte
        accounts.push({ email, password });
        localStorage.setItem('accounts', JSON.stringify(accounts));
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        window.location.href = 'connexion.html';
    }
});