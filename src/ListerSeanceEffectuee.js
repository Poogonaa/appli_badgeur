import React from 'react'
import axios from 'axios'

class ListerSeanceEffectuee extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            seances : {}
        }
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


    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Intervenant"){
            document.location.href = "/";
        }
        else{
            axios({
                url : '/seancesformations/effectue/intervenant/'+sessionStorage.getItem("id"),
                method : "get",
            }).then(res => {
                this.setState({
                    seances : res.data,
                });
                let listSeance = "";
                
                for (const uneSeance of this.state.seances) {
                    
                    listSeance += "<tr>";
                        listSeance += "<td>"+uneSeance.sea_id+"</td>";
                        listSeance += "<td>"+uneSeance.dureeEffective+"</td>";
                        if(uneSeance.valide === null)
                            listSeance += "<td>pas encore validé</td>"
                        else if(uneSeance.valide)
                            listSeance += "<td>Validé</td>";
                        else
                            listSeance += "<td>Non validé !!</td>"

                        listSeance += "<td>"+uneSeance.commentaire+"</td>";
                    listSeance += "</tr>"
                }
                document.getElementById("seances").innerHTML = listSeance;
            })
        }
       
    }

}
export default ListerSeanceEffectuee
