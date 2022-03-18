import axios from 'axios'
import React from 'react'

class RechercherCreneau extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            creneau : {},
            creneaux : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Rechercher un creneau</h2>
                <label>Date:</label>
                <br />
                <select name="cre_id" id="creneau_recherche" onChange={this.handleChange}>
                            
                </select>
                <br />
                <br />
                <button className="btn btn-primary start" onClick={this.rechercher} >Rechercher</button>
                <br />
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
            let creneau_a = '<option value="">Choisir un nom</option>';
            for (const creneau of this.state.creneaux) {
                creneau_a += '<option value="'+creneau.cre_id+'">'+creneau.date+" "+creneau.heure_debut+'</option>';
              }
              document.getElementById("creneau_recherche").innerHTML = creneau_a;
        })
    }

    rechercher(){
        axios({
            url : '/creneaux/'+this.state.creneau.cre_id,
            method : "get",
        }).then(res => {
            this.setState({
                creneau : res.data,
            });
            let creneau_a = "";
            creneau_a += "<tr>";
            creneau_a += "<td scope='row'>"+this.state.creneau.date+"</td>";
            creneau_a += "<td scope='row'>"+this.state.creneau.heure_debut+"</td>";
            creneau_a += "<td scope='row'>"+this.state.creneau.duree+"</td>";
            creneau_a += "<td scope='row'>"+this.state.creneau.salle+"</td>";
            creneau_a += "<td scope='row'>"+this.state.creneau.type+"</td>";
            creneau_a += "</tr>"
            document.getElementById("creneau").innerHTML = creneau_a;
        })
    }

    handleChange(event){
        this.setState({
            creneau: {
                ...this.state.creneau,
                [event.target.name]: event.target.value
            }
        });

    }

}
export default RechercherCreneau
