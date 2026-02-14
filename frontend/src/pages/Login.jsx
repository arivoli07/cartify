import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = email.trim() || "Demo User";
    localStorage.setItem("token", "demo-token");
    localStorage.setItem(
      "cartify_user",
      JSON.stringify({
        username: userName,
        email: email.trim() || "demo@cartify.local",
      })
    );
    for (const key of Object.keys(localStorage)) {
      if (key.indexOf("cartify_cart_") === 0) localStorage.removeItem(key);
    }
    navigate("/products");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="eyebrow">Welcome back</p>
          <h2 className="auth-title">Sign in to Cartify</h2>
          <p className="muted">
            Access your saved cart and personalized picks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span className="label">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </label>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
