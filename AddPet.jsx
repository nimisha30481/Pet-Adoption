import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddPet() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    description: "",
    status: "available"
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/pets", form);
    nav("/pets");
  };

  return (
    <div className="page-content">
      <h2>Add Pet</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <input name="name" onChange={handleChange} placeholder="Name" />
        <input name="species" onChange={handleChange} placeholder="Species" />
        <input name="breed" onChange={handleChange} placeholder="Breed" />
        <textarea name="description" onChange={handleChange} />

        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}
