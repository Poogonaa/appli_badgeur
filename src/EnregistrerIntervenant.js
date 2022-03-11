import React from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';

class EnregistrerIntervenant extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateur : {},
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.enregistrer = this.enregistrer.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Enregistrement d'un intervenant</h2>
                <br />
                <label>Login:</label>
                <br />
                <input id="login" type="text" name="login" required="true" value={this.state.utilisateur.login} placeholder="login" onChange={this.handleChange} />
                <br /><br />
                <label>Mot de passe:</label>
                <br />
                <input id="mdp" type="text" name="mdp" required value={this.state.utilisateur.mdp} placeholder="mot de passe" onChange={this.handleChange}/>
                <br /><br />
                <label>Nom:</label>
                <br />
                <input id="nom" type="text" name="nom" required value={this.state.utilisateur.nom} placeholder="nom" onChange={this.handleChange}/>
                <br /><br />
                <label>Prenom:</label>
                <br />
                <input id="prenom" type="text" name="prenom" required value={this.state.utilisateur.prenom} placeholder="prenom" onChange={this.handleChange}/>
                <br /><br />
                <label>Mail:</label>
                <br />
                <input id="mail" type="text" name="mail" required value={this.state.utilisateur.mail} placeholder="mail" onChange={this.handleChange}/>
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
            url : '/intervenants',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            if(document.getElementById("mdp").value ==="") {
                alert("Veuillez remplir tous les champs");
                return false;
            }
            if(document.getElementById("login").value ==="" ) {
                alert("Veuillez remplir tous les champs");
                return false;
            }
            
            if(document.getElementById("nom").value ==="" ) {
                alert("Veuillez remplir tous les champs");
                return false;
            }
            if(document.getElementById("prenom").value ==="" ) {
                alert("Veuillez remplir tous les champs");
                return false;
            }
            if(document.getElementById("mail").value ==="" ) {
                alert("mail must be filled out");
                return false;
            }
            alert("Ajout réussi!") ;
            document.getElementById("login").value="";
            document.getElementById("mdp").value="";
            document.getElementById("nom").value="";
            document.getElementById("prenom").value="";
            document.getElementById("mail").value="";
            
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
export default EnregistrerIntervenant
