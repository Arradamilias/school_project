import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/styles.css";

export default function ListMatiere() {
  const [matieres, setMatieres] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMatieres, setFilteredMatieres] = useState([]);

  useEffect(() => {
    fetchMatieres();
    fetchEnseignants();
  }, []);

  useEffect(() => {
    filterMatieres();
  }, [searchQuery, matieres]);

  const fetchMatieres = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/matieres/");
      setMatieres(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEnseignants = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/enseignants/");
      setEnseignants(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMatieres = async (id) => {
    if (window.confirm("Are you sure you want to delete this matiere?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/matieres/${id}`);
        console.log("Matiere deleted successfully");
        fetchMatieres();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getEnseignantName = (enseignantId) => {
    const enseignant = enseignants.find((item) => item.id === enseignantId);
    if (enseignant) {
      return enseignant.nom + " " + enseignant.prenom;
    }
    return "";
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterMatieres = () => {
    if (!searchQuery) {
      setFilteredMatieres(matieres);
      return;
    }

    const filtered = matieres.filter((matiere) => {
      const nom = matiere.nom.toLowerCase();
      const search = searchQuery.toLowerCase();
      return nom.includes(search);
    });

    setFilteredMatieres(filtered);
  };

  return (
    <div className="container">
  <div className="row">
    <div className="col-12 text-center">
      
      <Link to={"/matieres/create-matieres"} className=" btn btn-primary">
        Create Matieres
      </Link>

<br/>
<br/>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="form-control form-control-sm mb-2"
        placeholder="Search by Name"
      />

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NOM</th>
              <th scope="col">Enseignant</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatieres.length > 0 &&
              filteredMatieres.map((row, key) => (
                <tr key={key}>
                  <td>{row.id}</td>
                  <td>{row.nom}</td>
                  <td>{getEnseignantName(row.enseignantid)}</td>
                  <td>
                    <Link to={`/matieres/edit/${row.id}`} className="btn btn-primary btn-sm">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteMatieres(row.id)}>
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
