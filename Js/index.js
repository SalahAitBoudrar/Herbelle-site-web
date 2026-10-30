  // Script principal pour accueil.html

document.addEventListener('DOMContentLoaded', function() {
    // 1. Slider Hero amélioré avec animations
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const totalSlides = slides.length;
    let slideInterval;

    // Créer les dots
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        
        slides[index].classList.add('active');
        setTimeout(() => {
            slides[index].style.opacity = '1';
        }, 10);
        
        // Mettre à jour les dots
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSliderTimer() {
        clearInterval(slideInterval);
        startSlider();
    }

    // Initialisation du slider
    createDots();
    startSlider();

    // Boutons du slider
    document.querySelector('.next').addEventListener('click', () => {
        nextSlide();
        resetSliderTimer();
    });
    
    document.querySelector('.prev').addEventListener('click', () => {
        prevSlide();
        resetSliderTimer();
    });

    // 2. Gestion de la déconnexion
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Simuler une déconnexion
            localStorage.removeItem('isLoggedIn');
            alert('Vous avez été déconnecté avec succès.');
            window.location.href = 'connexion.html';
        });
    }

    // Vérifier l'état de connexion (simulé)
    function checkLoginState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const authButtons = document.querySelector('.auth-buttons');
        const logoutButton = document.querySelector('.logout-btn');

        if (isLoggedIn === 'true') {
            if (authButtons) authButtons.style.display = 'none';
            if (logoutButton) logoutButton.style.display = 'block';
        } else {
            if (authButtons) authButtons.style.display = 'flex';
            if (logoutButton) logoutButton.style.display = 'none';
        }
    }

    checkLoginState();

    // 3. Navigation vers la section Avis
    const avisLinks = document.querySelectorAll('a[href="#reviews"]');
    avisLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const reviewsSection = document.getElementById('reviews');
            if (reviewsSection) {
                window.scrollTo({
                    top: reviewsSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Animation pour mettre en valeur la section
                reviewsSection.style.transform = 'scale(1.02)';
                reviewsSection.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    reviewsSection.style.transform = 'scale(1)';
                }, 300);

                // Animation des cartes d'avis
                const reviewCards = document.querySelectorAll('.review-card');
                reviewCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = 'pulse 0.5s ease';
                        setTimeout(() => {
                            card.style.animation = '';
                        }, 500);
                    }, index * 200);
                });
            }
        });
    });

    // 4. Animations au défilement
    function animateOnScroll() {
        const elements = document.querySelectorAll(
            '.slide-content h2, .slide-content p, .hero-buttons, ' +
            '.product-card, .review-card, .about-container, .contact-container, ' +
            '.section-title, .main-title, .description'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Animation spécifique pour les titres
                if (element.classList.contains('section-title') ) {
                    element.style.animation = 'textShadow 2s infinite';
                }
            }
        });
    }

    // Initialiser les animations
    function initAnimations() {
        const animatedElements = document.querySelectorAll(
            '.product-card, .review-card, .about-container, .contact-container, ' +
            '.section-title, .main-title, .description'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        animateOnScroll();
    }

    initAnimations();
    window.addEventListener('scroll', animateOnScroll);

    // 5. Gestion du header qui disparaît/reapparaît au scroll
    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
            // On descend - cacher le header
            header.classList.add('hidden');
        } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
            // On remonte - montrer le header
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });

    // 6. Menu mobile
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuToggle);
    
    const nav = document.querySelector('.main-nav');
    const headerContainer = document.querySelector('.header-container');
    
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        headerContainer.classList.toggle('mobile-menu-open');
    });
    
    // Fermer le menu mobile lorsqu'un lien est cliqué
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            headerContainer.classList.remove('mobile-menu-open');
            
            // Scroll doux pour les ancres
            if(link.getAttribute('href').startsWith('#')) {
                const target = document.querySelector(link.getAttribute('href'));
                if(target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 7. Effet de survol sur les cartes produits
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });

    // 8. Animation du bouton "Retour en haut"
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

    // 9. Validation du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation simple
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Simulation d'envoi
            alert('Merci pour votre message! Nous vous contacterons bientôt.');
            contactForm.reset();
        });
    }

    // 10. Animation des étoiles dans les avis
    const reviewStars = document.querySelectorAll('.stars');
    reviewStars.forEach(stars => {
        stars.addEventListener('mouseover', function(e) {
            if (e.target.tagName === 'SPAN') {
                const index = Array.from(this.children).indexOf(e.target);
                Array.from(this.children).forEach((star, i) => {
                    star.style.color = i <= index ? '#ffc107' : '#ccc';
                });
            }
        });
    });

    // 11. Animation des titres
    const sectionTitles = document.querySelectorAll('.section-title, .main-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseover', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // 12. Animation des boutons
    const buttons = document.querySelectorAll('.discover-btn, .view-all-btn, .contact-btn, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Styles supplémentaires pour les animations
const style = document.createElement('style');
style.textContent = `
    /* Animations */
    .slide {
        transition: opacity 0.5s ease;
    }
    
    .product-card, .review-card, .about-container, .contact-container,
    .section-title, .main-title, .description {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .product-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .product-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
    }
    
    .scroll-top {
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .scroll-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    /* Header scroll */
    #header {
        transition: transform 0.3s ease;
    }
    
    #header.hidden {
        transform: translateY(-100%);
    }
    
    /* Bouton de déconnexion */
    .logout-btn {
        display: none;
        background: #fff;
        color: #2c3e2c;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
        transition: all 0.3s ease;
    }
    
    .logout-btn:hover {
        background: #f0f0f0;
    }
    
    /* Menu mobile */
    .mobile-menu-toggle {
        display: none;
        position: fixed;
        top: 1rem;
        right: 1rem;
        background-color: #2c3e2c;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        z-index: 1001;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    @media (max-width: 1200px) {
        .mobile-menu-toggle {
            display: flex;
        }
        
        .main-nav ul {
            display: none;
            position: fixed;
            top: 100px;
            left: 0;
            width: 100%;
            background-color: #2c3e2c;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
            z-index: 1000;
        }
        
        .main-nav ul.active {
            display: flex;
        }
        
        .header-container.mobile-menu-open {
            padding-bottom: 1rem;
        }
        
        .dropdown-menu {
            position: static;
            box-shadow: none;
            background-color: transparent;
            padding: 0.5rem 0 0 1rem;
        }
        
        .dropdown-menu a {
            color: #fff !important;
        }
    }
    
    @media (max-width: 768px) {
        .main-nav ul {
            top: 90px;
        }
    }

    /* Animations supplémentaires */
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    @keyframes textShadow {
        0% { text-shadow: 0 0 5px rgba(0,0,0,0.1); }
        50% { text-shadow: 0 0 10px rgba(0,0,0,0.2); }
        100% { text-shadow: 0 0 5px rgba(0,0,0,0.1); }
    }

    .section-title {
        animation: textShadow 2s infinite;
    }
`;
document.head.appendChild(style);