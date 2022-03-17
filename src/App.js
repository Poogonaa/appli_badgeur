import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Accueil from './Accueil.js'
import Connexion from './Connexion.js'
import Deconnexion from './Deconnexion.js'

import EnregistrerCours from './EnregistrerCours.js'
import ListerCours from './ListerCours.js'
import RechercheCours from './RechercheCours.js'
import SupprimerCours from './SupprimerCours.js'
import ModifierCours from './ModifierCours.js'

import EnregistrerComposante from './EnregistrerComposante.js'
import ListerComposante from './ListerComposante.js'
import RechercherComposante from './RechercheComposante.js'
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

import EnregistrerFiliere_langue from './EnregistrerFiliere_langue.js'
import ListerFiliere_langue from './ListerFiliere_langue.js'
import RechercherFiliere_langue from './RechercheFiliere_langue.js'
import ModifierFiliere_langue from './ModifierFiliere_langue.js'
import SupprimerFiliere_langue from './SupprimerFiliere_langue.js'

import ListerSeanceEffectuee from './ListerSeanceEffectuee.js'
import Pointage from './Pointage.js'


class App extends React.Component {
  
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Accueil />} />
            <Route exact path="/Connexion" element={<Connexion/>}/>
            <Route exact path="/Deconnexion" element={<Deconnexion/>}/>

            <Route exact path="/EnregistrerCours" element={<EnregistrerCours />} />
            <Route exact path="/ListerCours" element={<ListerCours />} />
            <Route exact path="/RechercheCours" element={<RechercheCours />}/>
            <Route exact path="ModifierCours" element={<ModifierCours/>}/>
            <Route exact path="/SupprimerCours" element={<SupprimerCours />}/>

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

            <Route exact path="/EnregistrerFiliere_langue" element={<EnregistrerFiliere_langue />} />
            <Route exact path="/ListerFiliere_langue" element={<ListerFiliere_langue />} />
            <Route exact path="/RechercherFiliere_langue" element={<RechercherFiliere_langue />} />
            <Route exact path="/ModifierFiliere_langue" element={<ModifierFiliere_langue />} />
            <Route exact path="/SupprimerFiliere_langue" element={<SupprimerFiliere_langue />} />

            <Route exact path="/ListerSeanceEffectuee" element={<ListerSeanceEffectuee />}/>
            <Route exact path="/Pointage" element={<Pointage/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App
