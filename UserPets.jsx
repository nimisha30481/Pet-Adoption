/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const res = await api.get("/pets?status=available");
      setPets(res.data || []);
    } catch (e) {
      alert("Failed to load available pets");
    } finally {
      setLoading(false);
    }
  };

  const applyForAdoption = async (petId) => {
    try {
      await api.post("/applications", { pet_id: petId });
      alert("Application submitted!");
    } catch {
      alert("Failed to apply");
    }
  };

  return (
    <div className="page-content">
      <h2>Available Pets</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid-cards">
          {pets.map(p => (
            <div key={p.id} className="pet-card">
              <div className="pet-placeholder">
                {(p.name || "Pet").slice(0, 2).toUpperCase()}
              </div>

              <h3>{p.name}</h3>
              <p>{p.species} • {p.breed}</p>
              <p>{p.description}</p>

              <button onClick={() => applyForAdoption(p.id)}>
                Apply for Adoption
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
