import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9092/api/auth/login",
        {
          email,
          password,
        }
      );

      // backend returns token as plain string
      localStorage.setItem("token", response.data);

      alert("Login successful");
      navigate("/products");
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
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
