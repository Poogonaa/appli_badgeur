import axios from 'axios'
import React from 'react'

class ListerIntervenant extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateurs : {},
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Liste des intervenant</h2>
                <table>
                    <thead>
                    <tr>
                        <td>Login</td>
                        <td>Nom</td>
                        <td>Prenom</td>
                        <td>mail</td>
                    </tr>
                    </thead>
                    <tbody id = "utilisateur">
                    </tbody>                   
                </table>
            </div>
        )   
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({url : '/utilisateurs/multi',
               method : "get",
        }).then(res => {
            this.setState({
                utilisateurs : res.data,
            });

            let utilisateur_a = "";
            for (const utilisateur of this.state.utilisateurs) {
                if(utilisateur.dtype === "Intervenant"){
                    utilisateur_a += "<tr>";
                    utilisateur_a += "<td>"+utilisateur.login+"</td>";
                    utilisateur_a += "<td>"+utilisateur.nom+"</td>";
                    utilisateur_a += "<td>"+utilisateur.prenom+"</td>";
                    utilisateur_a += "<td>"+utilisateur.mail+"</td>";
                    utilisateur_a += "</tr>"
                }
              }
              document.getElementById("utilisateur").innerHTML = utilisateur_a;
        })
    }

}
export default ListerIntervenant
