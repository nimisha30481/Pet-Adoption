/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/api/adopter/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Signup failed");
        return;
      }

      alert("Signup successful. Please login.");
      navigate("/user/login");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <textarea name="address" placeholder="Address" onChange={handleChange} />

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/user/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "380px",
    background: "rgba(0,0,0,0.6)",
    padding: "24px",
    borderRadius: "12px",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
};
