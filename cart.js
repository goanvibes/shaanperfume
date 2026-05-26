// Cart Management
let cart = JSON.parse(localStorage.getItem('shaan_haute_cart')) || [];

function addToCart(id) {
    const item = products.find(p => p.id === id);
    if (!item) return;
    
    const existingItem = cart.find(cartItem => cartItem.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
    triggerMorphingToast(item.name);
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById('cart-list');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    const checkoutSum = document.getElementById('checkout-sum-total');

    if (!list || !totalEl || !countEl) return; // Elements might not exist on home page

    let subtotal = 0;
    const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    countEl.innerText = totalItemsCount;

    if (cart.length === 0) {
        list.innerHTML = `<div style="text-align: center; color: #555; margin-top: 50px;">Your bag is empty.</div>`;
        totalEl.innerText = "₹0";
        if (checkoutSum) checkoutSum.innerText = "₹0";
    } else {
        const itemsHtml = cart.map((item) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            return `
                <div class="cart-item-row">
                    <div style="flex: 1;">
                        <h4 style="margin-bottom: 2px;">${item.name}</h4>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span class="gold-text" style="font-size: 0.8rem;">₹${item.price.toLocaleString('en-IN')}</span>
                            <span style="color: #888; font-size: 0.75rem;">Qty: ${item.quantity}</span>
                        </div>
                    </div>
                    <div style="text-align: right; margin-right: 15px;">
                        <span style="font-weight: 600; font-size: 0.9rem;">₹${itemTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button class="delete-item" onclick="removeItem(${item.id})"><i class="fas fa-trash-alt"></i></button>
                </div>`;
        }).join('');

        const tax = subtotal * 0.18;
        const delivery = 150;
        const otherCharges = 50;
        const grandTotal = subtotal + tax + delivery + otherCharges;

        const breakdownHtml = `
            <div style="border-top: 1px solid #222; margin-top: 15px; padding-top: 10px; font-size: 0.85rem; color: #aaa;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Items Subtotal:</span><span>₹${subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>GST (18%):</span><span>₹${tax.toLocaleString('en-IN')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Delivery Fee:</span><span>₹${delivery.toLocaleString('en-IN')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Handling Charges:</span><span>₹${otherCharges.toLocaleString('en-IN')}</span>
                </div>
            </div>
        `;

        list.innerHTML = itemsHtml + breakdownHtml;
        totalEl.innerText = `₹${grandTotal.toLocaleString('en-IN')}`;
        if (checkoutSum) checkoutSum.innerText = `₹${grandTotal.toLocaleString('en-IN')}`;
    }
    localStorage.setItem('shaan_haute_cart', JSON.stringify(cart));
}

function triggerMorphingToast(perfumeName) {
    const wrapper = document.getElementById('toast-wrapper');
    const msgStep = document.getElementById('toast-msg-step');
    const viewStep = document.getElementById('toast-view-step');
    document.getElementById('added-perfume-name').innerText = perfumeName;
    viewStep.style.display = 'none';
    msgStep.style.display = 'flex';
    wrapper.classList.add('toast-show');
    setTimeout(() => {
        if (wrapper.classList.contains('toast-show')) {
            msgStep.style.opacity = '0';
            setTimeout(() => {
                msgStep.style.display = 'none';
                msgStep.style.opacity = '1';
                viewStep.style.display = 'flex';
            }, 400);
        }
    }, 2500);
}

function dismissToast() { 
    document.getElementById('toast-wrapper').classList.remove('toast-show'); 
}

function toggleCartDisplay() { 
    document.getElementById('cart-overlay').classList.toggle('open'); 
    dismissToast(); 
}

function openCart() { 
    document.getElementById('cart-overlay').classList.add('open'); 
    dismissToast(); 
}

function closeCart(e) { 
    if (!e || e.target.id === 'cart-overlay') 
        document.getElementById('cart-overlay').classList.remove('open'); 
}

function openCheckout() {
    if (cart.length === 0) return alert("Your bag is empty.");
    closeCart(null);
    document.getElementById('checkout-overlay').classList.remove('hidden');
}

function closeCheckout() { 
    document.getElementById('checkout-overlay').classList.add('hidden'); 
}

function finalizeOrder(e) {
    e.preventDefault();
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const payment = document.querySelector('input[name="pay_method"]:checked').value;

    const shaanWhatsapp = "919876543210"; 
    let msg = `*SHAAN PERFUMES ORDER*%0A%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*Address:* ${address}%0A%0A*Items:*%0A`;
    
    let subtotal = 0;
    cart.forEach(item => {
        const lineTotal = item.price * item.quantity;
        msg += `- ${item.name} x${item.quantity} (₹${lineTotal.toLocaleString('en-IN')})%0A`;
        subtotal += lineTotal;
    });

    const tax = subtotal * 0.18;
    const delivery = 150;
    const other = 50;
    let grandTotal = subtotal + tax + delivery + other;

    if (payment === 'COD') {
        grandTotal += 100;
        msg += `*COD Surcharge:* ₹100%0A`;
    }

    msg += `%0A*Bill Breakdown:*%0A`;
    msg += `- Subtotal: ₹${subtotal.toLocaleString('en-IN')}%0A`;
    msg += `- GST (18%): ₹${tax.toLocaleString('en-IN')}%0A`;
    msg += `- Delivery: ₹${delivery.toLocaleString('en-IN')}%0A`;
    msg += `- Handling: ₹${other.toLocaleString('en-IN')}%0A`;
    msg += `%0A*FINAL TOTAL: ₹${grandTotal.toLocaleString('en-IN')}*%0A*Payment:* ${payment}`;

    window.open(`https://wa.me/${shaanWhatsapp}?text=${msg}`, '_blank');
    
    cart = [];
    updateCartUI();
    localStorage.removeItem('shaan_haute_cart');
    closeCheckout();
    window.location.href = 'index.html';
}