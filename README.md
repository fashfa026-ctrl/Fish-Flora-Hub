# 🐠 Fish & Flora Hub 🌿

A complete, modern, responsive multi-page aquarium e-commerce and educational showcase website developed for the **2nd Semester Web Development Project**.

Built strictly using **HTML5, CSS3, and Pure Vanilla JavaScript (ES6)** without external frameworks, third-party libraries, or complex backends. It runs directly in any modern browser or Visual Studio Code Live Server!

---

## 📸 Project Overview & UI Architecture

Fish & Flora Hub provides a comprehensive, interactive experience across 8 dedicated pages:

| # | Page | File | Key Features & Modules |
|---|------|------|------------------------|
| 1 | **Home** | `index.html` | Hero banner, categories showcase, featured products, why choose us, care guide CTA, and responsive footer |
| 2 | **Fish Collection** | `fish.html` | Live search, category sidebar filter, temperament filter, price sorting, product modal quick view, and pagination |
| 3 | **Aquatic Plants** | `plants.html` | Plant zone filters (Foreground, Midground, Background, Floating), lighting & care difficulty filters, and specifications |
| 4 | **Accessories** | `accessories.html` | Filters by equipment type (Tanks, Filters, Lights, Heaters, Air Pumps, Food, Decorations) and sorting |
| 5 | **Care Guide** | `care-guide.html` | Step-by-step setup guide, feeding guide, water parameters chart, nitrogen cycle infographic, common mistakes, and **Interactive Fish Match Quiz** |
| 6 | **Shopping Cart** | `cart.html` | Dynamic item table, increment/decrement quantity, remove items, live subtotal & grand total calculation, empty cart state, and `localStorage` persistence |
| 7 | **Checkout** | `checkout.html` | Multi-field validation (Name, Email, 10-digit Phone, Address, Terms), dynamic order summary, demo Cash on Delivery, and confirmation modal |
| 8 | **Contact Us** | `contact.html` | Contact form with real-time feedback validation, location card, customer support hours, and social channels |

---

## 🎨 Design System & Color Palette

The visual design follows an aquatic theme featuring high-contrast, modern typography and clean UI card layouts:

- **Deep Navy (`#0B1F33`)**: Primary header, text, and footer background
- **Ocean Blue (`#123C69`)**: Secondary headers, page banners, and accents
- **Primary Turquoise (`#20B8B0`)**: Primary call-to-action buttons, active badges, and highlights
- **Aquatic Green (`#56B870`)**: Plant badges, success alerts, and trust badges
- **Light Aqua Background (`#F2FAFC`)**: Crisp, glare-free light background
- **Surface White (`#FFFFFF`)**: Clean product and content card surfaces
- **Dark Mode Support**: Seamless toggle between light mode and deep-ocean dark theme (`#071524` / `#0F2338`), saved in browser `localStorage`.

---

## 📂 Project Folder Structure

```
Fish-Flora-Hub/
│
├── index.html              # Homepage & featured showcase
├── fish.html               # Fish collection with search & filters
├── plants.html             # Aquatic plants with lighting & difficulty filters
├── accessories.html        # Equipment & tank maintenance products
├── care-guide.html         # Educational care guide & interactive fish quiz
├── cart.html               # Shopping cart with dynamic totals
├── checkout.html           # Demo checkout form with validation
├── contact.html            # Contact inquiry form & business details
│
├── css/
│   └── style.css           # Complete responsive CSS3 stylesheet & Dark Mode
│
├── js/
│   ├── products.js         # Central product catalog data & helper utilities
│   ├── script.js           # Shared navigation, dark mode, filtering & modal
│   ├── cart.js             # Cart operations, quantity controls & localStorage
│   └── checkout.js         # Form validation & demo order confirmation
│
├── images/                 # Complete local vector SVG graphics & assets (100% offline)
│   ├── logo.svg
│   ├── hero-aquarium.svg
│   ├── tropical-fish-cat.svg
│   ├── aquatic-plants-cat.svg
│   ├── accessories-cat.svg
│   ├── betta-fish.svg
│   ├── guppy-fish.svg
│   ├── goldfish.svg
│   ├── angelfish.svg
│   ├── neon-tetra.svg
│   ├── molly-fish.svg
│   ├── zebra-danio.svg
│   ├── swordtail.svg
│   ├── java-fern.svg
│   ├── anubias.svg
│   ├── java-moss.svg
│   ├── amazon-sword.svg
│   ├── vallisneria.svg
│   ├── water-wisteria.svg
│   ├── aquarium-tank.svg
│   ├── aquarium-filter.svg
│   ├── aquarium-light.svg
│   ├── water-heater.svg
│   ├── air-pump.svg
│   ├── fish-food.svg
│   ├── aquarium-gravel.svg
│   ├── coral-decor.svg
│   ├── healthy-aquarium.svg
│   └── nitrogen-cycle.svg
│
└── README.md               # Project documentation
```

