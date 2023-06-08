import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import ReactPaginate from 'react-paginate';

export default function ListEleve() {
  const [eleves, setEleves] = useState([]);
  const [classrms, setClassrms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [filteredEleves, setFilteredEleves] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4
  ;

  useEffect(() => {
    fetchEleves();
    fetchClassrms();
  }, []);

  useEffect(() => {
    filterEleves();
  }, [searchQuery, eleves, selectedClass, currentPage]);

  const fetchEleves = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/eleves/");
      setEleves(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClassrms = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/classrms");
      setClassrms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEleves = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/eleves/${id}`);
      console.log("Successfully deleted the eleve");
      fetchEleves();
    } catch (error) {
      console.log(error);
    }
  };

  const getClassrmNom = (classrmId) => {
    const classrm = classrms.find((c) => c.id === classrmId);
    return classrm ? classrm.nom : "";
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  const handleClassChange = (event) => {
    const classrmId = parseInt(event.target.value);
    setSelectedClass(classrmId);
    setCurrentPage(0); // Reset to first page when changing class
  };

  const filterEleves = () => {
    if (!searchQuery && !selectedClass) {
      setFilteredEleves(eleves);
      return;
    }
  
    const filtered = eleves.filter((eleve) => {
      const fullName = `${eleve.nom} ${eleve.prenom}`.toLowerCase();
      const search = searchQuery.toLowerCase();
      const classFilter = selectedClass ? eleve.classeid === parseInt(selectedClass) : true;
      return fullName.includes(search) && classFilter;
    });
  
    setFilteredEleves(filtered);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedEleves = filteredEleves.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="container">
      <div className="justify-content-center divp1">
        <div className="">
          <div className="text-center">
            <Link to={"/eleves/create-eleve"} className="btn btn-primary">
              Create Eleves
            </Link>
            <div className="mt-3">
              <label htmlFor="classe-select" className="form-label">
                Search by Classe:
              </label>
              <select
                id="classe-select"
                className="form-select"
                value={selectedClass || ""}
                onChange={handleClassChange}
              >
                <option value="">All</option>
                {classrms.map((classrm) => (
                  <option key={classrm.id} value={classrm.id}>
                    {classrm.nom}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control form-control-sm mt-3"
              placeholder="Search by Nom or Prénom"
              />
              </div>
              <div className="table-responsive mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Date de Naissance</th>
              <th>Adresse</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Classe</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEleves.length > 0 ? (
              paginatedEleves.map((row, key) => (
                <tr key={key}>
                  <td>{row.id}</td>
                  <td>{row.nom}</td>
                  <td>{row.prenom}</td>
                  <td>{row.naissance}</td>
                  <td>{row.adresse}</td>
                  <td>{row.email}</td>
                  <td>{row.telephone}</td>
                  <td>{getClassrmNom(row.classeid)}</td>
                  <td>
                    <Link
                      to={`/eleves/edit/${row.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteEleves(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="empty-message">
                  No eleves found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(filteredEleves.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  </div>
</div>
);
}
