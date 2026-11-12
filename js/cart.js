/**
 * Fish & Flora Hub - Shopping Cart & Wishlist System
 * Pure JavaScript using browser LocalStorage
 * Supports multi-variety products, dynamic sizes, quantities, and favourites
 */

const CART_STORAGE_KEY = 'fish_flora_cart_data';
const WISHLIST_STORAGE_KEY = 'fish_flora_wishlist_data';

/* ==========================================================================
   1. Shopping Cart Management
   ========================================================================== */

// Read cart from localStorage
function getCart() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error reading cart from localStorage', e);
        return [];
    }
}

// Save cart to localStorage and sync UI
function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartBadge();
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    } catch (e) {
        console.error('Error saving cart to localStorage', e);
    }
}

/**
 * Add an item to cart (supports base products and specific varieties/sizes)
 * @param {string} productId - Base product ID
 * @param {number} quantity - Quantity to add
 * @param {object|null} selectedOption - { name, price, image }
 * @param {boolean} showNotification - Whether to show toast alert
 */
function addToCart(productId, quantity = 1, selectedOption = null, showNotification = true) {
    const product = getProductById(productId);
    if (!product) {
        console.error('Product not found:', productId);
        return false;
    }

    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const cart = getCart();

    // Generate unique key for distinct varieties or sizes
    const itemKey = selectedOption && selectedOption.name 
        ? `${productId}__${selectedOption.name.replace(/\s+/g, '_')}`
        : productId;

    const itemName = product.name;
    const optionName = selectedOption && selectedOption.name ? selectedOption.name : null;
    const itemPrice = selectedOption && selectedOption.price ? Number(selectedOption.price) : Number(product.price);
    const itemImage = selectedOption && selectedOption.image ? selectedOption.image : product.image;

    const existingIndex = cart.findIndex(item => (item.key || item.id) === itemKey);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += qty;
    } else {
        cart.push({
            key: itemKey,
            id: productId,
            name: itemName,
            optionName: optionName,
            price: itemPrice,
            image: itemImage,
            categoryName: product.categoryName || 'Aquarium Item',
            quantity: qty
        });
    }

    saveCart(cart);

    if (showNotification) {
        const label = optionName ? `${itemName} (${optionName})` : itemName;
        showToast(`Added <strong>${label}</strong> (${qty}x) to your cart!`, 'success');
    }
    return true;
}

// Update quantity of an item by its unique key
function updateCartQuantity(itemKey, newQty) {
    let cart = getCart();
    newQty = parseInt(newQty, 10);

    if (isNaN(newQty) || newQty <= 0) {
        removeFromCart(itemKey);
        return;
    }

    const item = cart.find(i => (i.key || i.id) === itemKey);
    if (item) {
        item.quantity = newQty;
        saveCart(cart);
        if (typeof renderCartPage === 'function' && document.getElementById('cart-table-body')) {
            renderCartPage();
        }
    }
}

// Remove item completely from cart by key
function removeFromCart(itemKey) {
    let cart = getCart();
    const removedItem = cart.find(i => (i.key || i.id) === itemKey);
    cart = cart.filter(item => (item.key || item.id) !== itemKey);
    saveCart(cart);

    if (removedItem) {
        const label = removedItem.optionName ? `${removedItem.name} (${removedItem.optionName})` : removedItem.name;
        showToast(`Removed <strong>${label}</strong> from cart.`, 'info');
    }

    if (typeof renderCartPage === 'function' && document.getElementById('cart-table-body')) {
        renderCartPage();
    }
}

// Empty the entire cart
function clearCart() {
    saveCart([]);
    if (typeof renderCartPage === 'function' && document.getElementById('cart-table-body')) {
        renderCartPage();
    }
}

// Total count of items in cart
function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
}

// Get rich list with calculated subtotals
function getCartItemsWithDetails() {
    const cart = getCart();
    return cart.map(item => {
        const product = getProductById(item.id);
        const name = item.name || (product ? product.name : 'Product');
        const price = item.price || (product ? product.price : 0);
        const image = item.image || (product ? product.image : 'images/logo.png');
        const categoryName = item.categoryName || (product ? product.categoryName : 'Aquarium');
        const qty = item.quantity || 1;

        return {
            key: item.key || item.id,
            id: item.id,
            name: name,
            optionName: item.optionName || null,
            price: price,
            image: image,
            categoryName: categoryName,
            quantity: qty,
            subtotal: price * qty
        };
    });
}

