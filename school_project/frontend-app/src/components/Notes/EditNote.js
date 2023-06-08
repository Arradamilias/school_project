import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [eleveid, setEleveid] = useState("");
  const [matiereid, setMatiereid] = useState("");
  const [note, setNote] = useState("");
  const [eleves, setEleves] = useState([]);
  const [matieres, setMatieres] = useState([]);

  useEffect(() => {
    fetchNote();
    fetchEleves();
    fetchMatieres();
  }, []);

  const fetchNote = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/notes/${id}`);
      setEleveid(data.note.eleveid);
      setMatiereid(data.note.matiereid);
      setNote(data.note.note);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEleves = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/eleves");
      setEleves(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMatieres = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/matieres");
      setMatieres(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("eleveid", eleveid);
    formData.append("matiereid", matiereid);
    formData.append("note", note);

    try {
      await axios.post(`http://127.0.0.1:8000/api/notes/${id}`, formData);
      navigate("/notes");
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
          <h3 className="card-title text-center">Edit Notes</h3>
          <hr />
          <div className="form-wrapper">
            <form onSubmit={updateNote}>
              <div className="mb-3">
                <label htmlFor="eleveid" className="form-label">
                  Eleve:
                </label>
                <select
                  className="form-control"
                  id="eleveid"
                  value={eleveid}
                  onChange={(e) => {
                    setEleveid(e.target.value);
                  }}
                >
                  <option value="">Select Eleve</option>
                  {eleves.map((eleve) => (
                    <option key={eleve.id} value={eleve.id}>
                      {eleve.nom} {eleve.prenom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="matiereid" className="form-label">
                  Matiere:
                </label>
                <select
                  className="form-control"
                  id="matiereid"
                  value={matiereid}
                  onChange={(e) => {
                    setMatiereid(e.target.value);
                  }}
                >
                  <option value="">Select Matiere</option>
                  {matieres.map((matiere) => (
                    <option key={matiere.id} value={matiere.id}>
                      {matiere.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="note" className="form-label">
                  Note:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="note"
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
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
