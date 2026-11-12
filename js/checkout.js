/**
 * Fish & Flora Hub - Checkout Logic & Form Validation
 * Pure JavaScript demo ordering system
 */

document.addEventListener('DOMContentLoaded', () => {
    initCheckoutPage();
});

function initCheckoutPage() {
    renderCheckoutSummary();

    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', handleCheckoutSubmit);

    // Live validation on blur
    const fields = ['fullname', 'email', 'phone', 'address'];
    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input) {
            input.addEventListener('blur', () => validateField(fieldId));
            input.addEventListener('input', () => clearFieldError(fieldId));
        }
    });

    const termsCheckbox = document.getElementById('terms-agreement');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', () => {
            const errorEl = document.getElementById('terms-error');
            if (termsCheckbox.checked && errorEl) errorEl.textContent = '';
        });
    }
}

// Render cart items inside checkout page summary card
function renderCheckoutSummary() {
    const summaryItemsContainer = document.getElementById('checkout-items-list');
    const summaryTotalEl = document.getElementById('checkout-total-price');
    const submitBtn = document.getElementById('place-order-btn');
    const emptyNotice = document.getElementById('checkout-empty-notice');
    const formCard = document.getElementById('customer-form-card');

    if (!summaryItemsContainer) return;

    const items = getCartItemsWithDetails();

    if (items.length === 0) {
        if (emptyNotice) emptyNotice.style.display = 'block';
        if (formCard) formCard.style.opacity = '0.5';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.cursor = 'not-allowed';
        }
        summaryItemsContainer.innerHTML = '<p class="text-muted text-center py-4">No items in your cart.</p>';
        if (summaryTotalEl) summaryTotalEl.textContent = 'Rs. 0';
        return;
    }

    if (emptyNotice) emptyNotice.style.display = 'none';
    if (formCard) formCard.style.opacity = '1';
    if (submitBtn) submitBtn.disabled = false;

    summaryItemsContainer.innerHTML = items.map(item => `
        <div class="checkout-item-row">
            <div class="checkout-item-left">
                <img src="${item.image}" alt="${item.name}" class="checkout-item-thumb">
                <div>
                    <h5 class="checkout-item-name">${item.name}</h5>
                    <span class="checkout-item-qty">Qty: ${item.quantity} × ${formatPrice(item.price)}</span>
                </div>
            </div>
            <div class="checkout-item-subtotal">
                ${formatPrice(item.subtotal)}
            </div>
        </div>
    `).join('');

    const subtotal = getCartSubtotal();
    if (summaryTotalEl) {
        summaryTotalEl.textContent = formatPrice(subtotal);
    }
}

// Field validation helper
function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (!input || !errorEl) return true;

    const value = input.value.trim();
    let isValid = true;
    let errorMsg = '';

    switch (fieldId) {
        case 'fullname':
            if (!value) {
                errorMsg = 'Please enter your full name.';
                isValid = false;
            } else if (value.length < 3) {
                errorMsg = 'Name must be at least 3 characters.';
                isValid = false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMsg = 'Please enter your email address.';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMsg = 'Please enter a valid email (e.g. name@example.com).';
                isValid = false;
            }
            break;

        case 'phone':
            const phoneDigits = value.replace(/\D/g, '');
            if (!value) {
                errorMsg = 'Please enter your contact phone number.';
                isValid = false;
            } else if (phoneDigits.length < 9 || phoneDigits.length > 14) {
                errorMsg = 'Please enter a valid phone number (e.g. 077 629 2797).';
                isValid = false;
            }
            break;

        case 'address':
            if (!value) {
                errorMsg = 'Please enter your delivery address.';
                isValid = false;
            } else if (value.length < 10) {
                errorMsg = 'Please provide complete delivery address details.';
                isValid = false;
            }
            break;
    }

    if (!isValid) {
        input.classList.add('input-invalid');
        errorEl.textContent = errorMsg;
    } else {
        input.classList.remove('input-invalid');
        errorEl.textContent = '';
    }

    return isValid;
}

function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (input) input.classList.remove('input-invalid');
    if (errorEl) errorEl.textContent = '';
}

// Handle Order Submission
function handleCheckoutSubmit(e) {
    e.preventDefault();

    const items = getCartItemsWithDetails();
    if (items.length === 0) {
        alert('Your cart is empty! Please add products before placing an order.');
        return;
    }

    // Validate all fields
    const isNameValid = validateField('fullname');
    const isEmailValid = validateField('email');
    const isPhoneValid = validateField('phone');
    const isAddressValid = validateField('address');

    const termsCheckbox = document.getElementById('terms-agreement');
    const termsError = document.getElementById('terms-error');
    let isTermsValid = true;
    if (termsCheckbox && !termsCheckbox.checked) {
        if (termsError) termsError.textContent = 'You must agree to the demo terms to proceed.';
        isTermsValid = false;
    }

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isAddressValid || !isTermsValid) {
        return;
    }

    // Order data
    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const grandTotal = getCartSubtotal();
    const orderId = 'FFH-' + Math.floor(100000 + Math.random() * 900000);

    // Save demo order to localStorage order history
    try {
        const history = JSON.parse(localStorage.getItem('fish_flora_orders') || '[]');
        history.unshift({
            orderId,
            date: new Date().toLocaleDateString(),
            customer: { fullName, email, phone, address },
            items,
            total: grandTotal
        });
        localStorage.setItem('fish_flora_orders', JSON.stringify(history));
    } catch (err) {
        console.error('Error saving order history', err);
    }

    // Show Success Modal
    showOrderSuccessModal({
        orderId,
        fullName,
        email,
        phone,
        address,
        items,
        total: grandTotal
    });

    // Clear cart
    clearCart();
}

// Success Modal rendering
function showOrderSuccessModal(order) {
    const modal = document.getElementById('order-success-modal');
    if (!modal) return;

    document.getElementById('modal-order-id').textContent = '#' + order.orderId;
    document.getElementById('modal-customer-name').textContent = order.fullName;
    document.getElementById('modal-customer-email').textContent = order.email;
    document.getElementById('modal-customer-address').textContent = order.address;
    document.getElementById('modal-order-total').textContent = formatPrice(order.total);

    modal.classList.add('modal-visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    const modal = document.getElementById('order-success-modal');
    if (modal) {
        modal.classList.remove('modal-visible');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
    window.location.href = 'index.html';
}
