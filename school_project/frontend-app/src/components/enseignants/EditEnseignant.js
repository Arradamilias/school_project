import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEnseignant() {
  const navigate = useNavigate();

  const { id } = useParams();

    const [nom,setNom] = useState("");
    const [prenom,setPrenom] = useState("");
    const [naissance,setNaissance] = useState("");
    const [adresse,setAdresse] = useState("");
    const [email,setEmail] = useState("");
    const [telephone,setTelephone] = useState("");
    const [password,setPassword] = useState("");
    

  useEffect(() => {
    fetchEnseignant();
  }, []);

  const fetchEnseignant = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/enseignants/${id}`);
      console.log(data)
      setNom(data.nom);
      setPrenom(data.prenom);
      setNaissance(data.naissance);
      setAdresse(data.adresse);
      setEmail(data.email);
      setTelephone(data.telephone);
      setPassword(data.password);
      
    } catch (error) {
      console.log(error);
    }
  };
 // console.log(nom,niveau)

  const updateEnseignant = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("naissance",naissance);
    formData.append("adresse", adresse);
    formData.append("email",email);
    formData.append("telephone",telephone);
    formData.append('password' ,password );
    

    try {
      await axios.post(`http://127.0.0.1:8000/api/enseignants/${id}`, formData);
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
            <h3 className="card-title text-center">Edit Enseignant</h3>
            <hr />
            <div className="form-wrapper">
              <form onSubmit={updateEnseignant}>
                <div className="mb-3">
                  <label htmlFor="className" className="form-label">Nom:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="className"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <label htmlFor="classLevel" className="form-label">Prenom:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="classLevel"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <label htmlFor="classLevel" className="form-label">Naissance:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="classLevel"
                    value={naissance}
                    onChange={(e) => setNaissance(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <label htmlFor="classLevel" className="form-label">Adresse:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="classLevel"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <label htmlFor="classLevel" className="form-label">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="classLevel"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <label htmlFor="classLevel" className="form-label">Telephone:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="classLevel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </div>



                <div className="mb-3">
                  <label htmlFor="classLevel" className="form-label">Password:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="classLevel"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
  
                <div className="mb-3 text-center">
                  <button type="submit" className="btn btn-primary">Edit</button>
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