// Calculate cart subtotal
function getCartSubtotal() {
    const items = getCartItemsWithDetails();
    return items.reduce((sum, item) => sum + item.subtotal, 0);
}

// Update navbar cart badge count across all pages
function updateCartBadge() {
    const count = getCartCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.classList.remove('hidden');
    });
}

/* ==========================================================================
   2. Wishlist / Favourite Products Management (❤️)
   ========================================================================== */

// Read wishlist array from localStorage
function getWishlist() {
    try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error reading wishlist from localStorage', e);
        return [];
    }
}

// Save wishlist array to localStorage and sync badges/icons
function saveWishlist(list) {
    try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
        updateWishlistBadge();
        syncWishlistButtons();
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist: list } }));
    } catch (e) {
        console.error('Error saving wishlist to localStorage', e);
    }
}

// Check if a product is in wishlist
function isInWishlist(productId) {
    const list = getWishlist();
    return list.includes(productId);
}

// Toggle product in/out of wishlist
function toggleWishlist(productId, showNotification = true) {
    const product = getProductById(productId);
    if (!product) return false;

    let list = getWishlist();
    let added = false;

    if (list.includes(productId)) {
        list = list.filter(id => id !== productId);
        added = false;
        if (showNotification) {
            showToast(`Removed <strong>${product.name}</strong> from your Wishlist.`, 'info');
        }
    } else {
        list.push(productId);
        added = true;
        if (showNotification) {
            showToast(`Added <strong>${product.name}</strong> to your Wishlist ❤️`, 'success');
        }
    }

    saveWishlist(list);
    return added;
}

// Update navbar wishlist badge count across all pages
function updateWishlistBadge() {
    const list = getWishlist();
    const count = list.length;
    const badges = document.querySelectorAll('.wishlist-badge');
    badges.forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
            badge.style.display = 'block';
        } else {
            badge.style.display = 'block'; // keep visible as 0 or counter
        }
    });
}

// Synchronise all heart icon buttons on the current page
function syncWishlistButtons() {
    const list = getWishlist();
    const buttons = document.querySelectorAll('.wishlist-toggle-btn');
    buttons.forEach(btn => {
        const id = btn.getAttribute('data-product-id');
        if (id && list.includes(id)) {
            btn.classList.add('is-favourited');
            btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
            btn.setAttribute('aria-label', 'Remove from Wishlist');
            btn.setAttribute('title', 'Remove from Wishlist');
        } else {
            btn.classList.remove('is-favourited');
            btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
            btn.setAttribute('aria-label', 'Add to Wishlist');
            btn.setAttribute('title', 'Add to Wishlist');
        }
    });
}

