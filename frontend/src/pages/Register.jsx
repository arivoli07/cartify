import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("cartify_user", JSON.stringify({ username: form.username, email: form.email }));
    navigate("/products", { replace: true });
  };

  return (
    <div className="auth-page"><div className="auth-card"><form onSubmit={handleSubmit} className="auth-form"> 
      <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="input" /> 
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="input" /> 
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="input" /> 
      <button type="submit" className="btn btn-primary btn-block">Create account</button> 
    </form></div></div> 
  );
}

export default Register;
