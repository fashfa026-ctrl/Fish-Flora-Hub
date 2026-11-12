/**
 * Fish & Flora Hub - Main Shared JavaScript
 * Features: Dark Mode, Mobile Nav, Catalog Filtering, Search, Sort, 
 * Pagination, Quick View Modal, Care Guide Tabs, and Fish Quiz
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    highlightActiveNavLink();
    initProductQuickView();
    initCatalogPage();
    initFishPageAnimations();
    initPlantPageAnimations();
    initAccessoriesPageAnimations();
    initHomePageShowcase();
    initCareGuidePage();
    initCareGuideAnimations();
    initContactPageAnimations();
    initCartPageAnimations();
    initContactForm();
    initHeroVideo();
    initHeroSlider();
    initHomeScrollReveal();
    initGlobalAquaticAmbience();
});

function initContactPageAnimations() {
    const contactLayout = document.querySelector('.contact-layout');
    if (!contactLayout || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealGroups = [
        ['.page-banner-contact .page-banner-container > *', false, 'up'],
        ['.contact-layout > div:first-child > .contact-info-card', true, 'left'],
        ['.contact-layout > .contact-form-card', false, 'right'],
        ['.contact-info-card .contact-item', true, 'left'],
        ['.contact-form-card > h2, .contact-form-card > p, #contact-feedback, #contact-form > .form-group, #contact-form > button', true, 'right']
    ];
    const revealItems = [];

    revealGroups.forEach(([selector, stagger, direction]) => {
        document.querySelectorAll(selector).forEach((item, index) => {
            item.classList.add('contact-page-reveal', `contact-page-reveal--${direction}`);
            if (stagger) {
                item.style.setProperty('--contact-reveal-delay', `${Math.min(index, 4) * 70}ms`);
            }
            revealItems.push(item);
        });
    });

    document.documentElement.classList.add('contact-page-motion-ready');

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealItems.forEach(item => revealObserver.observe(item));
}

let fishProductRevealObserver = null;
let plantProductRevealObserver = null;
let accessoriesProductRevealObserver = null;

let cartPageRevealObserver = null;

function initCartPageAnimations() {
    const cartLayout = document.getElementById('cart-content-container');
    if (!cartLayout || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealItems = [
        ...document.querySelectorAll('.page-banner-cart .page-banner-container > *'),
        ...document.querySelectorAll('.cart-table-wrap, .cart-totals-card, #cart-empty-state')
    ];

    document.documentElement.classList.add('cart-page-motion-ready');

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        observeCartRows(document.getElementById('cart-table-body'));
        return;
    }

    cartPageRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealItems.forEach(item => cartPageRevealObserver.observe(item));
    observeCartRows(document.getElementById('cart-table-body'));
}

function observeCartRows(tableBody) {
    if (!tableBody || !document.documentElement.classList.contains('cart-page-motion-ready')) return;

    tableBody.querySelectorAll('.cart-row:not(.cart-row-reveal)').forEach((row, index) => {
        row.style.setProperty('--cart-reveal-delay', `${Math.min(index, 5) * 75}ms`);
        row.classList.add('cart-row-reveal');

        if (cartPageRevealObserver) {
            cartPageRevealObserver.observe(row);
        } else {
            row.classList.add('is-visible');
        }
    });
}

function animateCartTotals() {
    if (!document.documentElement.classList.contains('cart-page-motion-ready')) return;

    document.querySelectorAll('#cart-subtotal, #cart-grand-total').forEach(total => {
        total.classList.remove('cart-total-updated');
        void total.offsetWidth;
        total.classList.add('cart-total-updated');
    });
}

function animateCartItemRemoval(itemKey, button) {
    const row = button.closest('.cart-row');
    if (!row || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        removeFromCart(itemKey);
        return;
    }

    button.disabled = true;
    row.classList.add('cart-row-removing');
    window.setTimeout(() => removeFromCart(itemKey), 260);
}

let careGuideRevealObserver = null;

function initCareGuideAnimations() {
    const guideLayout = document.querySelector('.care-guide-layout');
    if (!guideLayout || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealGroups = [
        ['.page-banner-care .page-banner-container > *', false, false],
        ['.care-tabs-nav', false, true],
        ['.care-tab-btn', true, false],
        ['.quiz-section', false, false],
        ['.quiz-header > *', false, false],
        ['.quiz-group', true, false],
        ['#fish-quiz-form > .text-center', false, false]
    ];
    const revealItems = [];

    revealGroups.forEach(([selector, stagger, fromLeft]) => {
        document.querySelectorAll(selector).forEach((item, index) => {
            item.classList.add('care-page-reveal');
            if (fromLeft) item.classList.add('care-page-reveal--left');
            if (stagger) {
                item.style.setProperty('--care-reveal-delay', `${Math.min(index, 4) * 70}ms`);
            }
            revealItems.push(item);
        });
    });

    document.documentElement.classList.add('care-page-motion-ready');

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        const activePanel = document.querySelector('.care-tab-panel.active');
        if (activePanel) revealCarePanelItems(activePanel);
        return;
    }

    careGuideRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealItems.forEach(item => careGuideRevealObserver.observe(item));
    const activePanel = document.querySelector('.care-tab-panel.active');
    if (activePanel) revealCarePanelItems(activePanel);
}

function revealCarePanelItems(panel) {
    if (!document.documentElement.classList.contains('care-page-motion-ready')) return;

    const contentItems = Array.from(panel.children).filter(item =>
        item.matches('.section-title, .care-step-card, .care-table, .text-center, h3, p')
    );

    contentItems.forEach((item, index) => {
        if (item.classList.contains('care-content-reveal')) return;
        item.classList.add('care-content-reveal');
        item.style.setProperty('--care-reveal-delay', `${Math.min(index, 5) * 75}ms`);

        if (careGuideRevealObserver) {
            careGuideRevealObserver.observe(item);
        } else {
            item.classList.add('is-visible');
        }
    });
}

function initFishPageAnimations() {
    const catalogGrid = document.getElementById('catalog-grid');
    if (!catalogGrid || catalogGrid.getAttribute('data-page-type') !== 'fish') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealGroups = [
        ['.page-banner-fish .page-banner-container > *', false, false],
        ['.filter-bar > *', false, false],
        ['.catalog-sidebar', false, true],
        ['.sidebar-cat-btn', true, false]
    ];
    const revealItems = [];

    revealGroups.forEach(([selector, stagger, fromLeft]) => {
        document.querySelectorAll(selector).forEach((item, index) => {
            item.classList.add('fish-page-reveal');
            if (fromLeft) item.classList.add('fish-page-reveal--left');
            if (stagger) {
                item.style.setProperty('--fish-reveal-delay', `${Math.min(index, 4) * 70}ms`);
            }
            revealItems.push(item);
        });
    });

    document.documentElement.classList.add('fish-page-motion-ready');

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        catalogGrid.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.setProperty('--fish-reveal-delay', `${Math.min(index, 5) * 70}ms`);
            card.classList.add('fish-product-reveal', 'is-visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealItems.forEach(item => revealObserver.observe(item));
    fishProductRevealObserver = revealObserver;
    observeFishProductCards(catalogGrid);
}

function observeFishProductCards(container) {
    if (!document.documentElement.classList.contains('fish-page-motion-ready')) return;

    container.querySelectorAll('.product-card:not(.fish-product-reveal)').forEach((card, index) => {
        card.style.setProperty('--fish-reveal-delay', `${Math.min(index, 5) * 70}ms`);
        card.classList.add('fish-product-reveal');

        if (fishProductRevealObserver) {
            fishProductRevealObserver.observe(card);
        } else {
            card.classList.add('is-visible');
        }
    });
}

function initPlantPageAnimations() {
    const catalogGrid = document.getElementById('catalog-grid');
    if (!catalogGrid || catalogGrid.getAttribute('data-page-type') !== 'plants') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealGroups = [
        ['.page-banner-plant .page-banner-container > *', false, false],
        ['.filter-bar > *', false, false],
        ['.catalog-sidebar', false, true],
        ['.sidebar-cat-btn', true, false]
    ];
    const revealItems = [];

    revealGroups.forEach(([selector, stagger, fromLeft]) => {
        document.querySelectorAll(selector).forEach((item, index) => {
            item.classList.add('plant-page-reveal');
            if (fromLeft) item.classList.add('plant-page-reveal--left');
            if (stagger) {
                item.style.setProperty('--plant-reveal-delay', `${Math.min(index, 4) * 70}ms`);
            }
            revealItems.push(item);
        });
    });

    document.documentElement.classList.add('plant-page-motion-ready');

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        catalogGrid.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.setProperty('--plant-reveal-delay', `${Math.min(index, 5) * 70}ms`);
            card.classList.add('plant-product-reveal', 'is-visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealItems.forEach(item => revealObserver.observe(item));
    plantProductRevealObserver = revealObserver;
    observePlantProductCards(catalogGrid);
}

function observePlantProductCards(container) {
    if (!document.documentElement.classList.contains('plant-page-motion-ready')) return;

    container.querySelectorAll('.product-card:not(.plant-product-reveal)').forEach((card, index) => {
        card.style.setProperty('--plant-reveal-delay', `${Math.min(index, 5) * 70}ms`);
        card.classList.add('plant-product-reveal');

        if (plantProductRevealObserver) {
            plantProductRevealObserver.observe(card);
        } else {
            card.classList.add('is-visible');
        }
    });
}

function initAccessoriesPageAnimations() {
    const catalogGrid = document.getElementById('catalog-grid');
    if (!catalogGrid || catalogGrid.getAttribute('data-page-type') !== 'accessories') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealGroups = [
        ['.page-banner-accessories .page-banner-container > *', false, false],
        ['.filter-bar > *', false, false],
        ['.catalog-sidebar', false, true],
        ['.sidebar-cat-btn', true, false]
    ];
    const revealItems = [];

    revealGroups.forEach(([selector, stagger, fromLeft]) => {
        document.querySelectorAll(selector).forEach((item, index) => {
            item.classList.add('accessories-page-reveal');
            if (fromLeft) item.classList.add('accessories-page-reveal--left');
            if (stagger) {
                item.style.setProperty('--accessories-reveal-delay', `${Math.min(index, 4) * 70}ms`);
            }
            revealItems.push(item);
        });
    });

    document.documentElement.classList.add('accessories-page-motion-ready');

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        catalogGrid.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.setProperty('--accessories-reveal-delay', `${Math.min(index, 5) * 70}ms`);
            card.classList.add('accessories-product-reveal', 'is-visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealItems.forEach(item => revealObserver.observe(item));
    accessoriesProductRevealObserver = revealObserver;
    observeAccessoriesProductCards(catalogGrid);
}

function observeAccessoriesProductCards(container) {
    if (!document.documentElement.classList.contains('accessories-page-motion-ready')) return;

    container.querySelectorAll('.product-card:not(.accessories-product-reveal)').forEach((card, index) => {
        card.style.setProperty('--accessories-reveal-delay', `${Math.min(index, 5) * 70}ms`);
        card.classList.add('accessories-product-reveal');

        if (accessoriesProductRevealObserver) {
            accessoriesProductRevealObserver.observe(card);
        } else {
            card.classList.add('is-visible');
        }
    });
}

function initHomeScrollReveal() {
    const hero = document.getElementById('hero-slider');
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealGroups = [
        ['#categories .text-center > *', false],
        ['#categories .shop-cat-card', true],
        ['#featured-products .container > div:first-child > *', false],
        ['#featured-products .product-card', true],
        ['#showcase-section .text-center > *', false],
        ['#showcase-section .showcase-tab-panel .product-card', true],
        ['#why-us .why-us-header-wrap > *', false],
        ['#why-us .why-us-image-container', false, 'left'],
        ['#why-us .why-card', true],
        ['#why-us .why-us-cta-wrap', false],
        ['#reviews .text-center > *', false],
        ['#reviews .review-card', true],
        ['.care-cta-banner > *', true]
    ];
    const revealItems = [];

    revealGroups.forEach(([selector, stagger, direction]) => {
        document.querySelectorAll(selector).forEach((item, index) => {
            item.classList.add('home-reveal');
            if (direction) item.classList.add(`home-reveal--${direction}`);
            if (stagger) {
                item.style.setProperty('--home-reveal-delay', `${Math.min(index, 4) * 90}ms`);
            }
            revealItems.push(item);
        });
    });

    if (revealItems.length === 0) return;
    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        return;
    }

    document.documentElement.classList.add('home-motion-ready');
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(item => observer.observe(item));
}

/* ==========================================================================
   1. Theme Management (Dark Mode / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const savedTheme = localStorage.getItem('fish_flora_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.add('theme-transitioning');
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('fish_flora_theme', newTheme);
            updateThemeIcons(newTheme);
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transitioning');
            }, 350);
        });
    });
}

function updateThemeIcons(theme) {
    const icons = document.querySelectorAll('.theme-icon');
    icons.forEach(icon => {
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun theme-icon';
        } else {
            icon.className = 'fa-solid fa-moon theme-icon';
        }
    });
}

/* ==========================================================================
   Hero Video Background Playback Speed (Calm / Slow Motion)
   ========================================================================== */
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;

    const setSlowSpeed = () => {
        heroVideo.playbackRate = 0.6; // 60% speed for calm, cinematic aesthetic
    };

    setSlowSpeed();
    heroVideo.addEventListener('loadedmetadata', setSlowSpeed);
    heroVideo.addEventListener('play', setSlowSpeed);
}

