import * as React from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router ,Routes,Route,Link } from 'react-router-dom';
import Create from "./components/classes/Create";
import Edit from "./components/classes/Edit";
import List from './components/classes/List';

import CreateEleve from "./components/eleves/CreateEleve";
import EditEleve from "./components/eleves/EditEleve";
import ListEleve from "./components/eleves/ListEleve";

import CreateEnseignant from "./components/enseignants/CreateEnseignant";
import EditEnseignant from "./components/enseignants/EditEnseignant";
import ListEnseignant from "./components/enseignants/ListEnseignant";

import CreateMatiere from "./components/matieres/CreateMatiere";
import EditMatiere from "./components/matieres/EditMatiere";
import ListMatiere from "./components/matieres/ListMatiere";

import CreateNote from "./components/Notes/CreateNote";
import EditNote from "./components/Notes/EditNote";
import ListNote from "./components/Notes/ListNote";

import Login from './Login/Login';



function App() {
  return (
    <Router>
<nav className="navbar navbar-expand-lg  bg-primary p-2">
  <a className="navbar-brand text-white" style={{fontSize:'28px' , fontFamily:'fantasy'}} href="#">School Management</a>
  <Link to={"/"} className="navbar-brand text-white">Eleves</Link> 
  <Link to={"/classes/list"} className="navbar-brand text-white ml-3">Classes</Link> 
  <Link to={"/enseignants"} className="navbar-brand text-white ml-3">Enseignant</Link>
  <Link to={"/matieres"} className="navbar-brand text-white ml-3">Matieres</Link>  
  <Link to={"/notes"} className="navbar-brand text-white ml-3">Notes</Link> 
  <Link to={"/login"} className="navbar-brand text-white ml-3">login</Link> 
 
  
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {/* <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to={"/classes/create"} className="nav-link text-warning">Create</Link> 
      </li>
    </ul> */}
  </div>
</nav>
<br/>

      <Routes>
      <Route path='/login' element={<Login/>}></Route>
    <Route path='/classes/create' element={<Create/>}></Route>
    <Route path='/classes/edit/:id' element={<Edit/>}></Route>
    <Route path='/classes/list' element={<List/>}></Route>

    <Route path='/eleves/create-eleve' element={<CreateEleve/>} />
    <Route path='/eleves/edit/:id' element={<EditEleve/>} />
    <Route path='/' element={<ListEleve/>}></Route>

    
    <Route path='/enseignants/create-enseignant' element={<CreateEnseignant/>} />
    <Route path='/enseignants/edit/:id' element={<EditEnseignant/>} />
    <Route path='/enseignants' element={<ListEnseignant/>}></Route>


    <Route path='/matieres/create-matieres' element={<CreateMatiere/>} />
    <Route path='/matieres/edit/:id' element={<EditMatiere/>} />
    <Route path='/matieres' element={<ListMatiere/>}></Route>
    

    <Route path='/notes/create-notes' element={<CreateNote/>} />
    <Route path='/notes/edit/:id' element={<EditNote/>} />
    <Route path='/notes' element={<ListNote/>}></Route>


      </Routes>
    </Router>
  );
}

export default App;
