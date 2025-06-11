import { clearCart, getCart } from "./cart.js";
import { addOrder, createOrdersDatabase } from "./orders.js";
import { getProductById } from "./stores.js";

$(document).ready(function () {
  createOrdersDatabase();

  const $cartItems = $("#cart-items");
  const userId = localStorage.getItem("loggedInUser");
  const cart = getCart();

  if (!userId) {
    $cartItems.html(`<p class="text-red-500">Debes iniciar sesión para ver el carrito.</p>`);
    $("#confirm-order").hide();
    return;
  }

  if (!cart || cart.length === 0) {
    $cartItems.html(`<p>No hay productos en el carrito.</p>`);
    $("#confirm-order").hide();
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const product = getProductById(item.storeId, item.productId);
    if (product) {
      total += product.price;

      const $item = $(`
        <div class="border-b border-gray-200 pb-2">
          <h3 class="text-lg font-semibold">${product.name}</h3>
          <p class="text-sm text-gray-600">${product.description}</p>
<div class="text-primary font-bold">€${product.price.toFixed(2)}</div>        </div>
      `);
      $cartItems.append($item);
    }
  });

  const $total = $(`<div class="mt-4 text-right font-bold text-lg text-primary">Total: €${total.toFixed(2)}</div>`);
  $cartItems.append($total);

  $("#confirm-order").on("click", function () {
    addOrder(userId, cart);
    clearCart();
    alert("Pedido confirmado");
window.location.href = "/docs/profile.html";

  });
});
