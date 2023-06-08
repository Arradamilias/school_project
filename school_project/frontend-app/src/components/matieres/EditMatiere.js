import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMatiere() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [enseignantId, setEnseignantId] = useState("");
  const [enseignants, setEnseignants] = useState([]);

  useEffect(() => {
    fetchMatiere();
    fetchEnseignants();
  }, []);

  const fetchMatiere = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/matieres/${id}`);
      setNom(data.matiere.nom);
      setEnseignantId(data.matiere.enseignantid);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEnseignants = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/enseignants");
      setEnseignants(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMatiere = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("nom", nom);
    formData.append("enseignantid", enseignantId);

    try {
      await axios.post(`http://127.0.0.1:8000/api/matieres/${id}`, formData);
      navigate("/matieres");
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Edit Matiere</h3>
              <hr />
              <div className="form-wrapper">
                <form onSubmit={updateMatiere}>
                  <div className="mb-3">
                    <label htmlFor="nom" className="form-label">
                      Nom de Classe:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      value={nom}
                      onChange={(e) => {
                        setNom(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="enseignant" className="form-label">
                      Enseignant:
                    </label>
                    <select
                      id="enseignant"
                      className="form-select"
                      value={enseignantId}
                      onChange={(e) => {
                        setEnseignantId(e.target.value);
                      }}
                    >
                      <option value="">Select an Enseignant</option>
                      {enseignants.map((enseignant) => (
                        <option value={enseignant.id} key={enseignant.id}>
                          {enseignant.nom} {enseignant.prenom}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary mb-3">

                    Edit
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