/* ==========================================================================
   Hero Multi-Slide Carousel (Home Page Interactive Slider)
   ========================================================================== */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-arrow-left');
    const nextBtn = document.querySelector('.hero-arrow-right');
    const sliderContainer = document.getElementById('hero-slider');

    if (!slides || slides.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval = null;
    const TOTAL_SLIDES = slides.length;
    const AUTO_DELAY = 4000; // 6 seconds per slide

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

        currentSlide = (n + TOTAL_SLIDES) % TOTAL_SLIDES;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, AUTO_DELAY);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Arrow button controls
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });
    }

    // Dots indicator controls
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            goToSlide(idx);
            startAutoSlide();
        });
    });

    // Pause auto-sliding on hover
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);

        // Mobile touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diffX = touchEndX - touchStartX;
            if (Math.abs(diffX) > 45) {
                if (diffX < 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            startAutoSlide();
        }, { passive: true });
    }

    // Keyboard navigation (Left / Right arrow keys)
    document.addEventListener('keydown', (e) => {
        if (window.scrollY < 650) {
            if (e.key === 'ArrowRight') {
                nextSlide();
                startAutoSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                startAutoSlide();
            }
        }
    });

    // Start auto carousel
    startAutoSlide();
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
    const hamburger = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('nav-links-open');
            hamburger.setAttribute('aria-expanded', isOpen);
            hamburger.innerHTML = isOpen ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('nav-links-open')) {
                navMenu.classList.remove('nav-links-open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.innerHTML = '☰';
            }
        });
    }
}

