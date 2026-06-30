import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditPet() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    description: "",
    status: "available"
  });

  useEffect(() => {
    api.get(`/pets/${id}`).then(res => {
      setForm(res.data);
    }).catch(() => {
      alert("Failed to load pet");
    });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.put(`/pets/${id}`, form);
    nav("/pets");
  };

  return (
    <div className="page-content">
      <h2>Edit Pet</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="species" value={form.species} onChange={handleChange} placeholder="Species" />
        <input name="breed" value={form.breed} onChange={handleChange} placeholder="Breed" />
        <textarea name="description" value={form.description} onChange={handleChange} />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="pending_adoption">Pending</option>
          <option value="adopted">Adopted</option>
          <option value="fostered">Fostered</option>
          <option value="not_available">Unavailable</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
