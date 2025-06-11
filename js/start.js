     import { addToCart } from './cart.js';
import { createStoreDatabase, getStoreById } from './stores.js';

      createStoreDatabase();

      const storeIds = ['store1', 'store2', 'store3'];
      const container = document.getElementById("featured-products");
      const loggedInUser = localStorage.getItem("loggedInUser");

      storeIds.forEach(storeId => {
        const store = getStoreById(storeId);
        if (store) {
          store.products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "bg-white rounded-lg shadow-md p-4 flex flex-col";
            productCard.innerHTML = `
              <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
              <p class="text-text mb-4 flex-grow">${product.description}</p>
              <div class="text-primary font-bold text-lg">${product.price.toFixed(2)}€</div>
            `;

            if (loggedInUser) {
              const btn = document.createElement("button");
              btn.className = "mt-4 bg-primary text-white py-2 rounded hover:bg-primary/90 transition";
              btn.textContent = "Añadir al carrito";
              btn.addEventListener("click", () => {
                addToCart(storeId, product.id);
                alert("Producto añadido al carrito");
              });
              productCard.appendChild(btn);
            }

            container.appendChild(productCard);
          });
        }
      });