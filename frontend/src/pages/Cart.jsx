import { useEffect, useMemo, useState } from "react";
import iphone15Img from "../assets/Apple-iPhone-15_.webp";
import dellInspironImg from "../assets/Dell Inspiron 14.avif";
import mixerImg from "../assets/Havells Mixer Grinder.webp";
import jblGo3Img from "../assets/JBL_go _3.png";
import logitechM331Img from "../assets/Logitech M331.webp";
import miBand8Img from "../assets/Mi Smart Band 8.webp";
import airFryerImg from "../assets/Philips Air Fryer.webp";
import galaxyS24Img from "../assets/Samsung Galaxy S24.webp";
import sonyCh520Img from "../assets/Sony WH-CH520.webp";
import api from "../api/axios";

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/api/cart").then((res) => setItems(res.data)).catch(() => setItems([]));
  }, []);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const update = (next) => {
    setItems(next);
  };

  const localImagesByName = {
    "iPhone 15": iphone15Img,
    "Samsung Galaxy S24": galaxyS24Img,
    "Dell Inspiron 14": dellInspironImg,
    "Sony WH-CH520": sonyCh520Img,
    "Mi Smart Band 8": miBand8Img,
    "Logitech M331": logitechM331Img,
    "Philips Air Fryer": airFryerImg,
    "JBL Go 3": jblGo3Img,
    "Havells Mixer Grinder": mixerImg,
  };

  const getImageUrl = (item) =>
    localImagesByName[item.name] || item.imageUrl || "";

  const inc = (id) => {
    const current = items.find((i) => i.id === id);
    if (!current) return;
    api.put(`/api/cart/items/${id}`, null, { params: { quantity: current.quantity + 1 } })
      .then(() => update(items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))))
      .catch(() => {});
  };

  const dec = (id) => {
    const current = items.find((i) => i.id === id);
    if (!current) return;
    const nextQty = current.quantity - 1;
    api.put(`/api/cart/items/${id}`, null, { params: { quantity: nextQty } })
      .then(() => {
        if (nextQty <= 0) {
          update(items.filter((i) => i.id !== id));
        } else {
          update(items.map((i) => (i.id === id ? { ...i, quantity: nextQty } : i)));
        }
      })
      .catch(() => {});
  };

  const remove = (id) => {
    api.delete(`/api/cart/items/${id}`)
      .then(() => update(items.filter((i) => i.id !== id)))
      .catch(() => {});
  };

  const clear = () => {
    api.delete("/api/cart/clear")
      .then(() => update([]))
      .catch(() => {});
  };

  return (
    <div className="page">
      <section className="cart-header">
        <h2>My Cart</h2>
        <div className="cart-total">
          <span>Total</span>
          <strong>₹{total}</strong>
        </div>
      </section>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>No items yet</h3>
          <p className="muted">
            Browse products and add your favorites to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-thumb">
                  {getImageUrl(item) ? (
                    <img src={getImageUrl(item)} alt={item.name} />
                  ) : null}
                </div>
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p className="muted">₹{item.price}</p>
                </div>
                <div className="cart-qty">
                  <button className="btn btn-ghost" onClick={() => dec(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-ghost" onClick={() => inc(item.id)}>
                    +
                  </button>
                </div>
                <div className="cart-sub">
                  ₹{item.price * item.quantity}
                </div>
                <button className="btn btn-ghost" onClick={() => remove(item.id)}>
                  Remove
                </button>
                <button className="btn btn-primary" onClick={() => alert("Purchase placed (demo)")}>
                  Purchase
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
