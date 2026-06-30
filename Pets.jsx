/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const TABS = [
  { label: "Available", value: "available" },
  { label: "Pending", value: "pending_adoption" },
  { label: "Adopted", value: "adopted" },
  { label: "Fostered", value: "fostered" },
  { label: "Unavailable", value: "not_available" }
];

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [status, setStatus] = useState("available");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPets();
  }, [status]);

  const loadPets = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/pets?status=${status}`);
      setPets(res.data || []);
    } catch (e) {
      alert("Failed to load pets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this pet?")) return;
    await api.delete(`/pets/${id}`);
    loadPets();
  };

  return (
    <div className="page-content">
      <div className="list-header">
        <h2>Pet Records</h2>
        <Link to="/pets/add" className="btn btn-outline">+ Add Pet</Link>
      </div>

      <div className="status-tabs">
        {TABS.map(t => (
          <button
            key={t.value}
            className={status === t.value ? "active" : ""}
            onClick={() => setStatus(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid-cards">
          {pets.map(p => (
            <div key={p.id} className="pet-card">
              <div className="pet-placeholder">
                {(p.name || "Pet").slice(0, 2).toUpperCase()}
              </div>

              <div className="pet-card-body">
                <h3>{p.name}</h3>
                <p>{p.species} • {p.breed}</p>
                <p>{p.description}</p>

                <div className="card-actions">
                  <Link to={`/pets/${p.id}/edit`}>Edit</Link>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            </div>
        ))}
        </div>
      )}
    </div>
  );
}
