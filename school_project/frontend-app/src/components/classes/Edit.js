import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [nom, setNom] = useState("");
  const [niveau, setNiveau] = useState("");

  useEffect(() => {
    fetchClasse();
  }, []);

  const fetchClasse = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/classrms/${id}`);
      console.log(data.classrm)
      setNom(data.classrm.nom);
      setNiveau(data.classrm.niveau);
    } catch (error) {
      console.log(error);
    }
  };
 // console.log(nom,niveau)

  const updateClasse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("nom", nom);
    formData.append("niveau", niveau);

    try {
      await axios.post(`http://127.0.0.1:8000/api/classrms/${id}`, formData);
      navigate("/classes/list");
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
          <h3 className="card-title text-center">Edit Classe</h3>
          <hr />
          <div className="form-wrapper">
            <form onSubmit={updateClasse}>
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
                <label htmlFor="niveau" className="form-label">
                  Niveau de Classe:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="niveau"
                  value={niveau}
                  onChange={(e) => {
                    setNiveau(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3 text-center">
                <button type="submit" className="btn btn-primary  mb-3">
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
