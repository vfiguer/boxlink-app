// shipments.js

let shipmentsDB = [];

export function createShipmentsDatabase() {
  if (!localStorage.getItem("shipments")) {
    localStorage.setItem("shipments", JSON.stringify([]));
  }
  shipmentsDB = JSON.parse(localStorage.getItem("shipments"));
}

export function addShipment(userId, items) {
  shipmentsDB.push({
    userId,
    items,
    date: new Date().toISOString()
  });
  localStorage.setItem("shipments", JSON.stringify(shipmentsDB));
}

export function getShipmentsByUserId(userId) {
  return shipmentsDB.filter(s => s.userId === userId);
}
