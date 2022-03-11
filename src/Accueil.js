import React from 'react'
import axios from 'axios'

class Accueil extends React.Component {

    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    render() {
        return (
            <div>
                <h2>Accueil</h2>
                <br />
                <div id = "utilisateur">
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(sessionStorage.getItem("id") !== undefined){
            axios({url : '/utilisateurs/'+sessionStorage.getItem("id"),
               method : "get",
            }).then(res => {
                this.setState({
                    utilisateur : res.data,
                });
                let utilisateur_a = "<table><thead><tr><td>Login</td><td>Nom</td><td>Prenom</td><td>mail</td></tr></thead><tbody>";
                utilisateur_a += "<tr>";
                utilisateur_a += "<td>"+this.state.utilisateur.login+"</td>";
                utilisateur_a += "<td>"+this.state.utilisateur.nom+"</td>";
                utilisateur_a += "<td>"+this.state.utilisateur.prenom+"</td>";
                utilisateur_a += "<td>"+this.state.utilisateur.mail+"</td>";
                utilisateur_a += "</tr></tbody></table>";
                document.getElementById("utilisateur").innerHTML = utilisateur_a;
            })
        }
    }
}
export default Accueil
