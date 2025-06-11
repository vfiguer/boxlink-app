import { getProductById, getStoreById } from './stores.js';

$(document).ready(function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    $("#cart-container").html('<p class="text-center text-red-500">Debes iniciar sesión para ver tu carrito.</p>');
    return;
  }

  // Obtener el carrito del usuario: es un array de items {storeId, productId, quantity}
  // Ejemplo:
  // [
  //   {storeId: "store1", productId: "p1", quantity: 2},
  //   {storeId: "store2", productId: "p3", quantity: 1},
  // ]
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    $("#cart-container").html('<p class="text-center">Tu carrito está vacío.</p>');
    $("#cart-total").text("Total: 0.00€");
    return;
  }

  // Agrupar productos por tienda para mostrar ordenado
  const groupedByStore = {};
  cart.forEach(item => {
    if (!groupedByStore[item.storeId]) {
      groupedByStore[item.storeId] = [];
    }
    groupedByStore[item.storeId].push(item);
  });

  let totalPrice = 0;
  const $cartContainer = $("#cart-container");
  $cartContainer.empty();

  for (const storeId in groupedByStore) {
    const store = getStoreById(storeId);
    if (!store) continue;

    const $storeSection = $(`
      <section class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-4">${store.name}</h2>
        <div class="space-y-4" id="store-${storeId}-products"></div>
      </section>
    `);

    const $storeProductsContainer = $storeSection.find(`#store-${storeId}-products`);

    groupedByStore[storeId].forEach(item => {
      const product = getProductById(item.storeId, item.productId);
      if (!product) return;

      const productTotal = product.price * item.quantity;
      totalPrice += productTotal;

      const $productRow = $(`
        <div class="flex justify-between items-center border-b border-gray-200 pb-2">
          <div>
            <p class="font-semibold">${product.name}</p>
            <p class="text-sm text-gray-600">${product.description}</p>
            <p class="text-sm">Cantidad: ${item.quantity}</p>
          </div>
          <div class="text-right">
            <p class="font-semibold">${product.price.toFixed(2)}€ c/u</p>
            <p class="text-sm">Subtotal: ${productTotal.toFixed(2)}€</p>
            <button class="mt-2 text-red-600 hover:underline text-sm remove-product" data-store-id="${item.storeId}" data-product-id="${item.productId}">Eliminar</button>
          </div>
        </div>
      `);

      $storeProductsContainer.append($productRow);
    });

    $cartContainer.append($storeSection);
  }

  $("#cart-total").text(`Total: ${totalPrice.toFixed(2)}€`);

  // Evento eliminar producto
  $cartContainer.on("click", ".remove-product", function () {
    const storeId = $(this).data("store-id");
    const productId = $(this).data("product-id");

    cart = cart.filter(
      (item) => !(item.storeId === storeId && item.productId === productId)
    );

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // Recarga para actualizar la vista
  });

  // Vaciar carrito
  $("#clear-cart").on("click", function () {
    localStorage.removeItem("cart");
    location.reload();
  });

  $("#buy").on("click", function () {
      window.location.href = "/docs/orderConfirm.html";
  });

});
