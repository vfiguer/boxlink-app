// orders.js

export function createOrdersDatabase() {
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify({}));
  }
}

export function getOrdersByUserId(userId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || {};
  return orders[userId] || [];
}

export function addOrder(userId, orderItems) {
  const orders = JSON.parse(localStorage.getItem("orders")) || {};

  const newOrder = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    items: orderItems,
  };

  if (!orders[userId]) {
    orders[userId] = [];
  }

  orders[userId].push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
}