// Open Wishlist Modal/Drawer
function openWishlistModal() {
    let modal = document.getElementById('wishlist-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'wishlist-modal';
        modal.className = 'custom-modal';
        modal.setAttribute('aria-hidden', 'true');
        document.body.appendChild(modal);
    }

    const list = getWishlist();
    const items = list.map(id => getProductById(id)).filter(Boolean);

    modal.innerHTML = `
        <div class="custom-modal-overlay" onclick="closeWishlistModal()"></div>
        <div class="custom-modal-dialog wishlist-modal-dialog" role="dialog" aria-modal="true" aria-label="My Favourites and Wishlist">
            <div class="modal-header">
                <div class="modal-title-wrap">
                    <span class="modal-heart-icon">❤️</span>
                    <h3 class="modal-title">My Favourites &amp; Wishlist (${items.length})</h3>
                </div>
                <button type="button" class="modal-close-btn" onclick="closeWishlistModal()" aria-label="Close Wishlist">&times;</button>
            </div>
            <div class="modal-body wishlist-modal-body">
                ${items.length === 0 ? `
                    <div class="wishlist-empty-state text-center">
                        <div class="wishlist-empty-icon">🐠❤️</div>
                        <h4>Your Wishlist is Empty</h4>
                        <p>Explore our aquarium fish, lush aquatic plants, and equipment to add your favourite items!</p>
                        <a href="fish.html" class="btn btn-primary" onclick="closeWishlistModal()">Explore Fish &rarr;</a>
                    </div>
                ` : `
                    <div class="wishlist-items-list">
                        ${items.map((p, index) => `
                            <div class="wishlist-item-row" style="--wishlist-reveal-delay: ${Math.min(index, 5) * 70}ms;">
                                <img src="${p.image}" alt="${p.name}" class="wishlist-item-img" onerror="this.src='images/logo.png'">
                                <div class="wishlist-item-details">
                                    <h4 class="wishlist-item-name">${p.name}</h4>
                                    <span class="wishlist-item-cat">${p.categoryName || 'Aquarium'}</span>
                                    <div class="wishlist-item-price">${formatPrice(p.price)}</div>
                                </div>
                                <div class="wishlist-item-actions">
                                    <button type="button" class="btn btn-sm btn-primary" onclick="openProductQuickView('${p.id}'); closeWishlistModal();">
                                        <i class="fa-solid fa-eye"></i> View
                                    </button>
                                    <button type="button" class="btn btn-sm btn-secondary" onclick="addToCart('${p.id}', 1, null, true);">
                                        <i class="fa-solid fa-cart-plus"></i> Add
                                    </button>
                                    <button type="button" class="wishlist-row-remove" onclick="animateWishlistItemRemoval('${p.id}', this)" title="Remove">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
            <div class="modal-footer wishlist-modal-footer">
                <button type="button" class="btn btn-secondary-outline" onclick="closeWishlistModal()">Continue Browsing</button>
                <a href="cart.html" class="btn btn-primary" onclick="closeWishlistModal()">Go to Cart &rarr;</a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function animateWishlistItemRemoval(productId, button) {
    const row = button.closest('.wishlist-item-row');
    if (!row || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        toggleWishlist(productId);
        openWishlistModal();
        return;
    }

    button.disabled = true;
    row.classList.add('wishlist-item-removing');
    window.setTimeout(() => {
        toggleWishlist(productId);
        openWishlistModal();
    }, 240);
}

function closeWishlistModal() {
    const modal = document.getElementById('wishlist-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = document.getElementById('product-quickview-modal')?.classList.contains('modal-visible') ? 'hidden' : '';
    }
}

/* ==========================================================================
   3. Notification Toast System
   ========================================================================== */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '🐠';
    if (type === 'info') icon = 'ℹ️';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="Close">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.add('toast-hiding');
        setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('toast-hiding');
            setTimeout(() => toast.remove(), 300);
        }
    }, 3500);
}

/* ==========================================================================
   4. Cart Page Rendering (cart.html)
   ========================================================================== */
function renderCartPage() {
    const tableBody = document.getElementById('cart-table-body');
    const emptyState = document.getElementById('cart-empty-state');
    const tableContainer = document.getElementById('cart-content-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const grandTotalEl = document.getElementById('cart-grand-total');

    if (!tableBody || !emptyState || !tableContainer) return;

    const items = getCartItemsWithDetails();

    if (items.length === 0) {
        emptyState.style.display = 'block';
        tableContainer.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    tableContainer.style.display = 'grid';

    tableBody.innerHTML = items.map(item => `
        <tr class="cart-row">
            <td class="cart-product-cell">
                <div class="cart-product-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-product-img" onerror="this.src='images/logo.png'">
                    <div>
                        <h4 class="cart-product-title">${item.name}</h4>
                        ${item.optionName ? `<span class="cart-variety-badge"><i class="fa-solid fa-tag"></i> ${item.optionName}</span>` : ''}
                        <span class="cart-product-category">${item.categoryName || 'Aquarium Item'}</span>
                    </div>
                </div>
            </td>
            <td class="cart-price-cell">${formatPrice(item.price)}</td>
            <td class="cart-quantity-cell">
                <div class="qty-control">
                    <button type="button" class="qty-btn" onclick="updateCartQuantity('${item.key}', ${item.quantity - 1})" aria-label="Decrease quantity">-</button>
                    <input type="number" min="1" max="99" value="${item.quantity}" class="qty-input" 
                           onchange="updateCartQuantity('${item.key}', this.value)" aria-label="Quantity">
                    <button type="button" class="qty-btn" onclick="updateCartQuantity('${item.key}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
                </div>
            </td>
            <td class="cart-subtotal-cell">${formatPrice(item.subtotal)}</td>
            <td class="cart-action-cell">
                <button type="button" class="cart-remove-btn" onclick="animateCartItemRemoval('${item.key}', this)" title="Remove item" aria-label="Remove item">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
    `).join('');

    if (typeof observeCartRows === 'function') observeCartRows(tableBody);

    const subtotal = getCartSubtotal();
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(subtotal);
    if (typeof animateCartTotals === 'function') animateCartTotals();
}

// Initialise badges and listeners on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    updateWishlistBadge();
    syncWishlistButtons();
    if (document.getElementById('cart-table-body')) {
        renderCartPage();
    }
});
