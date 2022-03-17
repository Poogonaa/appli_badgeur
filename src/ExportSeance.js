import React from 'react';
import axios from 'axios'
import { DataGrid, GridToolbarExport,
GridToolbarContainer } from '@material-ui/data-grid';
  
const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'duree', headerName: 'Durée (min)', width: 200 },
  { field: 'valide', headerName: 'Validé ?', width: 150 },
  { field: 'commentaire', headerName: 'Commentaire', width: 200 },
];

let rows = [
  { id: 1, duree: 'Gourav', valide: 12},
  { id: 2, duree: 'Gourav', valide: 12 },
  { id: 3, duree: 'Gourav', valide: 12 },
  { id: 4, duree: 'Gourav', valide: 12 },
  { id: 5, duree: 'Gourav', valide: 12 },
  { id: 6, duree: 'Gourav', valide: 12 },
  { id: 7, duree: 'Gourav', valide: 12 },
  { id: 8, duree: 'Gourav', valide: 12 },
];
  

function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


class ExportSeance extends React.Component {
    constructor(props) {
      super(props)
      this.state={
          seances : {}
      }
      this.listSeance = [];
      this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
      return (
        <div style={{ height: 500, width: '80%' }}>
          <h4>
           How to use export our DataGrid
           as CSV in ReactJS?
          </h4>
          <div id="dataGrid"></div>
          
        </div>
      );
    }

    

    componentDidMount(){
      if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
          document.location.href = "/";
      }
      else{
        axios({
          url : '/seancesformations/valide/intervenant',
          method : "get",
        }).then(res => {
          this.setState({
              seances : res.data,
          });
          this.listSeance = new Array(this.state.seances.length);
          console.log("taille = "+this.state.seances.length)
          let i = 0;
          for (const uneSeance of this.state.seances) {
            this.listSeance[i] = { 
              id: uneSeance.sea_id,
              duree: uneSeance.dureeEffective, 
              valide: uneSeance.valide, 
              commentaire:uneSeance.commentaire 
            }
            i++;
          }
          let dataGrid = "";
          dataGrid += "<DataGrid rows={this.listSeance} columns={columns}";
          dataGrid += " pageSize={5}";
          dataGrid += " components={{Toolbar: MyExportButton,}}/>";
          document.getElementById("dataGrid").innerHTML = dataGrid;
          
          console.log("fin Requête axios");
          console.log(dataGrid);
        })
      }
  }

}
export default ExportSeance
