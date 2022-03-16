import axios from 'axios'
import React from 'react'

class RechercherGestionnaire extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateur : {},
            utilisateurs : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Rechercher un gestionnaire</h2>
                <label>Login:</label>
                <br />
                <select name="uti_id" id="utilisateur_recherche" onChange={this.handleChange}>
                            
                </select>
                <br />
                <br />
                <button className="btn btn-success start" onClick={this.rechercher} >Rechercher</button>
                <br />
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
        axios({url : '/gestionnaires/multi',
               method : "get",
        }).then(res => {
            this.setState({
                utilisateurs : res.data,
            });
            let utilisateur_a = '<option value="">Choisir un login</option>';
            for (const utilisateur of this.state.utilisateurs) {
                utilisateur_a += '<option value="'+utilisateur.uti_id+'">'+utilisateur.login+'</option>';
              }
              document.getElementById("utilisateur_recherche").innerHTML = utilisateur_a;
        })
    }

    rechercher(){
        axios({
            url : '/gestionnaires/'+this.state.utilisateur.uti_id,
            method : "get",
        }).then(res => {
            this.setState({
                utilisateur : res.data,
            });
            let utilisateur_a = "";
            utilisateur_a += "<tr>";
            utilisateur_a += "<td>"+this.state.utilisateur.login+"</td>";
            utilisateur_a += "<td>"+this.state.utilisateur.nom+"</td>";
            utilisateur_a += "<td>"+this.state.utilisateur.prenom+"</td>";
            utilisateur_a += "<td>"+this.state.utilisateur.mail+"</td>";
            utilisateur_a += "</tr>"
            document.getElementById("utilisateur").innerHTML = utilisateur_a;
        })
    }

    handleChange(event){
        this.setState({
            utilisateur: {
                ...this.state.utilisateur,
                [event.target.name]: event.target.value
            }
        });

    }

}
export default RechercherGestionnaire
