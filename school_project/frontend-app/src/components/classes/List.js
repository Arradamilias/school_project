import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function List() {
  const [classrms, setClassrms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClassrms, setFilteredClassrms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchClassrms();
  }, []);

  useEffect(() => {
    filterClassrms(searchQuery);
  }, [searchQuery]);

  const fetchClassrms = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/classrms/");
      setClassrms(response.data);
      setFilteredClassrms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClassrms = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette classe ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/classrms/${id}`);
        console.log("Classe supprimée avec succès");
        fetchClassrms();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset current page when search query changes
  };

  const filterClassrms = (query) => {
    const filtered = classrms.filter((classrm) =>
      classrm.nom.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClassrms(filtered);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedClassrms = filteredClassrms.slice(
    offset,
    offset + itemsPerPage
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <Link to={"/classes/create"} className="btn btn-primary">
            Create Classes
          </Link>

          <br />
          <br />

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control form-control-sm mb-2"
            placeholder="Search by Name"
          />

          <div className="table-responsive mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NOM</th>
                  <th scope="col">NIVEAU</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClassrms.map((row, key) => (
                  <tr key={key}>
                    <td>{row.id}</td>
                    <td>{row.nom}</td>
                    <td>{row.niveau}</td>
                    <td>
                      <Link
                        to={`/classes/edit/${row.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteClassrms(row.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(filteredClassrms.length / itemsPerPage)}
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
