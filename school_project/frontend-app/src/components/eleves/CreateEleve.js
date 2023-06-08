import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateEleve(){
    const navigate= useNavigate();
    const [nom,setNom] = useState("");
    const [prenom,setPrenom] = useState("");
    const [naissance,setNaissance] = useState("");
    const [adresse,setAdresse] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [telephone,setTelephone] = useState("");
    const [classeid,setClasseid] = useState("");
    const [classes, setClasses] = useState([]);



    useEffect(() => {
      fetchClasses(); 
    }, []);

    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/classrms");
        setClasses(response.data); 
      } catch (error) {
        console.log(error);
      }
    };

    const CreateEleve =async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom' , nom);
        formData.append('prenom' , prenom);
        formData.append('naissance' ,naissance );
        formData.append('adresse' ,adresse );
        formData.append('email' ,email );
        formData.append('password',password);
        formData.append('telephone' ,telephone );
        formData.append('classeid' ,classeid );

        await axios.post('http://127.0.0.1:8000/api/eleves', formData)
        .then(({data})=>{
            console.log(data.message)
            navigate('/')
        }).catch(({response})=>{
            if (response.status == 442) {
                console.log(response.data.console.errors)
            }
            else {
                console.log(response.data.message)
            }

        })
    }

    return(
      <div className="container">
        <br/>
        <br/>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8">
          <div className="card text-black" style={{ backgroundColor: "white" }}>
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Create Eleves</h3>
              <hr/>
              <form onSubmit={CreateEleve}>
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
                    type="date"
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
                  <label htmlFor="classLevel" className="form-label">Password:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="classLevel"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  <label htmlFor="classLevel" className="form-label">Classe:</label>
                  <select
                    className="form-control"
                    id="classLevel"
                    value={classeid}
                    onChange={(e) => setClasseid(e.target.value)}
                  >
                    <option value="">Select a class</option>
                    {classes.map((classItem) => (
                      <option key={classItem.id} value={classItem.id}>
                        {classItem.nom}
                      </option>
                    ))}
                  </select>
                </div>
    
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    )
}