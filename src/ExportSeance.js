/*
import React from 'react';
import axios from 'axios'
import { DataGrid, GridToolbarExport,
GridToolbarContainer } from '@material-ui/data-grid';
  
const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'duree', headerName: 'Durée (min)', width: 200 },
  { field: 'valide', headerName: 'Validé ?', width: 150 },
  { field: 'commentaire', headerName: 'Commentaire', width: 200 },

import React, { Component } from 'react';
import { CSVLink } from "react-csv";

const headers = [
  { label: "Id Utilisateur", key: "uti_id"},
  { label: "Id Séance", key: "sea_id" },
  { label: "Durée (min)", key: "dureeEffective" },
  { label: "Validé ?", key: "estEffectue" },
  { label: "Commentaire", key: "commentaire" }
  
];
 
class AsyncCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }
 
  getUserList = () => {
    /*let retourFetch = fetch('/seancesformations/valide/intervenant')
                .then(res => res.json());
    return retourFetch;*/
    return fetch('/seancesformations/valide/intervenant')
    .then(res => res.json());
  }
 
  downloadReport = async () => {
    const data = await this.getUserList();
    console.log(data);
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
