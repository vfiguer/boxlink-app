// Crear base de datos de tiendas con datos predefinidos si no existe
export function createStoreDatabase() {
  if (!localStorage.getItem("stores")) {
    const stores = [
      {
        id: "store1",
        name: "Tienda Techie",
        address: "Calle Falsa 123",
        products: [
          {
            id: "p1",
            name: "Smartphone X",
            description: "Teléfono inteligente de última generación",
            price: 799.99,
          },
          {
            id: "p2",
            name: "Laptop Pro",
            description: "Portátil potente para profesionales",
            price: 1299.99,
          },
        ],
      },
      {
        id: "store2",
        name: "La Boutique",
        address: "Avenida Central 456",
        products: [
          {
            id: "p3",
            name: "Vestido de verano",
            description: "Vestido ligero y colorido para el verano",
            price: 59.99,
          },
          {
            id: "p4",
            name: "Zapatos de cuero",
            description: "Zapatos elegantes de cuero genuino",
            price: 120.0,
          },
        ],
      },
      {
        id: "store3",
        name: "Electro Mundo",
        address: "Plaza Mayor 789",
        products: [
          {
            id: "p5",
            name: "Televisor 4K",
            description: "Televisor con resolución ultra alta definición",
            price: 999.99,
          },
          {
            id: "p6",
            name: "Auriculares inalámbricos",
            description: "Auriculares bluetooth con cancelación de ruido",
            price: 199.99,
          },
        ],
      },
      {
        id: "store4",
        name: "Deportes y Más",
        address: "Calle Deportiva 101",
        products: [
          {
            id: "p7",
            name: "Bicicleta de montaña",
            description: "Bicicleta resistente para terrenos difíciles",
            price: 499.99,
          },
          {
            id: "p8",
            name: "Balón de fútbol",
            description: "Balón oficial de alta calidad",
            price: 39.99,
          },
        ],
      },
    ];

    localStorage.setItem("stores", JSON.stringify(stores));
  }
}

// Obtener todas las tiendas
export function getStores() {
  return JSON.parse(localStorage.getItem("stores")) || [];
}

// Obtener tienda por id
export function getStoreById(id) {
  const stores = getStores();
  return stores.find((store) => store.id === id) || null;
}

// Obtener productos de una tienda por id de tienda
export function getProductsByStoreId(storeId) {
  const store = getStoreById(storeId);
  return store ? store.products : [];
}

// Obtener producto por id de tienda y producto
export function getProductById(storeId, productId) {
  const products = getProductsByStoreId(storeId);
  return products.find((p) => p.id === productId) || null;
}
