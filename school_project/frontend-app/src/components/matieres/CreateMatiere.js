import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateMatiere() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [enseignantId, setEnseignantId] = useState("");
  const [enseignants, setEnseignants] = useState([]);

  useEffect(() => {
    fetchEnseignants();
  }, []);

  const fetchEnseignants = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/enseignants");
      setEnseignants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnseignantChange = (e) => {
    setEnseignantId(e.target.value);
  };

  const createMatiere = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("enseignantid", enseignantId);

    try {
      await axios.post("http://127.0.0.1:8000/api/matieres", formData);
      navigate("/matieres");
    } catch (error) {
      if (error.response.status === 442) {
        console.log(error.response.data.console.errors);
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Create Matiere</h3>
              <hr />
              <div className="form-wrapper">
                <form onSubmit={createMatiere}>
                  <div className="mb-3">
                    <label htmlFor="className" className="form-label">
                      Matiere Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="className"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="enseignantId" className="form-label">
                      Enseignant:
                    </label>
                    <select
                      className="form-select"
                      id="enseignantId"
                      value={enseignantId}
                      onChange={handleEnseignantChange}
                    >
                      <option value="">Select an enseignant</option>
                      {enseignants.map((enseignant) => (
                        <option key={enseignant.id} value={enseignant.id}>
                          {enseignant.nom} {enseignant.prenom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
