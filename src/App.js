import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import EnregistrerCours from './EnregistrerCours.js'
import ListerCours from './ListerCours.js'
import Accueil from './Accueil.js'

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
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App
