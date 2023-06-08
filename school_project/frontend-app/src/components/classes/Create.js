import React , {useState} from "react";
import axion from "axios";
import {useNavigate} from "react-router-dom";

export default function Create(){
    const navigate= useNavigate();
    const [nom,setNom] = useState("");
    const [niveau,setNiveau] = useState("");

    const Create =async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom' , nom);
        formData.append('niveau' , niveau);

        await axion.post('http://127.0.0.1:8000/api/classrms',formData)
        .then(({data})=>{
            console.log(data.message)
            navigate('/classes/list')
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
                <h3 className="card-title text-center">Create Class</h3>
                <hr />
                <div className="form-wrapper">
                  <form onSubmit={Create}>
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">Class Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="className"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="classLevel" className="form-label">Class Level:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="classLevel"
                        value={niveau}
                        onChange={(e) => setNiveau(e.target.value)}
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