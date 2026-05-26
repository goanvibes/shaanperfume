# 🏺 SHAAN | Indian Haute Parfumerie
**A Premium Vanilla JS Single-Page Application for High-End Fragrance Retail.**

SHAAN is a bespoke digital experience designed for an elite Indian fragrance brand. It bridges the gap between traditional heritage and cutting-edge web design, delivering a "Zero-Friction" shopping experience tailored to the Indian market. Built with **zero external dependencies** and optimized for mobile-first luxury retail.

---

## ✨ Signature Features

### 💎 Ultra-Luxury Interface
- **Regal Typography:** Utilizes *Cormorant Garamond* for a heritage feel paired with *Montserrat* for modern, functional clarity.
- **Adaptive Visual Balance:** A specialized "Hero Spacing" logic ensures that brand messaging and CTA elements remain perfectly centered and readable across all device orientations.
- **Glassmorphism UI:** Sophisticated frosted-glass overlays for Contact and Checkout modules, featuring interactive floating-label inputs.

### 🧪 Smart "Morphing" UX
A custom-engineered notification system designed to maintain the "shopping flow":
1. **The Announcement:** A high-contrast gold toast provides immediate feedback when an item is added to the bag.
2. **The Morph:** After 2.5 seconds, the toast smoothly transitions into a persistent, minimized **"VIEW BAG"** button.
3. **The Utility:** This floating utility allows users to explore the 60+ item collection without visual distraction while maintaining instant cart access.

### 🛍️ Dynamic Inventory Management
- **Grouped Cart Logic:** Intelligent cart state that prevents duplicate rows. Multiple additions of the same fragrance are automatically quantified with a counter (e.g., *Oud Musk x3*).
- **Detailed Billing Engine:** Real-time calculation of **18% GST**, fixed delivery fees, and handling charges.
- **Reactive State:** Uses `localStorage` and a custom `updateCartUI` function to ensure the user's bag persists across browser refreshes.

### 🚚 Localized WhatsApp Checkout
A custom checkout flow optimized for the Indian market:
- **Comprehensive Logistics:** Captures Name, Mobile, and full Shipping Address.
- **Payment Method Integration:** Support for UPI, COD (with automatic surcharge calculation), and Payment Links.
- **The "Digital Packing Slip":** Formats orders into a professional, itemized WhatsApp message sent directly to the owner for fulfillment.

---

## 🛠️ Technical Stack
- **Architecture:** Pure Vanilla JavaScript (ES6+) for maximum speed and zero dependency overhead.
- **Frontend:** Semantic HTML5 and CSS3 utilizing Flexbox, CSS Grid, and custom properties.
- **Animations:** Intersection Observer API for scroll-triggered "reveals" and CSS keyframes for fluid UI transitions.
- **Icons:** FontAwesome Professional Library.

---

## 📂 Project Structure
```text
├── index.html      # The Core SPA (Home, Shop, Contact, Checkout views)
├── style.css       # Luxury styling, Morphing animations, & Responsive media queries
└── app.js          # Product engine, Grouped cart logic, & WhatsApp API integration