import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Accueil from './Accueil.js'

import EnregistrerCours from './EnregistrerCours.js'
import ListerCours from './ListerCours.js'
import RechercheCours from './RechercheCours.js'
import DeleteCours from './DeleteCours.js'
import UpdateCours from './UpdateCours.js'

import EnregistrerComposante from './EnregistrerComposante.js'
import ListerComposante from './ListerComposante.js'

import EnregistrerIntervenant from './EnregistrerIntervenant.js'
import ListerIntervenant from './ListerIntervenant.js'
import RechercheIntervenant from './RechercheIntervenant.js'
import ModifierIntervenant from './ModifierIntervenant.js'
import SupprimerIntervenant from './SupprimerIntervenant.js'

import EnregistrerGestionnaire from './EnregistrerGestionnaire.js'
import ListerGestionnaire from './ListerGestionnaire.js'
import RechercheGestionnaire from './RechercheGestionnaire.js'
import ModifierGestionnaire from './ModifierGestionnaire.js'
import SupprimerGestionnaire from './SupprimerGestionnaire.js'

import EnregistrerFiliere_langue from './EnregistrerFiliere_langue.js'
import ListerFiliere_langue from './ListerFiliere_langue.js'
import RechercheFiliere_langue from './RechercheFiliere_langue.js'
import ModifierFiliere_langue from './ModifierFiliere_langue.js'
import SupprimerFiliere_langue from './SupprimerFiliere_langue.js'

import Connexion from './Connexion.js'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Accueil />} />
            <Route exact path="/EnregistrerCours" element={<EnregistrerCours />} />
            <Route exact path="/ListerCours" element={<ListerCours />} />
            <Route exact path="/RechercheCours" element={<RechercheCours />}/>
            <Route exact path="/DeleteCours" element={<DeleteCours />}/>
            <Route exact path="UpdateCours" element={<UpdateCours/>}/>

            <Route exact path="/EnregistrerIntervenant" element={<EnregistrerIntervenant/>} />
            <Route exact path="/ListerIntervenant" element={<ListerIntervenant/>} />
            <Route exact path="/RechercheIntervenant" element={<RechercheIntervenant/>} />
            <Route exact path="/ModifierIntervenant" element={<ModifierIntervenant/>}/>
            <Route exact path="/SupprimerIntervenant" element={<SupprimerIntervenant/>}/>

            <Route exact path="/EnregistrerGestionnaire" element={<EnregistrerGestionnaire/>} />
            <Route exact path="/ListerGestionnaire" element={<ListerGestionnaire/>} />
            <Route exact path="/RechercheGestionnaire" element={<RechercheGestionnaire/>} />
            <Route exact path="/ModifierGestionnaire" element={<ModifierGestionnaire/>}/>
            <Route exact path="/SupprimerGestionnaire" element={<SupprimerGestionnaire/>}/>

            <Route exact path="/EnregistrerFiliere_langue" element={<EnregistrerFiliere_langue/>} />
            <Route exact path="/ListerFiliere_langue" element={<ListerFiliere_langue/>} />
            <Route exact path="/RechercheFiliere_langue" element={<RechercheFiliere_langue/>} />
            <Route exact path="/ModifierFiliere_langue" element={<ModifierFiliere_langue/>}/>
            <Route exact path="/SupprimerFiliere_langue" element={<SupprimerFiliere_langue/>}/>

            <Route exact path="/EnregistrerComposante" element={<EnregistrerComposante />} />
            <Route exact path="/ListerComposante" element={<ListerComposante />} />

            <Route exact path="/Connexion" element={<Connexion/>}/>

          </Routes>
        </Router>
      </div>
    )
  }
}

export default App
