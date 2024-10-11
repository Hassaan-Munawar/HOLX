document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); 
});
function getCartItems() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCartItems(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function renderCart() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; 

    let total = 0; 

    cartItems.forEach(item => {
        let pric = Number(item.price);
        const itemTotal = pric * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h5>${item.name}</h5>
                    <p class="text-muted">Price: $${item.price}</p>
                </div>
                <div class="item-quantity">
                    <label for="quantity-${item.id}">Quantity: </label>
                    <input type="number" value="${item.quantity}" min="1" id="quantity-${item.id}" class="form-control m-2" onchange="updateQuantity(${item.id}, this.value)">
                </div>
                <div class="item-price">
                    <p class="font-weight-bold m-2">$${itemTotal.toFixed(2)}</p>
                </div>
                <button class="btn btn-outline-danger btn-lg m-2" onclick="removeItem(${item.id})"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
    });

    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(id, quantity) {
    const cartItems = getCartItems();
    const updatedCartItems = cartItems.map(item => {
        if (item.id === id) {
            return { ...item, quantity: parseInt(quantity) }; 
        }
        return item;
    });

    saveCartItems(updatedCartItems);

    renderCart();
}

function removeItem(id) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.id !== id);

    saveCartItems(cartItems);

    renderCart();
}

const checkoutBtn = document.getElementById('checkout-btn');
const orderForm = document.getElementById('order-form');
const checkoutForm = document.querySelector('.checkout-form');
const orderConfirmation = document.querySelector('.order-confirmation');


checkoutBtn.addEventListener('click', () => {
    if(localStorage.getItem('cart') == null || localStorage.getItem('cart') == '[]'){
   
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your cart is empty !",
      });
    }
    else{
        checkoutForm.classList.remove('hidden');
    document.querySelector('.cart-summary').classList.add('hidden');
    }
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkoutForm.classList.add('hidden');
    orderConfirmation.classList.remove('hidden');
    document.querySelector('.cart-items').innerHTML = '<p>Your order is pending and will be dispatched in a few days.</p>';
    
    localStorage.removeItem('cart');
});

window.onload = function() {
    renderCart();
};

