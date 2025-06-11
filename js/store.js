import { addToCart } from './cart.js';
import { createStoreDatabase, getStoreById } from './stores.js';

$(document).ready(function () {
  createStoreDatabase();

  // Función para obtener parámetro de URL
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Obtener el id de la tienda desde la URL, por ejemplo: ?store=store1
  const storeId = getQueryParam("store");
  const $productsContainer = $("#products-container");
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!storeId) {
    $productsContainer.html(
      '<p class="col-span-full text-center text-red-500">No se especificó la tienda en la URL.</p>'
    );
    return;
  }

  const store = getStoreById(storeId);

  if (!store) {
    $productsContainer.html(
      '<p class="col-span-full text-center text-red-500">No se encontró la tienda.</p>'
    );
    return;
  }

  $("#title").text(store.name);
  store.products.forEach(function (product) {
    const $productCard = $(`
      <div class="bg-white rounded-lg shadow-md p-4 flex flex-col">
        <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
        <p class="text-text mb-4 flex-grow">${product.description}</p>
        <div class="text-primary font-bold text-lg">${product.price.toFixed(2)}€</div>
      </div>
    `);

    if (loggedInUser) {
      const $btn = $(`
        <button
          class="mt-4 bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
          data-product-id="${product.id}"
        >
          Añadir al carrito
        </button>
      `);

      $btn.on("click", function () {
        addToCart(storeId, product.id);
        alert("Producto añadido al carrito");
      });

      $productCard.append($btn);
    }

    $productsContainer.append($productCard);
  });
});