/* ==========================================================================
   3. Highlight Active Link in Navigation
   ========================================================================== */
function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ==========================================================================
   4. Catalog Page Controller (fish.html, plants.html, accessories.html)
   ========================================================================== */
let currentCatalogData = [];
let filteredCatalogData = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 6;

function initCatalogPage() {
    const catalogContainer = document.getElementById('catalog-grid');
    if (!catalogContainer) return;

    const pageType = catalogContainer.getAttribute('data-page-type'); // 'fish', 'plants', 'accessories'
    if (!pageType || !PRODUCTS_DATA[pageType]) return;

    currentCatalogData = PRODUCTS_DATA[pageType];
    filteredCatalogData = [...currentCatalogData];

    // Search bar listener
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentPage = 1;
            applyCatalogFilters();
        });
    }

    // Category dropdown listener
    const categorySelect = document.getElementById('catalog-category-select');
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            currentPage = 1;
            syncSidebarWithDropdown(categorySelect.value);
            applyCatalogFilters();
        });
    }

    // Secondary filter listener (Temperament or Difficulty)
    const secondarySelect = document.getElementById('catalog-secondary-select');
    if (secondarySelect) {
        secondarySelect.addEventListener('change', () => {
            currentPage = 1;
            applyCatalogFilters();
        });
    }

    // Sort listener
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            applyCatalogFilters();
        });
    }

    // Sidebar Category clicks
    const sidebarItems = document.querySelectorAll('.sidebar-cat-btn');
    sidebarItems.forEach(btn => {
        btn.addEventListener('click', () => {
            sidebarItems.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCat = btn.getAttribute('data-category');
            if (categorySelect) categorySelect.value = selectedCat;
            currentPage = 1;
            applyCatalogFilters();
        });
    });

    // Support URL category parameter (e.g. accessories.html?cat=tanks, accessories.html?cat=food)
    const urlParams = new URLSearchParams(window.location.search);
    const initialCat = urlParams.get('cat');
    if (initialCat && categorySelect) {
        categorySelect.value = initialCat;
        syncSidebarWithDropdown(initialCat);
    }

    applyCatalogFilters();
}

