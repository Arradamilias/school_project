import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import ReactPaginate from "react-paginate";

export default function ListEnseignant() {
  const [enseignants, setEnseignants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEnseignants, setFilteredEnseignants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEnseignants();
  }, []);

  useEffect(() => {
    filterEnseignants(searchQuery);
  }, [searchQuery]);

  const fetchEnseignants = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/enseignants/");
      setEnseignants(response.data);
      setFilteredEnseignants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEnseignant = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/enseignants/${id}`);
        console.log("Enseignant supprimé avec succès");
        fetchEnseignants();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset current page when search query changes
  };

  const filterEnseignants = (query) => {
    const filtered = enseignants.filter(
      (enseignant) =>
        enseignant.nom.toLowerCase().includes(query.toLowerCase()) ||
        enseignant.prenom.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEnseignants(filtered);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedEnseignants = filteredEnseignants.slice(
    offset,
    offset + itemsPerPage
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <Link to={"/enseignants/create-enseignant"} className="btn btn-primary">
            Create Enseignant
          </Link>

          <br />
          <br />

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control mb-2"
            placeholder="Search by Name"
          />

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NOM</th>
                  <th scope="col">PRENOM</th>
                  <th scope="col">DATE NAISSANCE</th>
                  <th scope="col">ADRESSE</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">TELEPHONE</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedEnseignants.map((row, key) => (
                  <tr key={key}>
                    <td>{row.id}</td>
                    <td>{row.nom}</td>
                    <td>{row.prenom}</td>
                    <td>{row.naissance}</td>
                    <td>{row.adresse}</td>
                    <td>{row.email}</td>
                    <td>{row.telephone}</td>
                    <td>
                      <Link to={`/enseignants/edit/${row.id}`} className="btn btn-primary">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteEnseignant(row.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedEnseignants.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center">
                      No enseignants found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(filteredEnseignants.length / itemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}
