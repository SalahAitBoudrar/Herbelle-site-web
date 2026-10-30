 // Récupérer les favoris depuis le localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Mettre à jour les compteurs
        function updateCounters() {
            document.querySelector('.cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
            document.querySelector('.favorites-count').textContent = favorites.length;
        }

        // Afficher les articles favoris
        function displayFavorites() {
            const favoritesList = document.getElementById('favorites-list');
            
            if (favorites.length === 0) {
                favoritesList.innerHTML = `
                    <div class="empty-favorites">
                        <i class="fas fa-heart"></i>
                        <p>Vous n'avez aucun favoris pour le moment</p>
                        <a href="epices.html" class="continue-shopping">Découvrir nos produits</a>
                    </div>
                `;
                return;
            }

            let html = '';

            // Pour chaque favori, créer une carte (en réalité, vous devriez avoir plus d'informations stockées)
            favorites.forEach(item => {
                html += `
                    <div class="favorite-item" data-id="${item.id}">
                        <div class="favorite-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="favorite-info">
                            <h3>${item.name}</h3>
                            <div class="favorite-actions">
                                <button class="add-to-cart">
                                    <i class="fas fa-cart-plus"></i> Ajouter
                                </button>
                                <button class="remove-favorite">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            favoritesList.innerHTML = html;

            // Ajouter les événements aux boutons
            document.querySelectorAll('.remove-favorite').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = this.closest('.favorite-item').getAttribute('data-id');
                    favorites = favorites.filter(item => item.id !== itemId);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    displayFavorites();
                    updateCounters();
                });
            });

            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = this.closest('.favorite-item').getAttribute('data-id');
                    const favoriteItem = favorites.find(item => item.id === itemId);
                    
                    // Vérifier si l'article est déjà dans le panier
                    const existingItem = cart.find(item => item.id === itemId);
                    
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        // Dans une application réelle, vous devriez avoir plus d'informations (comme le prix)
                        cart.push({
                            id: favoriteItem.id,
                            name: favoriteItem.name,
                            image: favoriteItem.image,
                            price: "9,99 €", // Ceci devrait être stocké dans les favoris
                            quantity: 1
                        });
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCounters();

                    // Animation de confirmation
                    this.innerHTML = '<i class="fas fa-check"></i> Ajouté';
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter';
                    }, 2000);
                });
            });
        }

        // Initialiser la page
        displayFavorites();
        updateCounters();

        // Gestion de la déconnexion
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Vous avez été déconnecté avec succès.');
            window.location.href = 'connexion.html';
        });

        // Scroll to top button
        const scrollTopBtn = document.querySelector('.scroll-top');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });