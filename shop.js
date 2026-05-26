// Shop Page Specific Logic
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function renderGrid(data) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    if (data.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #888;">No fragrances found.</div>`;
        return;
    }
    grid.innerHTML = data.map((p, index) => `
        <div class="p-card reveal" style="animation-delay: ${(index % 10) * 0.05}s">
            <div class="img-container">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="p-details">
                <small class="gold-text">${p.category}</small>
                <h3 class="serif-text">${p.name}</h3>
                <span class="p-price">₹${p.price.toLocaleString('en-IN')}</span>
                <button class="cta-gold" onclick="addToCart(${p.id})">ADD TO BAG</button>
            </div>
        </div>
    `).join('');
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function applyFilters() {
    const searchInput = document.getElementById('shop-search');
    const categoryFilter = document.getElementById('category-filter');
    const priceSort = document.getElementById('price-sort');
    
    const searchTerm = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;
    const sort = priceSort.value;
    
    let filtered = products.filter(p => {
        return p.name.toLowerCase().includes(searchTerm) && (cat === 'all' || p.category === cat);
    });
    
    if (sort === 'low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'high') filtered.sort((a, b) => b.price - a.price);
    
    renderGrid(filtered);
}

// Initialize shop page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('shop-search');
    const categoryFilter = document.getElementById('category-filter');
    const priceSort = document.getElementById('price-sort');
    
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (priceSort) priceSort.addEventListener('change', applyFilters);
    
    applyFilters();
    updateCartUI();
});