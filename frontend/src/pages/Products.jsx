import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";
import api from "../api/axios";
import iphone15Img from "../assets/Apple-iPhone-15_.webp";
import dellInspironImg from "../assets/Dell Inspiron 14.avif";
import mixerImg from "../assets/Havells Mixer Grinder.webp";
import jblGo3Img from "../assets/JBL_go _3.png";
import logitechM331Img from "../assets/Logitech M331.webp";
import miBand8Img from "../assets/Mi Smart Band 8.webp";
import airFryerImg from "../assets/Philips Air Fryer.webp";
import galaxyS24Img from "../assets/Samsung Galaxy S24.webp";
import sonyCh520Img from "../assets/Sony WH-CH520.webp";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(
    () => localStorage.getItem("searchQuery") || ""
  );
  const [category, setCategory] = useState(
    () => localStorage.getItem("categoryFilter") || "All"
  );
  const [offersOnly, setOffersOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const gridRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [highlightId, setHighlightId] = useState(null);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        setError("Unable to load products. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const stateQuery = location.state && typeof location.state.q === "string"
      ? location.state.q
      : localStorage.getItem("searchQuery") || "";
    setQuery(stateQuery);
  }, [location.key, location.state]);

  useEffect(() => {
    localStorage.setItem("categoryFilter", category);
  }, [category]);

  const offerNames = new Set([
    "iPhone 15",
    "Samsung Galaxy S24",
    "Philips Air Fryer",
    "JBL Go 3",
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (offersOnly && !offerNames.has(p.name)) return false;
      const matchCategory = category === "All" || p.category === category;
      if (!q) return matchCategory;
      const matchQuery = [p.name, p.description, p.category]
        .some((v) => v && v.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [products, query, category, offersOnly]);

  const addToCart = (product) => {
    api
      .post("/api/cart/items", { productId: product.id, quantity: 1 })
      .then(() => alert("Added to cart"))
      .catch(() => alert("Failed to add to cart"));
  };

  const purchaseNow = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  const goToDealOfDay = () => {
    const target = products.find((p) => p.name === "Sony WH-CH520");
    if (!target) return;
    setHighlightId(target.id);
    setSelectedProduct(target);
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setHighlightId(null), 2000);
  };

  const handleViewOffers = () => {
    setCategory("All");
    setQuery("");
    setOffersOnly(true);
    localStorage.setItem("searchQuery", "");
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fallbackByCategory = {
    Mobiles: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23eef2ff'/><rect x='150' y='40' width='100' height='220' rx='16' fill='%23111827'/><circle cx='200' cy='240' r='6' fill='%23fff'/></svg>",
    Laptops: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23f1f5f9'/><rect x='90' y='70' width='220' height='140' rx='8' fill='%23111827'/><rect x='70' y='220' width='260' height='16' rx='6' fill='%2394a3b8'/></svg>",
    "Home Utilities": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23fff7ed'/><rect x='120' y='80' width='160' height='140' rx='12' fill='%23c2410c'/><rect x='150' y='110' width='100' height='80' rx='8' fill='%23fed7aa'/></svg>",
    Kitchen: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23ecfeff'/><circle cx='200' cy='140' r='70' fill='%230ea5a4'/><rect x='120' y='210' width='160' height='20' rx='6' fill='%230f172a'/></svg>",
    Wearables: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23f5f3ff'/><rect x='150' y='70' width='100' height='160' rx='40' fill='%235b21b6'/><circle cx='200' cy='150' r='35' fill='%23ddd6fe'/></svg>",
    Accessories: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23f8fafc'/><rect x='130' y='110' width='140' height='80' rx='40' fill='%23334155'/></svg>",
    All: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23f8fafc'/><rect x='120' y='90' width='160' height='120' rx='12' fill='%2394a3b8'/></svg>",
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

  const getImageUrl = (product) =>
    localImagesByName[product.name] ||
    product.imageUrl ||
    fallbackByCategory[product.category] ||
    fallbackByCategory.All;

  return (
    <div className="page">
      <section className="category-row">
        {[
          "All",
          "Mobiles",
          "Laptops",
          "Home Utilities",
          "Kitchen",
          "Wearables",
          "Accessories",
        ].map((cat) => (
          <button
            key={cat}
            className={`chip ${category === cat ? "chip-active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="hero">
        <div className="hero-text">
          <h2>Everyday tech, carefully picked.</h2>
          <p>Discover top deals, trusted brands, and fast delivery.</p>
          <div className="hero-actions">
            <button
              className={`btn btn-primary ${!offersOnly ? "btn-active" : ""}`}
              onClick={() =>
                (() => {
                  setOffersOnly(false);
                  setCategory("All");
                  setQuery("");
                  localStorage.setItem("searchQuery", "");
                  gridRef.current?.scrollIntoView({ behavior: "smooth" });
                })()
              }
            >
              Browse products
            </button>
            <button
              className={`btn btn-ghost ${offersOnly ? "btn-active" : ""}`}
              onClick={handleViewOffers}
            >
              View offers
            </button>
          </div>
        </div>
        <div className="hero-card">
          <button className="deal-btn" onClick={goToDealOfDay}>
            <p className="hero-label">Deal of the day</p>
            <h3>Wireless Audio</h3>
            <p className="muted">Up to 40% off on select items</p>
          </button>
        </div>
      </section>

      <section className="section">
        <h3 className="section-title">Recommended for you</h3>
        {loading && <p className="muted">Loading products...</p>}
        {error && <p className="error">{error}</p>}
        <div className="product-grid" ref={gridRef}>
          {filtered.map((p) => (
            <article
              key={p.id}
              className={`product-card ${highlightId === p.id ? "product-highlight" : ""}`}
              onClick={() => setSelectedProduct(p)}
            >
              <div className="product-media">
                {getImageUrl(p) ? (
                  <img
                    src={getImageUrl(p)}
                    alt={p.name}
                    className="product-img"
                    onError={(e) => {
                      e.currentTarget.src =
                        fallbackByCategory[p.category] || fallbackByCategory.All;
                    }}
                  />
                ) : (
                  <div className="product-media-inner" />
                )}
                <span className="badge">{p.stock > 0 ? "In stock" : "Out"}</span>
              </div>
              <div className="product-body">
                <h4 className="product-title">{p.name}</h4>
                <p className="product-desc">
                  {p.description || "No description"}
                </p>
                <div className="product-footer">
                  <span className="price">₹{p.price}</span>
                  <button
                    className="btn btn-ghost"
                    onClick={() => addToCart(p)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedProduct ? (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-media">
              <img
                src={getImageUrl(selectedProduct)}
                alt={selectedProduct.name}
              />
            </div>
            <div className="modal-body">
              <h3>{selectedProduct.name}</h3>
              <p className="muted">{selectedProduct.description}</p>
              <p className="muted">Category: {selectedProduct.category}</p>
              <p className="price">₹{selectedProduct.price}</p>
              <div className="modal-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add to cart
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => purchaseNow(selectedProduct)}
                >
                  Purchase
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Products;

