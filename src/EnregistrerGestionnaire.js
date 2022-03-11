import React from 'react'
import axios from 'axios'
import { sha256 } from 'js-sha256';

class EnregistrerGestionnaire extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateur : {},
        }
        this.enregistrer = this.enregistrer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Enregistrement d'un gestionnaire</h2>
                <br />
                <label>Login:</label>
                <br />
                <input type="text" name="login" value={this.state.utilisateur.login} onChange={this.handleChange}/>
                <br /><br />
                <label>Mot de passe:</label>
                <br />
                <input type="text" name="mdp" value={this.state.utilisateur.mdp} onChange={this.handleChange}/>
                <br /><br />
                <label>Nom:</label>
                <br />
                <input type="text" name="nom" value={this.state.utilisateur.nom} onChange={this.handleChange}/>
                <br /><br />
                <label>Prenom:</label>
                <br />
                <input type="text" name="prenom" value={this.state.utilisateur.prenom} onChange={this.handleChange}/>
                <br /><br />
                <label>Mail:</label>
                <br />
                <input type="text" name="mail" value={this.state.utilisateur.mail} onChange={this.handleChange}/>
                <br />
                <br />
                <button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button>
                <br />
                <div id="add_success">
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
    }

    enregistrer() {
        this.state.utilisateur.mdp = sha256(this.state.utilisateur.mdp+"7%Hv_Gwf&q%rX2cljOCC");
        axios({
            data:this.state.utilisateur,
            method : "post",
            url : '/gestionnaires',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            document.getElementById("add_success").innerHTML = "<p>Ajout réussi!</p>";
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
export default EnregistrerGestionnaire
