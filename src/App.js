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
import RechercherComposante from './RechercherComposante.js'
import ModifierComposante from './ModifierComposante.js'
import SupprimerComposante from './SupprimerComposante.js'


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

            <Route exact path="/EnregistrerComposante" element={<EnregistrerComposante />} />
            <Route exact path="/ListerComposante" element={<ListerComposante />} />
            <Route exact path="/RechercherComposante" element={<RechercherComposante />} />
            <Route exact path="/ModifierComposante" element={<ModifierComposante />} />
            <Route exact path="/SupprimerComposante" element={<SupprimerComposante />} />

          </Routes>
        </Router>
      </div>
    )
  }
}

export default App
