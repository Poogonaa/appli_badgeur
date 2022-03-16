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
                <div>
                <table id = "utilisateur" className="table"></table>
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(sessionStorage.getItem("id") !== null){
            axios({url : '/utilisateurs/'+sessionStorage.getItem("id"),
               method : "get",
            }).then(res => {
                this.setState({
                    utilisateur : res.data,
                });
                let utilisateur_a = '<thead><tr><th>Login</th><th>Nom</th><th>Prenom</th><th>mail</th></tr></thead><tbody>';
                utilisateur_a += "<tr>";
                utilisateur_a += "<td>"+this.state.utilisateur.login+"</td>";
                utilisateur_a += "<td>"+this.state.utilisateur.nom+"</td>";
                utilisateur_a += "<td>"+this.state.utilisateur.prenom+"</td>";
                utilisateur_a += "<td>"+this.state.utilisateur.mail+"</td>";
                utilisateur_a += "</tr></tbody>";
                document.getElementById("utilisateur").innerHTML = utilisateur_a;
            })
        }
        else{
            document.getElementById("utilisateur").innerHTML = "Vous n'êtes pas connectés.";
        }
    }
}
export default Accueil
