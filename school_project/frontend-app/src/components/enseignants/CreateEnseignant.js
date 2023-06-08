import React , {useState} from "react";
import axion from "axios";
import {useNavigate} from "react-router-dom";

export default function CreateEnseignant(){
    const navigate= useNavigate();
    const [nom,setNom] = useState("");
    const [prenom,setPrenom] = useState("");
    const [naissance,setNaissance] = useState("");
    const [adresse,setAdresse] = useState("");
    const [email,setEmail] = useState("");
    const [telephone,setTelephone] = useState("");
    const [password,setPassword] = useState("");
    

    const CreateEnseignant =async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom' , nom);
        formData.append('prenom' , prenom);
        formData.append('naissance' ,naissance );
        formData.append('adresse' ,adresse );
        formData.append('email' ,email );
        formData.append('telephone' ,telephone );
        formData.append('password' ,password );
        

        await axion.post('http://127.0.0.1:8000/api/enseignants',formData)
        .then(({data})=>{
            console.log(data.message)
            navigate('/enseignants')
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
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">Create Enseignant</h3>
                <hr />
                <div className="form-wrapper">
                  <form onSubmit={CreateEnseignant}>
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">nom:</label>
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
                      <label htmlFor="classLevel" className="form-label">naissance:</label>
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
                      <label htmlFor="classLevel" className="form-label">telephone:</label>
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
                      <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
}