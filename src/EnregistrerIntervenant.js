import React from 'react'
import axios from 'axios'

class EnregisterIntervenant extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateur : {},
        }
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
            </div>
        )
    }

    enregistrer() {
        console.log("enregistrer")
        axios({
            data:this.state.utilisateur,
            method : "post",
            url : '/intervenants',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            // res.data est l'objet javascript envoyé par le serveur
            // JSON.stringify transforme cet objet en chaîne pour pouvoir l'afficher
            console.log(JSON.stringify(res.data))
        })
    }

    handleChange(event){
        // immutable data
        this.setState({
            utilisateur: {
                ...this.state.utilisateur,
                [event.target.name]: event.target.value
            }
        });

    }
}
export default EnregisterIntervenant
