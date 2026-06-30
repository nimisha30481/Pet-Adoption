import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("http://127.0.0.1:5000/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.access_token);
    window.location.href = "/pets";
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Staff Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
