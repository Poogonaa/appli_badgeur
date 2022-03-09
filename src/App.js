import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import EnregistrerCours from './EnregistrerCours.js'
import ListerCours from './ListerCours.js'
import EnregistrerComposante from './EnregistrerComposante.js'
import ListerComposante from './ListerComposante.js'
import Accueil from './Accueil.js'
import EnregistrerIntervenant from './EnregistrerIntervenant.js'
import ListerIntervenant from './ListerIntervenant.js'

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
            <Route exact path="/EnregistrerIntervenant" element={<EnregistrerIntervenant/>} />
            <Route exact path="/ListerIntervenant" element={<ListerIntervenant/>} />
            <Route exact path="/EnregistrerComposante" element={<EnregistrerComposante />} />
            <Route exact path="/ListerComposante" element={<ListerComposante />} />

          </Routes>
        </Router>
      </div>
    )
  }
}

export default App
