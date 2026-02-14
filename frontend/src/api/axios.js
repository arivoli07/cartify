const productMap = { 1:{name:'iPhone 15',price:79999}, 2:{name:'Samsung Galaxy S24',price:69999}, 3:{name:'Dell Inspiron 14',price:55999}, 4:{name:'Sony WH-CH520',price:3999}, 5:{name:'Mi Smart Band 8',price:2499}, 6:{name:'Logitech M331',price:1299}, 7:{name:'Philips Air Fryer',price:8999}, 8:{name:'JBL Go 3',price:2999}, 9:{name:'Havells Mixer Grinder',price:3499} };
const getUser = () => { const raw = localStorage.getItem('cartify_user'); if (!raw) return { username: 'user', email: 'guest@demo.com' }; try { return JSON.parse(raw); } catch { return { username: 'user', email: 'guest@demo.com' }; } };
const cartKey = () => 'cartify_cart_' + (getUser().email || 'guest@demo.com');
const normalize = (items) => (items || []).map((i) => ({ id: Number(i.id), name: i.name || (productMap[Number(i.id)]?.name || 'Product'), price: Number(i.price || (productMap[Number(i.id)]?.price || 0)), imageUrl: i.imageUrl || '', quantity: Number(i.quantity || 1) }));
const readCart = () => normalize(JSON.parse(localStorage.getItem(cartKey()) || '[]'));
const writeCart = (items) => localStorage.setItem(cartKey(), JSON.stringify(normalize(items)));
const api = {
  get: (path) => { if (path === '/api/cart') return Promise.resolve({ data: readCart() }); if (path === '/api/users/me') return Promise.resolve({ data: getUser() }); return Promise.resolve({ data: [] }); },
  post: (path, body) => {
    if (path === '/api/auth/login' || path === '/api/auth/register') { const user = { username: body?.username || (body?.email || 'user').split('@')[0], email: body?.email || 'guest@demo.com' }; localStorage.setItem('cartify_user', JSON.stringify(user)); localStorage.setItem('token', 'demo-token'); return Promise.resolve({ data: 'demo-token' }); }
    if (path === '/api/cart/items') { const items = readCart(); const id = Number(body?.productId); const qty = Number(body?.quantity || 1); const p = productMap[id] || { name: 'Product', price: 0 }; const existing = items.find((i) => i.id === id); if (existing) existing.quantity += qty; else items.push({ id, name: p.name, price: Number(p.price), imageUrl: '', quantity: qty }); writeCart(items); return Promise.resolve({ data: { ok: true } }); }
    return Promise.resolve({ data: { ok: true } });
  },
  put: (path, _body, config) => { const items = readCart(); const id = Number(path.split('/').pop()); const qty = Number(config?.params?.quantity || 1); const next = items.map((i) => i.id === id ? { ...i, quantity: qty } : i).filter((i) => i.quantity > 0); writeCart(next); return Promise.resolve({ data: { ok: true } }); },
  delete: (path) => { if (path === '/api/cart/clear') { writeCart([]); return Promise.resolve({ data: { ok: true } }); } const id = Number(path.split('/').pop()); writeCart(readCart().filter((i) => i.id !== id)); return Promise.resolve({ data: { ok: true } }); }
};
export default api;
