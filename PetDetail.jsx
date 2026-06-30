// frontend/src/pages/PetDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PetDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    api.get("/pets")
      .then((res) => {
        const found = (res.data || []).find(x => String(x.id) === String(id));
        setPet(found || null);
      })
      .catch((err) => {
        console.error("Failed to fetch pet list:", err);
        setPet(null);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this pet? This action cannot be undone.")) return;
    try {
      await api.delete(`/pets/${id}`);
      // go back to list
      nav("/pets");
    } catch (e) {
      console.error("Delete pet failed", e);
      alert("Failed to delete pet");
    }
  };

  if (!pet) return (
    <div>
      <p>Loading or pet not found.</p>
      <Link to="/">Back to list</Link>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontSize:24 }}>{pet.name || "Unnamed"}</h2>
      <div style={{ color:"#374151", marginBottom:8 }}>{pet.species} • {pet.breed}</div>
      <p style={{ color:"#6b7280" }}>{pet.description}</p>

      <div style={{ marginTop:12 }}>
        <strong>Status:</strong> {pet.status}
      </div>

      <div style={{ marginTop:16 }}>
        <Link to={`/pets/${id}/edit`} style={{ marginRight: 12 }}>Edit</Link>
        <button onClick={handleDelete} style={{ color: "white", background: "#ef4444", border: "none", padding: "8px 12px", borderRadius: 6 }}>
          Delete
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/pets">← Back to list</Link>
      </div>
    </div>
  );
}
