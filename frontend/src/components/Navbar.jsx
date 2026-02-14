import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { getProfile } from "../api/userApi";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!token) {
      setUsername("");
      return;
    }
    getProfile()
      .then((res) => {
        setUsername(res.data.username || res.data.email || "");
      })
      .catch(() => {
        setUsername("");
      });
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    localStorage.setItem("searchQuery", q);
    navigate("/products", { state: { q } });
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <img src={logo} alt="Cartify" className="brand-logo" />
          <Link to="/products" className="brand-name">
            Cartify
          </Link>
          <span className="brand-tag">curated picks</span>
        </div>

        {!isAuthPage && (
          <form className="nav-search" onSubmit={handleSearch}>
            <input
              className="search-input"
              placeholder="Search for products, brands and more"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        )}

        <div className="nav-actions">
          {!isAuthPage && (
            <>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link${isActive ? " nav-link-active" : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-link${isActive ? " nav-link-active" : ""}`
                }
              >
                Cart
              </NavLink>
              {token && username ? (
                <span className="nav-user">Hi, {username}</span>
              ) : null}
            </>
          )}
          {token ? (
            <button onClick={handleLogout} className="btn btn-ghost">
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `btn btn-ghost${isActive ? " btn-active" : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `btn btn-primary${isActive ? " btn-active" : ""}`
                }
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
