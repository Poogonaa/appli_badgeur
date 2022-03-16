import React from 'react'
import axios from 'axios'

class ListerSeanceEffectuee extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            seances : {}
        }
        this.rechercher = this.rechercher.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Liste des Séances de Formation effectuées</h2>
                <table>
                    <thead>
                    <tr>
                        <td>Id de la séance</td>
                        <td>Durée effective</td>
                        <td>A été validée par le Responsable de la Formation</td>
                        <td>Commentaire</td>
                    </tr>
                    </thead>
                    <tbody id = "seances">
                    </tbody>                   
                </table>
            </div>
        )
    }


    rechercher(event){
        axios({
            url : 'localhost:8080/seancesformations/effectue/intervenant/'+sessionStorage.getItem("id"),
            method : "get",
        }).then(res => {
            this.setState({
                seances : res.data,
            });
            let listSeance = "";
            
            for (const uneSeance of this.state.seances) {
                
                listSeance += "<tr>";
                    listSeance += "<td>"+uneSeance.uti_id+"</td>";
                    listSeance += "<td>"+uneSeance.duree_effective+"</td>";
                    listSeance += "<td>"+uneSeance.valide+"</td>";
                    listSeance += "<td>"+uneSeance.commentaire+"</td>";
                listSeance += "</tr>"
            }
            document.getElementById("seances").innerHTML = listSeance;
        })
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Intervenant"){
            document.location.href = "/";
        }
    }

    handleChange(event){
        this.setState({
            seances: {
                ...this.state.seances,
                [event.target.name]: event.target.value
            }
        });
    }
}
export default ListerSeanceEffectuee
