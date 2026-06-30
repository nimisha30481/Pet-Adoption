import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post(
      "http://127.0.0.1:5000/api/adopter/login",
      { email, password }
    );

    localStorage.setItem("user_token", res.data.access_token);
    window.location.href = "/user/pets";
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>User Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p style={{ marginTop: "10px" }}>
          New user? <Link to="/user/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}