function syncSidebarWithDropdown(catValue) {
    const sidebarItems = document.querySelectorAll('.sidebar-cat-btn');
    sidebarItems.forEach(btn => {
        if (btn.getAttribute('data-category') === catValue) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function applyCatalogFilters() {
    const catalogContainer = document.getElementById('catalog-grid');
    if (!catalogContainer) return;

    const pageType = catalogContainer.getAttribute('data-page-type');
    const searchInput = document.getElementById('catalog-search-input');
    const categorySelect = document.getElementById('catalog-category-select');
    const secondarySelect = document.getElementById('catalog-secondary-select');
    const sortSelect = document.getElementById('catalog-sort-select');

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categorySelect ? categorySelect.value : 'all';
    const selectedSecondary = secondarySelect ? secondarySelect.value : 'all';
    const sortOrder = sortSelect ? sortSelect.value : 'default';

    filteredCatalogData = currentCatalogData.filter(item => {
        // Search filter
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                              (item.shortDesc && item.shortDesc.toLowerCase().includes(searchTerm)) ||
                              (item.description && item.description.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;

        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
            return false;
        }

        // Secondary filter (temperament for fish, difficulty for plants)
        if (pageType === 'fish' && selectedSecondary !== 'all') {
            if (item.temperament !== selectedSecondary) return false;
        } else if (pageType === 'plants' && selectedSecondary !== 'all') {
            if (item.careLevel.toLowerCase() !== selectedSecondary.toLowerCase()) return false;
        }

        return true;
    });

    // Sorting
    if (sortOrder === 'price-low') {
        filteredCatalogData.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high') {
        filteredCatalogData.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name-az') {
        filteredCatalogData.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderCatalogGrid();
    renderPagination();
}

function createProductCardHtml(item) {
    const isFav = typeof isInWishlist === 'function' ? isInWishlist(item.id) : false;
    const hasOptions = item.options && item.options.length > 0;
    
    let metaBadge = '';
    let actionBtn = '';
    
    if (hasOptions) {
        if (item.selectionType === 'varieties') {
            metaBadge = `<span class="card-options-tag"><i class="fa-solid fa-palette"></i> ${item.options.length} Varieties</span>`;
            actionBtn = `<button type="button" class="btn btn-primary btn-sm" onclick="openProductQuickView('${item.id}')"><i class="fa-solid fa-layer-group"></i> Varieties</button>`;
        } else if (item.selectionType === 'sizes') {
            metaBadge = `<span class="card-options-tag"><i class="fa-solid fa-up-right-and-down-left-from-center"></i> ${item.options.length} Sizes</span>`;
            actionBtn = `<button type="button" class="btn btn-primary btn-sm" onclick="openProductQuickView('${item.id}')"><i class="fa-solid fa-up-right-and-down-left-from-center"></i> Sizes</button>`;
        } else if (item.selectionType === 'weights') {
            metaBadge = `<span class="card-options-tag"><i class="fa-solid fa-weight-scale"></i> ${item.options.length} Weights</span>`;
            actionBtn = `<button type="button" class="btn btn-primary btn-sm" onclick="openProductQuickView('${item.id}')"><i class="fa-solid fa-weight-scale"></i> Weights</button>`;
        }
    } else {
        actionBtn = `<button type="button" class="btn btn-primary btn-sm" onclick="addToCart('${item.id}', 1, null, true)"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>`;
    }

    const priceDisplay = hasOptions ? `From ${formatPrice(item.price)}` : formatPrice(item.price);

    return `
        <div class="product-card" data-product-id="${item.id}">
            <div class="product-card-img-wrap">
                <img src="${item.image}" alt="${item.name}" class="product-card-img" loading="lazy" onerror="this.src='images/logo.png'">
                <button type="button" class="card-wishlist-btn wishlist-toggle-btn ${isFav ? 'is-favourited' : ''}" 
                        data-product-id="${item.id}" 
                        onclick="event.stopPropagation(); toggleWishlist('${item.id}');" 
                        aria-label="Add to Wishlist" title="Wishlist">
                    <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
                </button>
            </div>
            <div class="product-card-body">
                <div class="card-meta-row">
                    <span class="card-cat-badge">${item.categoryName || 'Aquarium'}</span>
                    ${metaBadge}
                </div>
                <h3 class="product-title">${item.name}</h3>
                <p class="product-desc">${item.shortDesc || item.description}</p>
                <div class="product-price-row">
                    <span class="product-price">${priceDisplay}</span>
                    ${item.careLevel ? `<span class="product-care-tag"><i class="fa-solid fa-seedling"></i> ${item.careLevel}</span>` : ''}
                </div>
                <div class="product-btn-group">
                    ${actionBtn}
                    <button type="button" class="btn btn-secondary-outline btn-sm" onclick="openProductQuickView('${item.id}')">View Details</button>
                </div>
            </div>
        </div>
    `;
}

function renderCatalogGrid() {
    const container = document.getElementById('catalog-grid');
    if (!container) return;

    if (filteredCatalogData.length === 0) {
        container.innerHTML = `
            <div class="empty-results-box">
                <span class="empty-icon">🔍</span>
                <h3>No matching products found</h3>
                <p>Try clearing your search terms or selecting a different category.</p>
                <button class="btn btn-primary mt-3" onclick="resetFilters()">Reset Filters</button>
            </div>
        `;
        return;
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = filteredCatalogData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    container.innerHTML = pageItems.map(item => createProductCardHtml(item)).join('');
    if (container.getAttribute('data-page-type') === 'fish') {
        observeFishProductCards(container);
    } else if (container.getAttribute('data-page-type') === 'plants') {
        observePlantProductCards(container);
    } else if (container.getAttribute('data-page-type') === 'accessories') {
        observeAccessoriesProductCards(container);
    }
    if (typeof syncWishlistButtons === 'function') syncWishlistButtons();
}

function renderPagination() {
    const paginationEl = document.getElementById('catalog-pagination');
    if (!paginationEl) return;

    const totalPages = Math.ceil(filteredCatalogData.length / ITEMS_PER_PAGE);
    if (totalPages <= 1) {
        paginationEl.innerHTML = '';
        return;
    }

    let html = `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})" aria-label="Previous page">&lt;</button>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    html += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})" aria-label="Next page">&gt;</button>`;
    paginationEl.innerHTML = html;
}

function changePage(pageNum) {
    currentPage = pageNum;
    renderCatalogGrid();
    renderPagination();
    window.scrollTo({ top: 320, behavior: 'smooth' });
}

function resetFilters() {
    const searchInput = document.getElementById('catalog-search-input');
    const categorySelect = document.getElementById('catalog-category-select');
    const secondarySelect = document.getElementById('catalog-secondary-select');
    const sortSelect = document.getElementById('catalog-sort-select');

    if (searchInput) searchInput.value = '';
    if (categorySelect) categorySelect.value = 'all';
    if (secondarySelect) secondarySelect.value = 'all';
    if (sortSelect) sortSelect.value = 'default';

    syncSidebarWithDropdown('all');
    currentPage = 1;
    applyCatalogFilters();
}

/* ==========================================================================
   5. Universal Product Details Modal (Dynamic Varieties, Sizes & Specs)
   ========================================================================== */
function initProductQuickView() {
    let modal = document.getElementById('product-quickview-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'product-quickview-modal';
        modal.className = 'modal-backdrop';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="product-modal-dialog">
                <button type="button" class="modal-close-btn" onclick="closeProductQuickView()" aria-label="Close dialog">&times;</button>
                <div id="quickview-body">
                    <!-- Populated dynamically -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeProductQuickView();
        });
    }
}

function openProductQuickView(productId, preselectedOptionIndex = 0) {
    const product = getProductById(productId);
    if (!product) return;

    initProductQuickView();

    const modal = document.getElementById('product-quickview-modal');
    const body = document.getElementById('quickview-body');
    if (!modal || !body) return;

    const hasOptions = product.options && product.options.length > 0;
    let selectedOptionIndex = (hasOptions && preselectedOptionIndex < product.options.length) ? preselectedOptionIndex : 0;
    let currentQty = 1;

    function renderModalContent() {
        const currentOption = hasOptions ? product.options[selectedOptionIndex] : null;
        const currentPrice = currentOption ? currentOption.price : product.price;
        const currentImage = (currentOption && currentOption.image) ? currentOption.image : product.image;
        const currentTitle = product.name;
        const currentSubtitle = currentOption ? currentOption.name : '';
        const currentDesc = (currentOption && currentOption.desc) ? currentOption.desc : product.description;
        const isFavourited = typeof isInWishlist === 'function' ? isInWishlist(product.id) : false;

        // Dynamic Specs tailored to category
        let specsHtml = '';
        if (product.category === 'tanks' || (currentOption && currentOption.capacity)) {
            const cap = (currentOption && currentOption.capacity) || 'Standard';
            const dims = (currentOption && currentOption.dimensions) || 'Custom';
            specsHtml = `
                <div class="spec-grid">
                    <div class="spec-item"><span class="spec-label">Capacity:</span> <span class="spec-val">${cap}</span></div>
                    <div class="spec-item"><span class="spec-label">Dimensions:</span> <span class="spec-val">${dims}</span></div>
                    <div class="spec-item"><span class="spec-label">Glass Material:</span> <span class="spec-val">Low-Iron Optical Glass</span></div>
                    <div class="spec-item"><span class="spec-label">Style:</span> <span class="spec-val">Rimless Polish Edge</span></div>
                </div>
            `;
        } else if (product.category === 'food' || (currentOption && currentOption.weight)) {
            const wt = (currentOption && currentOption.weight) || 'Standard';
            specsHtml = `
                <div class="spec-grid">
                    <div class="spec-item"><span class="spec-label">Package Weight:</span> <span class="spec-val">${wt}</span></div>
                    <div class="spec-item"><span class="spec-label">Diet Type:</span> <span class="spec-val">${product.specs || 'Daily Staple'}</span></div>
                    <div class="spec-item"><span class="spec-label">Water Impact:</span> <span class="spec-val">Clean Water Formula</span></div>
                    <div class="spec-item"><span class="spec-label">Suitable For:</span> <span class="spec-val">Tropical &amp; Freshwater Fish</span></div>
                </div>
            `;
        } else if (product.tankSize) {
            specsHtml = `
                <div class="spec-grid">
                    <div class="spec-item"><span class="spec-label">Care Level:</span> <span class="spec-val">${product.careLevel || 'Easy'}</span></div>
                    <div class="spec-item"><span class="spec-label">Water Temp:</span> <span class="spec-val">${product.temp || '24°C - 28°C'}</span></div>
                    <div class="spec-item"><span class="spec-label">Water pH:</span> <span class="spec-val">${product.pH || '6.5 - 7.5'}</span></div>
                    <div class="spec-item"><span class="spec-label">Tank Size:</span> <span class="spec-val">${product.tankSize || '30 Litres'}</span></div>
                    <div class="spec-item"><span class="spec-label">Temperament:</span> <span class="spec-val">${product.temperament || 'Peaceful'}</span></div>
                    <div class="spec-item"><span class="spec-label">Diet:</span> <span class="spec-val">${product.diet || 'Omnivore'}</span></div>
                </div>
            `;
        } else if (product.lighting) {
            specsHtml = `
                <div class="spec-grid">
                    <div class="spec-item"><span class="spec-label">Care Level:</span> <span class="spec-val">${product.careLevel || 'Easy'}</span></div>
                    <div class="spec-item"><span class="spec-label">Lighting Need:</span> <span class="spec-val">${product.lighting || 'Low - Moderate'}</span></div>
                    <div class="spec-item"><span class="spec-label">Placement:</span> <span class="spec-val">${product.placement || 'Midground'}</span></div>
                    <div class="spec-item"><span class="spec-label">CO2 Demand:</span> <span class="spec-val">${product.co2 || 'Not required'}</span></div>
                    <div class="spec-item"><span class="spec-label">Water Temp:</span> <span class="spec-val">${product.temp || '20°C - 28°C'}</span></div>
                </div>
            `;
        } else if (product.specs) {
            specsHtml = `
                <div class="spec-grid">
                    <div class="spec-item"><span class="spec-label">Specifications:</span> <span class="spec-val">${product.specs}</span></div>
                    <div class="spec-item"><span class="spec-label">Warranty:</span> <span class="spec-val">1 Year Official Hub Warranty</span></div>
                </div>
            `;
        }

        // Options selector pills
        let optionsSelectorHtml = '';
        if (hasOptions) {
            const selectorLabel = product.selectionType === 'sizes' 
                ? 'Select Size / Capacity:' 
                : product.selectionType === 'weights' 
                    ? 'Select Weight / Package:' 
                    : 'Select Variety / Strain:';

            optionsSelectorHtml = `
                <div class="product-options-wrap">
                    <label class="product-options-label">
                        <strong>${selectorLabel}</strong>
                        <span class="selected-option-name">${currentOption.name}</span>
                    </label>
                    <div class="options-pills-row">
                        ${product.options.map((opt, idx) => `
                            <button type="button" class="option-pill-btn ${idx === selectedOptionIndex ? 'active' : ''}" data-idx="${idx}">
                                ${opt.badge ? `<span class="pill-badge">${opt.badge}</span>` : ''}
                                <span class="pill-text">${opt.name}</span>
                                <span class="pill-price">${formatPrice(opt.price)}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Related Products
        const allSameCat = getAllProducts().filter(p => p.id !== product.id && (p.category === product.category || p.categoryName === product.categoryName));
        const related = allSameCat.slice(0, 3);
        let relatedHtml = '';
        if (related.length > 0) {
            relatedHtml = `
                <div class="modal-related-section">
                    <h4 class="modal-related-title"><i class="fa-solid fa-water"></i> You May Also Like:</h4>
                    <div class="modal-related-grid">
                        ${related.map(rel => `
                            <div class="modal-related-card" onclick="openProductQuickView('${rel.id}')">
                                <img src="${rel.image}" alt="${rel.name}" class="modal-related-img" onerror="this.src='images/logo.png'">
                                <div class="modal-related-info">
                                    <h5 class="modal-related-name">${rel.name}</h5>
                                    <span class="modal-related-price">${formatPrice(rel.price)}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        body.innerHTML = `
            <div class="quickview-grid">
                <div class="quickview-image-col">
                    <div class="quickview-main-img-wrap">
                        <img src="${currentImage}" alt="${currentTitle}" class="quickview-img" id="quickview-main-image" onerror="this.src='images/logo.png'">
                    </div>
                    ${hasOptions ? `
                        <div class="quickview-thumbs-strip">
                            ${product.options.map((opt, idx) => `
                                <div class="quickview-thumb-item ${idx === selectedOptionIndex ? 'active' : ''}" data-idx="${idx}">
                                    <img src="${opt.image || product.image}" alt="${opt.name}" onerror="this.src='images/logo.png'">
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>

                <div class="quickview-details-col">
                    <div class="quickview-top-meta">
                        <div class="quickview-badges-row">
                            <span class="quickview-cat-badge">${product.categoryName || 'Aquarium'}</span>
                            ${currentOption && currentOption.badge ? `<span class="quickview-option-badge">${currentOption.badge}</span>` : ''}
                        </div>
                        <button type="button" class="modal-wishlist-toggle-btn ${isFavourited ? 'is-favourited' : ''}" id="modal-wishlist-btn" title="Toggle Wishlist" aria-label="Toggle Wishlist">
                            <i class="fa-${isFavourited ? 'solid' : 'regular'} fa-heart"></i>
                        </button>
                    </div>

                    <h2 class="quickview-title">${currentTitle}</h2>
                    ${currentSubtitle ? `<div class="quickview-subtitle">${currentSubtitle}</div>` : ''}

                    <div class="quickview-price-row">
                        <span class="quickview-price" id="quickview-price-display">${formatPrice(currentPrice)}</span>
                        <span class="quickview-stock-tag"><i class="fa-solid fa-circle-check"></i> In Stock &amp; Healthy</span>
                    </div>

                    <p class="quickview-desc" id="quickview-desc-display">${currentDesc}</p>

                    ${optionsSelectorHtml}

                    <div class="quickview-qty-cart-row">
                        <div class="quickview-qty-group">
                            <label class="qty-label">Quantity:</label>
                            <div class="qty-control">
                                <button type="button" class="qty-btn" id="modal-qty-minus" aria-label="Decrease quantity">-</button>
                                <input type="number" min="1" max="50" value="${currentQty}" class="qty-input" id="modal-qty-input" readonly aria-label="Quantity">
                                <button type="button" class="qty-btn" id="modal-qty-plus" aria-label="Increase quantity">+</button>
                            </div>
                        </div>

                        <button type="button" class="btn btn-primary btn-modal-cart" id="modal-add-cart-btn">
                            <i class="fa-solid fa-cart-shopping"></i> Add to Cart &bull; <span id="modal-cart-btn-price">${formatPrice(currentPrice * currentQty)}</span>
                        </button>
                    </div>

                    ${specsHtml ? `<div class="quickview-specs-box"><h4><i class="fa-solid fa-sliders"></i> Key Specifications &amp; Care:</h4>${specsHtml}</div>` : ''}

                    ${relatedHtml}
                </div>
            </div>
        `;

        // Event listeners
        body.querySelectorAll('.option-pill-btn, .quickview-thumb-item').forEach(el => {
            el.addEventListener('click', () => {
                const idx = parseInt(el.getAttribute('data-idx'), 10);
                if (!isNaN(idx) && idx !== selectedOptionIndex) {
                    selectedOptionIndex = idx;
                    renderModalContent();
                }
            });
        });

        const minusBtn = body.querySelector('#modal-qty-minus');
        const plusBtn = body.querySelector('#modal-qty-plus');
        const qtyInput = body.querySelector('#modal-qty-input');
        const cartBtnPrice = body.querySelector('#modal-cart-btn-price');

        if (minusBtn && plusBtn && qtyInput && cartBtnPrice) {
            minusBtn.addEventListener('click', () => {
                if (currentQty > 1) {
                    currentQty--;
                    qtyInput.value = currentQty;
                    cartBtnPrice.textContent = formatPrice(currentPrice * currentQty);
                    animateQuickViewPrice(cartBtnPrice);
                }
            });

            plusBtn.addEventListener('click', () => {
                if (currentQty < 50) {
                    currentQty++;
                    qtyInput.value = currentQty;
                    cartBtnPrice.textContent = formatPrice(currentPrice * currentQty);
                    animateQuickViewPrice(cartBtnPrice);
                }
            });
        }

        const addCartBtn = body.querySelector('#modal-add-cart-btn');
        if (addCartBtn) {
            addCartBtn.addEventListener('click', () => {
                addToCart(product.id, currentQty, currentOption, true);
                closeProductQuickView();
            });
        }

        const wishlistBtn = body.querySelector('#modal-wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                const added = toggleWishlist(product.id, true);
                if (added) {
                    wishlistBtn.classList.add('is-favourited');
                    wishlistBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
                } else {
                    wishlistBtn.classList.remove('is-favourited');
                    wishlistBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
                }
            });
        }
    }

    renderModalContent();

    modal.classList.add('modal-visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProductQuickView() {
    const modal = document.getElementById('product-quickview-modal');
    if (modal) {
        modal.classList.remove('modal-visible');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function animateQuickViewPrice(priceElement) {
        priceElement.classList.remove('price-updated');
        void priceElement.offsetWidth;
        priceElement.classList.add('price-updated');
}

/* ==========================================================================
   Home Page Dynamic Showcases (Best Sellers / New Arrivals)
   ========================================================================== */
function initHomePageShowcase() {
    const bestSellersContainer = document.getElementById('bestsellers-grid');
    const newArrivalsContainer = document.getElementById('newarrivals-grid');
    const tabButtons = document.querySelectorAll('.showcase-tab-btn');
    const tabPanels = document.querySelectorAll('.showcase-tab-panel');

    if (bestSellersContainer) {
        const bestSellers = getAllProducts().filter(p => p.bestseller).slice(0, 4);
        bestSellersContainer.innerHTML = bestSellers.map(p => createProductCardHtml(p)).join('');
    }

    if (newArrivalsContainer) {
        const newArrivals = getAllProducts().filter(p => p.newArrival).slice(0, 4);
        newArrivalsContainer.innerHTML = newArrivals.map(p => createProductCardHtml(p)).join('');
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    if (typeof syncWishlistButtons === 'function') syncWishlistButtons();
}

/* ==========================================================================
   6. Care Guide Tabs & Interactive Fish Quiz (care-guide.html)
   ========================================================================== */
function initCareGuidePage() {
    const tabButtons = document.querySelectorAll('.care-tab-btn');
    const tabPanels = document.querySelectorAll('.care-tab-panel');

    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-tab-target');
                tabButtons.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    revealCarePanelItems(targetPanel);
                }
            });
        });
    }

    // Fish Quiz Form
    const quizForm = document.getElementById('fish-quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            calculateQuizSuggestions();
        });
    }
}

function calculateQuizSuggestions() {
    const beginnerAnswer = document.querySelector('input[name="quiz_beginner"]:checked')?.value;
    const tankSize = document.querySelector('input[name="quiz_tank"]:checked')?.value;
    const lowMaintenance = document.querySelector('input[name="quiz_maintenance"]:checked')?.value;
    const resultsContainer = document.getElementById('quiz-results-container');

    if (!beginnerAnswer || !tankSize || !lowMaintenance || !resultsContainer) {
        alert('Please answer all 3 questions to receive tailored suggestions.');
        return;
    }

    let recommendations = [];

    if (beginnerAnswer === 'yes') {
        if (tankSize === 'small') {
            recommendations.push(getProductById('fish-1')); // Betta Fish
        } else if (tankSize === 'medium') {
            recommendations.push(getProductById('fish-2')); // Guppy
            recommendations.push(getProductById('fish-7')); // Zebra Danio
        } else {
            recommendations.push(getProductById('fish-3')); // Goldfish
            recommendations.push(getProductById('fish-6')); // Molly Fish
        }
    } else {
        if (tankSize === 'small') {
            recommendations.push(getProductById('fish-5')); // Neon Tetra
        } else if (tankSize === 'medium') {
            recommendations.push(getProductById('fish-8')); // Swordtail
            recommendations.push(getProductById('fish-5')); // Neon Tetra
        } else {
            recommendations.push(getProductById('fish-4')); // Angelfish
            recommendations.push(getProductById('fish-8')); // Swordtail
        }
    }

    // Filter nulls
    recommendations = recommendations.filter(Boolean);

    resultsContainer.innerHTML = `
        <div class="quiz-results-box">
            <div class="quiz-results-header">
                <span class="quiz-badge">Recommended for Your Setup</span>
                <h3>Top Species Matches</h3>
                <p>Based on your experience, tank capacity, and maintenance preference:</p>
            </div>
            <div class="quiz-results-grid">
                ${recommendations.map(fish => `
                    <div class="quiz-fish-card">
                        <img src="${fish.image}" alt="${fish.name}">
                        <div>
                            <h4>${fish.name} <span class="price-pill">${formatPrice(fish.price)}</span></h4>
                            <p class="quiz-fish-info"><strong>Min Tank:</strong> ${fish.tankSize} | <strong>Care:</strong> ${fish.careLevel}</p>
                            <p class="quiz-fish-desc">${fish.description}</p>
                            <div class="mt-2">
                                <button class="btn btn-primary btn-sm" onclick="addToCart('${fish.id}')">Add to Cart</button>
                                <button class="btn btn-secondary-outline btn-sm" onclick="openProductQuickView('${fish.id}')">Full Care Specs</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <p class="quiz-disclaimer">
                💡 <em>Note: Always verify water parameters, pH, and community compatibility before introducing new species together.</em>
            </p>
        </div>
    `;

    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ==========================================================================
   7. Contact Form Handler (contact.html)
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');
        const feedbackBox = document.getElementById('contact-feedback');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !subject || !message) {
            if (feedbackBox) {
                feedbackBox.innerHTML = '<div class="alert alert-danger">Please fill out all required fields.</div>';
            }
            return;
        }

        if (!emailRegex.test(email)) {
            if (feedbackBox) {
                feedbackBox.innerHTML = '<div class="alert alert-danger">Please enter a valid email address.</div>';
            }
            return;
        }

        // Demo feedback success
        if (feedbackBox) {
            feedbackBox.innerHTML = `
                <div class="alert alert-success">
                    <strong>Thank you, ${name}!</strong> Your demo message has been received successfully. 
                 
                </div>
            `;
        }

        contactForm.reset();
    });
}

/* ==========================================================================
   8. Global Aquatic Ambience (Controlled, Subtle & Professional Settings)
   Spec: Bubble Opacity 15-28%, Slow 18-32s Ascent, Page-Specific Subtle Fish
   ========================================================================== */
function initGlobalAquaticAmbience() {
    // 1. Create fixed floating bubbles container in Layer 1 (Background)
    let bubbleCanvas = document.getElementById('aquatic-decor-canvas');
    if (!bubbleCanvas) {
        bubbleCanvas = document.createElement('div');
        bubbleCanvas.id = 'aquatic-decor-canvas';
        bubbleCanvas.className = 'aquatic-decor-canvas';
        bubbleCanvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(bubbleCanvas);

        // Generate 15 gentle, non-distracting floating bubbles with diverse sizes
        const bubbleCount = 15;
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'aquatic-bubble';

            // Size Distribution: 55% small (6-10px), 35% medium (12-17px), 10% large (19-24px)
            const randType = Math.random();
            let size;
            if (randType < 0.55) {
                size = Math.floor(Math.random() * 5) + 6; // Small micro-particles
            } else if (randType < 0.90) {
                size = Math.floor(Math.random() * 6) + 12; // Medium gentle bubbles
            } else {
                size = Math.floor(Math.random() * 6) + 19; // Large soft bubbles
            }

            const left = Math.floor(Math.random() * 92) + 4; // 4% to 96%
            // Slow, serene motion: 18s to 32s
            const duration = (Math.random() * 14 + 18).toFixed(1);
            const delay = -(Math.random() * 25).toFixed(1); // negative delay so already in motion
            // Controlled subtle opacity: 0.15 to 0.28
            const targetOpacity = (Math.random() * 0.13 + 0.15).toFixed(2);

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.setProperty('--bubble-target-opacity', targetOpacity);

            bubbleCanvas.appendChild(bubble);
        }
    }

    // 2. Automatically decorate Page Banners with subtle corner accents
    const pageBanners = document.querySelectorAll('.page-banner');
    pageBanners.forEach(banner => {
        if (!banner.querySelector('.page-banner-decor-fish')) {
            const fishDecor = document.createElement('div');
            fishDecor.className = 'page-banner-decor-fish';
            fishDecor.setAttribute('aria-hidden', 'true');
            fishDecor.innerHTML = '<img src="images/floating-fish.png" alt="" loading="lazy">';
            banner.appendChild(fishDecor);
        }

        if (!banner.querySelector('.page-banner-decor-bubbles')) {
            const bubblesDecor = document.createElement('div');
            bubblesDecor.className = 'page-banner-decor-bubbles';
            bubblesDecor.setAttribute('aria-hidden', 'true');
            bubblesDecor.innerHTML = '<img src="images/floating-bubbles.png" alt="" loading="lazy">';
            banner.appendChild(bubblesDecor);
        }
    });

    // 3. Decorate Home Page sections (#categories, #featured-products) with subtle accents
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection && !categoriesSection.querySelector('.section-decor-fish')) {
        categoriesSection.style.position = 'relative';
        categoriesSection.style.overflow = 'hidden';
        const decor = document.createElement('div');
        decor.className = 'section-ambient-decor section-decor-fish';
        decor.style.top = '25px';
        decor.style.right = '40px';
        decor.setAttribute('aria-hidden', 'true');
        decor.innerHTML = '<img src="images/floating-fish.png" alt="" loading="lazy">';
        categoriesSection.appendChild(decor);
    }

    const featuredSection = document.getElementById('featured-products');
    if (featuredSection && !featuredSection.querySelector('.section-decor-bubbles')) {
        featuredSection.style.position = 'relative';
        featuredSection.style.overflow = 'hidden';
        const decor = document.createElement('div');
        decor.className = 'section-ambient-decor section-decor-bubbles';
        decor.style.top = '20px';
        decor.style.left = '35px';
        decor.setAttribute('aria-hidden', 'true');
        decor.innerHTML = '<img src="images/floating-bubbles.png" alt="" loading="lazy">';
        featuredSection.appendChild(decor);
    }

    // 4. Page-Specific Moving Fish Glider (Layer 2 - Gentle, occasional, behind content)
    initPageSpecificFishGlider();

    // 5. Click Micro-Bubbles (Delicate interactive touch)
    initClickMicroBubbles();
}

/**
 * Page-Specific Ambient Swimming Fish:
 * Home: active subtle | Fish/Plants/Accessories/Care: subtle | Cart/Checkout: very subtle (focused)
 */
function initPageSpecificFishGlider() {
    // Detect page context
    const path = window.location.pathname.toLowerCase();
    let interval = 35000; // default 35s
    let startDelay = 5000; // 5s initial delay
    let isVerySubtle = false;

    if (path.includes('cart') || path.includes('checkout')) {
        // Cart / Checkout: Very subtle, rarely swims so user focuses on ordering
        interval = 75000;
        startDelay = 18000;
        isVerySubtle = true;
    } else if (path.includes('fish') || path.includes('plants')) {
        interval = 38000;
        startDelay = 6000;
    } else if (path.includes('accessories') || path.includes('care') || path.includes('contact')) {
        interval = 42000;
        startDelay = 8000;
    } else {
        // Home page
        interval = 32000;
        startDelay = 4000;
    }

    let glider = document.getElementById('ambient-fish-glider');
    if (!glider) {
        glider = document.createElement('div');
        glider.id = 'ambient-fish-glider';
        glider.className = 'ambient-swimming-school';
        if (isVerySubtle) glider.style.opacity = '0.18';
        glider.setAttribute('aria-hidden', 'true');
        glider.innerHTML = '<img src="images/floating-fish.png" alt="">';
        document.body.appendChild(glider);
    }

    function triggerSwim() {
        if (!glider) return;
        // Random vertical height between 20% and 70% of viewport
        const randomY = Math.floor(Math.random() * 50) + 20;
        glider.style.top = `${randomY}%`;
        glider.classList.remove('swimming-active');
        // Force reflow
        void glider.offsetWidth;
        glider.classList.add('swimming-active');
    }

    setTimeout(triggerSwim, startDelay);
    setInterval(triggerSwim, interval);
}

/**
 * Interactive subtle micro-bubbles floating up on click (Delicate & Non-intrusive)
 */
function initClickMicroBubbles() {
    document.addEventListener('click', (e) => {
        // Ignore clicks on inputs, textareas, selects
        if (e.target.matches('input, textarea, select')) return;

        const count = 3;
        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'click-micro-bubble';
            const size = Math.floor(Math.random() * 5) + 5; // 5px to 9px micro-bubbles
            const driftX = (Math.random() * 20 - 10).toFixed(1); // -10px to +10px
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${e.clientX + (Math.random() * 12 - 6)}px`;
            bubble.style.top = `${e.clientY + (Math.random() * 12 - 6)}px`;
            bubble.style.setProperty('--drift-x', `${driftX}px`);

            document.body.appendChild(bubble);

            setTimeout(() => {
                if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
            }, 1300);
        }
    }, { passive: true });
}
