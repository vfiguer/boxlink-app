// cart.js

export function getCart() {
  // Devuelve el carrito completo, o un array vacío si no existe
  return JSON.parse(localStorage.getItem("cart")) || [];
}

/**
 * Añade un producto al carrito
 * @param {string} storeId - id de la tienda
 * @param {string} productId - id del producto
 * @param {number} quantity - cantidad a añadir (default 1)
 */
export function addToCart(storeId, productId, quantity = 1) {
  let cart = getCart();

  // Buscar si el producto ya está en el carrito
  const itemIndex = cart.findIndex(
    (item) => item.storeId === storeId && item.productId === productId
  );

  if (itemIndex >= 0) {
    // Ya existe: incrementamos cantidad
    cart[itemIndex].quantity += quantity;
  } else {
    // Nuevo producto
    cart.push({ storeId, productId, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}
