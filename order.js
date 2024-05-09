document.addEventListener('DOMContentLoaded', ()=>{
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemCount = document.querySelector(".cart-icon span");
    const cartItemList = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    const cartIcon = document.querySelector(".cart-icon");
    const sidebar = document.querySelector(".sidebar");

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            const item = {
                name: document.querySelectorAll(".card .card-title")[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1)
            ),
                quantity: 1
            };
            const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }
            totalAmount += item.price;

            updateCartUI();
        });

        function updateCartUI() {
         updateCatItemCount(cartItems.length);
         updateCartItemList();
         updateCartTotal();   
        }

        function updateCatItemCount(count) {
            cartItemCount.textContent = count;
        }

        function updateCartItemList() {
            cartItemList.innerHTML = '';
            cartItems.forEach((item, index) => {
                const cartItem =document.createElement('div');
                cartItem.classList.add('cart-item', 'individual-cart-item');
                cartItem.innerHTML = `
                    <span> (${item.quantity}x) ${item.name}</span>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2,)}
                    <button class="remove-btn" data-index="${index}"> <i class="fa-solid fa-times"></i></button>
                    </span>
                `;
                cartItemList.appendChild(cartItem);


            });

            const removeButton = document.querySelectorAll('.remove-item');
             removeButton.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const index = event.target.dataset.index;
                    removeItemfromCart(index);
                });
            });
        }

        function removeItemfromCart(index) {
            const removeItem = cartItems.splice(index, 1)[0];
            totalAmount -= removeItem.price * removeItem.quantity;
            updateCartUI();
        }
        function updateCartTotal() {
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }
        cartIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        const closebutton = document.querySelector('.sidebar-close');
        closebutton.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    });
           
})