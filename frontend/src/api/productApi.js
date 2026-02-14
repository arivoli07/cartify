export const getProducts = () => { 
  return Promise.resolve({ 
    data: [ 
      { id: 1, name: 'iPhone 15', description: 'Apple smartphone', price: 79999, stock: 10, category: 'Mobiles', imageUrl: '' }, 
      { id: 2, name: 'Samsung Galaxy S24', description: 'Samsung flagship phone', price: 69999, stock: 15, category: 'Mobiles', imageUrl: '' }, 
      { id: 3, name: 'Dell Inspiron 14', description: 'Everyday laptop for work and study', price: 55999, stock: 8, category: 'Laptops', imageUrl: '' }, 
      { id: 4, name: 'Sony WH-CH520', description: 'Wireless on-ear headphones', price: 3999, stock: 30, category: 'Accessories', imageUrl: '' }, 
      { id: 5, name: 'Mi Smart Band 8', description: 'Fitness tracker with AMOLED display', price: 2499, stock: 25, category: 'Wearables', imageUrl: '' }, 
      { id: 6, name: 'Logitech M331', description: 'Silent wireless mouse', price: 1299, stock: 40, category: 'Accessories', imageUrl: '' }, 
      { id: 7, name: 'Philips Air Fryer', description: 'Healthy cooking with rapid air tech', price: 8999, stock: 12, category: 'Kitchen', imageUrl: '' }, 
      { id: 8, name: 'JBL Go 3', description: 'Portable Bluetooth speaker', price: 2999, stock: 35, category: 'Accessories', imageUrl: '' }, 
      { id: 9, name: 'Havells Mixer Grinder', description: 'Compact mixer grinder for daily use', price: 3499, stock: 18, category: 'Home Utilities', imageUrl: '' } 
    ] 
  }); 
};
