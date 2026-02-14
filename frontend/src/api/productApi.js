export const getProducts = () => { 
  return Promise.resolve({ 
    data: [ 
      { id: 1, name: 'iPhone 15', description: '4.7★ (12,842) - A16 Bionic - 48MP camera - 1 year warranty', price: 79999, stock: 10, category: 'Mobiles', imageUrl: '' }, 
      { id: 2, name: 'Samsung Galaxy S24', description: '4.6★ (10,491) - Galaxy AI features - AMOLED display - 1 year warranty', price: 69999, stock: 15, category: 'Mobiles', imageUrl: '' }, 
      { id: 3, name: 'Dell Inspiron 14', description: '4.4★ (3,188) - 13th Gen Intel - 14-inch FHD - 8GB RAM', price: 55999, stock: 8, category: 'Laptops', imageUrl: '' }, 
      { id: 4, name: 'Sony WH-CH520', description: '4.5★ (8,934) - 50h battery - Fast pair - Deep bass', price: 3999, stock: 30, category: 'Accessories', imageUrl: '' }, 
      { id: 5, name: 'Mi Smart Band 8', description: '4.3★ (5,217) - AMOLED band - Heart monitor - Sleep tracking', price: 2499, stock: 25, category: 'Wearables', imageUrl: '' }, 
      { id: 6, name: 'Logitech M331', description: '4.6★ (11,603) - Silent clicks - 2.4GHz wireless - 1 year battery', price: 1299, stock: 40, category: 'Accessories', imageUrl: '' }, 
      { id: 7, name: 'Philips Air Fryer', description: '4.5★ (6,791) - 1400W power - Low oil cooking - Easy clean basket', price: 8999, stock: 12, category: 'Kitchen', imageUrl: '' }, 
      { id: 8, name: 'JBL Go 3', description: '4.4★ (7,422) - IP67 rated - Punchy bass - 5h playtime', price: 2999, stock: 35, category: 'Accessories', imageUrl: '' }, 
      { id: 9, name: 'Havells Mixer Grinder', description: '4.2★ (2,557) - 750W motor - 3 jars - Stainless steel blades', price: 3499, stock: 18, category: 'Home Utilities', imageUrl: '' } 
    ] 
  }); 
};
