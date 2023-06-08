import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/styles.css";
export default function ListNote() {
  const [notes, setNotes] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [selectedMatiere, setSelectedMatiere] = useState("");

  useEffect(() => {
    fetchNotes();
    fetchEleves();
    fetchMatieres();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/notes");
      setNotes(data);
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

  const deleteNotes = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/notes/${id}`);
        fetchNotes();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filterNotesByMatiere = (note) => {
    if (selectedMatiere === "") {
      return true;
    } else {
      return note.matiereid === parseInt(selectedMatiere);
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-12 col-md-10 text-center">
        <Link to={"/notes/create-notes"} className="btn btn-primary">
          Create Notes
        </Link>
        <br/>
        <br/>
        <div className="mb-3 text-center">
          <label htmlFor="matiereFilter" className="form-label ">Filter by Matiere:</label>
          <select
            id="matiereFilter"
            className="form-select"
            value={selectedMatiere}
            onChange={(e) => setSelectedMatiere(e.target.value)}
          >
            <option value="">All Matieres</option>
            {matieres.map((matiere) => (
              <option key={matiere.id} value={matiere.id}>
                {matiere.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Eleve</th>
                <th scope="col">Matiere</th>
                <th scope="col">Note</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {notes.filter(filterNotesByMatiere).map((note) => (
                <tr key={note.id}>
                  <td>{note.id}</td>
                  <td>
                    {eleves.find((eleve) => eleve.id === note.eleveid)?.nom}{" "}
                    {eleves.find((eleve) => eleve.id === note.eleveid)?.prenom}
                  </td>
                  <td>{matieres.find((matiere) => matiere.id === note.matiereid)?.nom}</td>
                  <td>{note.note}</td>
                  <td>
                    <Link to={`/notes/edit/${note.id}`} className="btn btn-primary me-2">
                      Edit
                    </Link>
                    </td>
                    <td>
                    <button className="btn btn-danger" onClick={() => deleteNotes(note.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
  );
}
