  // Récupérer le panier depuis le localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Mettre à jour les compteurs
    function updateCounters() {
        document.querySelector('.cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Afficher les articles du panier
    function displayCartItems() {
        const cartItemsList = document.getElementById('cart-items-list');
        
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Votre panier est vide</p>
                    <a href="epices.html" class="continue-shopping">Continuer vos achats</a>
                </div>
            `;
            document.getElementById('subtotal').textContent = '0,00 €';
            document.getElementById('total').textContent = '0,00 €';
            return;
        }

        let html = '';
        let subtotal = 0;

        cart.forEach(item => {
            const priceValue = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
            const itemTotal = priceValue * item.quantity;
            subtotal += itemTotal;

            html += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                                <button class="quantity-btn plus">+</button>
                            </div>
                            <button class="remove-item">
                                <i class="fas fa-trash"></i> Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        cartItemsList.innerHTML = html;
        
        // Mettre à jour les totaux
        document.getElementById('subtotal').textContent = subtotal.toFixed(2).replace('.', ',') + ' €';
        document.getElementById('total').textContent = subtotal.toFixed(2).replace('.', ',') + ' €';

        // Ajouter les événements aux boutons
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.previousElementSibling;
                input.value = parseInt(input.value) + 1;
                updateCartItem(this);
            });
        });

        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.nextElementSibling;
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                    updateCartItem(this);
                }
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                if (parseInt(this.value) < 1) this.value = 1;
                updateCartItem(this);
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').getAttribute('data-id');
                cart = cart.filter(item => item.id !== itemId);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                updateCounters();
            });
        });
    }

    // Mettre à jour un article du panier
    function updateCartItem(element) {
        const itemId = element.closest('.cart-item').getAttribute('data-id');
        const newQuantity = parseInt(element.closest('.quantity-selector').querySelector('.quantity-input').value);
        
        const itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCounters();
        }
    }

    // Initialiser la page
    displayCartItems();
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

    // Passer la commande
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }
        alert('Commande passée avec succès!');
        localStorage.removeItem('cart');
        cart = [];
        displayCartItems();
        updateCounters();
    });