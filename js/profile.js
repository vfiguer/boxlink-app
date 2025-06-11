import { getUserById } from './accounts.js';
import { getOrdersByUserId } from './orders.js';
import { addShipment, createShipmentsDatabase, getShipmentsByUserId } from './shipments.js';
import { getProductById } from './stores.js';

const userId = localStorage.getItem("loggedInUser");
const user = getUserById(userId);

if (user) {
  document.getElementById("nombre").textContent = user.name;
  document.getElementById("email").textContent = user.email;
} else {
  alert("No has iniciado sesión.");
  window.location.href = "/docs/login.html";
}

createShipmentsDatabase();

const orders = getOrdersByUserId(userId);
const ordersSection = document.getElementById("orders-section");

if (orders && orders.length > 0) {
  const title = document.createElement("h3");
  title.className = "text-2xl font-bold mb-6 text-center";
  title.textContent = "Historial de Pedidos";
  ordersSection.appendChild(title);

  const ordersContainer = document.createElement("div");
  ordersContainer.className = "space-y-8";

  const shipmentForm = document.createElement("form");
  shipmentForm.id = "shipment-form";

  orders.forEach((order, index) => {
    const card = document.createElement("div");
    card.className = "bg-white border border-gray-200 rounded-xl shadow p-6";

    const header = document.createElement("h4");
    header.className = "text-lg font-semibold text-primary mb-4";
    header.textContent = `Pedido #${index + 1}`;
    card.appendChild(header);

    const shipments = getShipmentsByUserId(userId);

// Crear un conjunto de identificadores únicos para productos ya enviados
const sentProductKeys = new Set();
shipments.forEach(shipment => {
  shipment.items.forEach(item => {
    sentProductKeys.add(`${item.storeId}|${item.productId}|${item.orderIndex}`);
  });
});

    order.items.forEach((item, itemIndex) => {
      const key = `${item.storeId}|${item.productId}|${index}`;
      if (sentProductKeys.has(key)) return; // Este producto ya fue enviado

 
      const product = getProductById(item.storeId, item.productId);
      if (product) {
        const itemDiv = document.createElement("div");
        itemDiv.className = "flex justify-between items-center border-b border-gray-100 py-2";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "shipment-item";
        checkbox.value = JSON.stringify({ orderIndex: index, storeId: item.storeId, productId: item.productId });
        checkbox.className = "mr-2";

        const left = document.createElement("div");
        left.className = "flex items-center";
        left.appendChild(checkbox);
        left.innerHTML += `
          <div>
            <div class="text-base font-medium">${product.name}</div>
            <div class="text-sm text-gray-500">${product.description}</div>
          </div>
        `;

        const right = document.createElement("div");
        right.className = "text-primary font-semibold";
        right.textContent = `€${product.price.toFixed(2)}`;

        itemDiv.appendChild(left);
        itemDiv.appendChild(right);
        card.appendChild(itemDiv);
      }
    });

    ordersContainer.appendChild(card);
  });

  shipmentForm.appendChild(ordersContainer);

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Procesar Envío";
  submitBtn.className = "mt-6 bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition";
  shipmentForm.appendChild(submitBtn);

  ordersSection.appendChild(shipmentForm);
}

// Procesar envío
const form = document.getElementById("shipment-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const checkboxes = document.querySelectorAll("input[name='shipment-item']:checked");
    const selectedItems = Array.from(checkboxes).map(cb => JSON.parse(cb.value));
    if (selectedItems.length > 0) {
      addShipment(userId, selectedItems);
      alert("Envío procesado");
      location.reload();
    } else {
      alert("Selecciona al menos un producto para enviar.");
    }
  });
}

// Mostrar envíos
const shipments = getShipmentsByUserId(userId);
if (shipments.length > 0) {
  const shipmentsSection = document.createElement("section");
  shipmentsSection.className = "mt-12 max-w-4xl mx-auto";

  const title = document.createElement("h3");
  title.className = "text-2xl font-bold mb-6 text-center";
  title.textContent = "Envíos Realizados";
  shipmentsSection.appendChild(title);

  shipments.forEach((shipment, i) => {
    const card = document.createElement("div");
    card.className = "bg-white border border-gray-200 rounded-xl shadow p-6 mb-6";

    const header = document.createElement("h4");
    header.className = "text-lg font-semibold text-primary mb-4";
    header.textContent = `Envío #${i + 1}`;
    card.appendChild(header);

    shipment.items.forEach(item => {
      const product = getProductById(item.storeId, item.productId);
      if (product) {
        const itemDiv = document.createElement("div");
        itemDiv.className = "flex justify-between items-center border-b border-gray-100 py-2";

        const left = document.createElement("div");
        left.innerHTML = `
          <div class="text-base font-medium">${product.name}</div>
          <div class="text-sm text-gray-500">Pedido #${item.orderIndex + 1}</div>
        `;

        const right = document.createElement("div");
        right.className = "text-primary font-semibold";
        right.textContent = `€${product.price.toFixed(2)}`;

        itemDiv.appendChild(left);
        itemDiv.appendChild(right);
        card.appendChild(itemDiv);
      }
    });

    shipmentsSection.appendChild(card);
  });

  document.querySelector("main").appendChild(shipmentsSection);
}

// Cerrar sesión
const logoutBtn = document.getElementById("logout");
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "/docs/login.html";
});
