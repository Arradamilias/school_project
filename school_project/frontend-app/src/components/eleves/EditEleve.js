import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEleve() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [naissance, setNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [classeid, setClasseid] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchEleve();
    fetchClasses();
  }, []);

  const fetchEleve = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/eleves/${id}`);
      setNom(data.nom);
      setPrenom(data.prenom);
      setNaissance(data.naissance);
      setAdresse(data.adresse);
      setEmail(data.email);
      setPassword(data.password)
      setTelephone(data.telephone);
      setClasseid(data.classeid);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClasses = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/classrms");
      setClasses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEleve = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("naissance", naissance);
    formData.append("adresse", adresse);
    formData.append("email", email);
    formData.append('password',password);
    formData.append("telephone", telephone);
    formData.append("classeid", classeid);

    try {
      await axios.post(`http://127.0.0.1:8000/api/eleves/${id}`, formData);
      navigate("/");
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
        <div className="col-12 col-sm-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Edit Eleve</h3>
              <hr />
              <form onSubmit={updateEleve}>
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">
                    Nom:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="prenom" className="form-label">
                    Prenom:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="naissance" className="form-label">
                    Naissance:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="naissance"
                    value={naissance}
                    onChange={(e) => setNaissance(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="adresse" className="form-label">
                    Adresse:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>


                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Password:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telephone" className="form-label">
                    Telephone:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="classeid" className="form-label">
                    Class ID:
                  </label>
                  <select
                    id="classeid"
                    className="form-select"
                    value={classeid}
                    onChange={(e) => setClasseid(e.target.value)}
                  >
                    <option value="">Select a Class</option>
                    {classes.map((classe) => (
                      <option value={classe.id} key={classe.id}>
                        {classe.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 text-center">
                  <button type="submit" className="btn btn-primary">
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
