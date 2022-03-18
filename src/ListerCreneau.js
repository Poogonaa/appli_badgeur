import axios from 'axios'
import React from 'react'

class ListerCreneau extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            creneau : {},
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
            <h2>Liste des creneaux</h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="row">Date</th>
                    <th scope="row">Heure</th>
                    <th scope="row">Durée</th>
                    <th scope="row">Salle</th>
                    <th scope="row">Type</th>
                </tr>
                </thead>
                <tbody id = "creneau">
                </tbody>                   
            </table>
        </div>
        )   
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({url : '/creneaux/multi',
               method : "get",
        }).then(res => {
            this.setState({
                creneaux : res.data,
            });
            let creneau_a = "";
            for (const creneau of this.state.creneaux) {
                creneau_a += "<tr>";
                creneau_a += "<td scope='row'>"+creneau.date+"</td>";
                creneau_a += "<td scope='row'>"+creneau.heure_debut+"</td>";
                creneau_a += "<td scope='row'>"+creneau.duree+"</td>";
                creneau_a += "<td scope='row'>"+creneau.salle+"</td>";
                creneau_a += "<td scope='row'>"+creneau.type+"</td>";
                creneau_a += "</tr>"
              }
              document.getElementById("creneau").innerHTML = creneau_a;
        })
    }



}
export default ListerCreneau