---

## ⚡ Key JavaScript Features

1. **Light / Dark Mode Switcher**:
   - Toggles instant theme change across all elements.
   - Saves selection to browser `localStorage` (`fish_flora_theme`) so the user's preference remains active across page reloads and different pages.

2. **Full-Featured Shopping Cart**:
   - `addToCart(productId, qty)`: Adds items with floating toast notification.
   - `updateCartQuantity(productId, qty)`: Dynamically updates subtotals and grand total.
   - `removeFromCart(productId)`: Instantly removes item with feedback.
   - `localStorage` synchronization: Cart state persists across all 8 pages.
   - Global navbar cart badge reflects live item count on every page.

3. **Catalog Search, Filter & Sort**:
   - Instant text search across fish, plant, and accessory names and descriptions.
   - Category sidebar filters and dropdown filters with active item counts.
   - Sorting by Price (Low to High, High to Low) and Name (A to Z).
   - Interactive pagination (`< 1 2 >`).

4. **Product Quick View Modal**:
   - Clicking "View Details" on any product card opens a modal dialog with high-resolution illustration, complete water parameters (Tank size, pH, Temperature, Care difficulty, Diet), and direct "Add to Cart" button.

5. **Interactive Fish Match Quiz**:
   - Asks the user 3 tailored questions (experience level, tank capacity, maintenance preference).
   - Computes species matches dynamically and displays detailed recommendations with instant cart actions.

6. **Form Validation with Feedback**:
   - Checkout validation checking full name length, email format regex, 10-digit phone number, address details, and terms agreement.
   - Contact form validation with success feedback banner.
   - Generates simulated Order IDs (`#FFH-2025-XXXXXX`) and saves order summaries to local history.

---

## 🚀 How to Run in Visual Studio Code

### Method 1: Using VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Go to **File** &rarr; **Open Folder...** and select `Fish & Flora Hub`.
3. If you have the **Live Server** extension installed:
   - Right-click `index.html` and click **"Open with Live Server"**.
   - Your default browser will launch at `http://127.0.0.1:5500/index.html`.

### Method 2: Direct Browser Launch (No server required)
- Simply double-click `index.html` from Windows File Explorer.
- The website is 100% self-contained with offline vector graphics and works smoothly in Chrome, Edge, Firefox, or Safari!

---

## 📝 Academic Project Notes & Limitations

As required for an educational 2nd Semester frontend demonstration project:
- **Client-Side Data Storage**: All cart and demo order data is stored in the browser's `localStorage`.
- **Predefined Catalog**: Product data is managed via modular JavaScript objects in `products.js`.
- **No Real Financial Transactions**: The checkout process demonstrates an illustrative "Cash on Delivery" order simulation for grading demonstration purposes.
- **Offline Reliability**: All 28 illustrations and diagrams are embedded as local vector SVG files, ensuring zero broken images even in offline evaluation environments.

---

*Developed for 2nd Semester Project Submission.*  
*Fish & Flora Hub &copy; 2025. All Rights Reserved.*
