import React, { Component } from 'react';
import { CSVLink } from "react-csv";

const headers = [
  { label: "Login Intervenant", key: "intervenantDto.login"},
  { label: "Prénom", key: "intervenantDto.prenom"},
  { lable: "Nom", key: "intervenantDto.nom"},

  { label: "Intitulé Cours", key: "creneauDto.coursDto.intitule"},
  { label: "Date Séance", key: "creneauDto.date" },
  { label: "Heure Séance", key: "creneauDto.heure_debut" },
  { label: "Durée Prévue (min)", key: "creneauDto.duree" },
  { label: "Salle", key: "creneauDto.salle" },

  { label: "Durée Effective (min)", key: "dureeEffective" },
  { label: "Commentaire", key: "commentaire" }
];
 
class ExportSeance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }
 
  //on récupère une liste des Séances effectuées et validé par tous les Intervenants
  getUserList = () => {
    /*let retourFetch = fetch('/seancesformations/valide/intervenant')
                .then(res => res.json());
    return retourFetch;*/
    return fetch('/seancesformations/valide/intervenant')
    .then(res => res.json());
  }
 
  /*
    on récupère les données
  */
  downloadReport = async () => {
    const data = await this.getUserList();
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }
 
  render() {
    const { data } = this.state;
 
    return (
      <div>
        <input type="button" value="Export to CSV (Async)" onClick={this.downloadReport} />
        <CSVLink
          headers={headers}
          filename="Heures_effectuees_par_intervenants.csv"
          data={data}
          ref={this.csvLinkEl}
        />
      </div>
    );
  }
}
export default ExportSeance
