import React from 'react'
import axios from 'axios'

class ModifierGestionnaire extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateur : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.enregistrer = this.enregistrer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Rechercher un gestionnaire</h2>
                <label>Login:</label>
                <div>
                    <br />
                    <select name="uti_id" id="utilisateur" onChange={this.handleChange}>
                            
                    </select>
                    <br />
                    <br />
                    <button className="btn btn-success start" onClick={this.rechercher} >Rechercher</button>
                    <br />
                    <br />
                </div>
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
            method : "put",
            url : '/utilisateurs',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            // res.data est l'objet javascript envoyé par le serveur
            // JSON.stringify transforme cet objet en chaîne pour pouvoir l'afficher
            console.log(JSON.stringify(res.data))
        })
    }

    rechercher(event){
        console.log("afficher un intervenant")
        console.log(this.state.utilisateur)
        axios({
            url : '/utilisateurs/'+this.state.utilisateur.uti_id,
            method : "get",
        }).then(res => {
            this.setState({
                utilisateur : res.data,
            });
        })
    }

    componentDidMount(){
        console.log("lister les intervenants")
        axios({url : '/utilisateurs/multi',
               method : "get",
        }).then(res => {
            this.setState({
                utilisateurs : res.data,
            });
            let utilisateur_a = '<option value="">Choisir un login</option>';
            for (const utilisateur of this.state.utilisateurs) {
                if(utilisateur.dtype === "Gestionnaire"){
                    utilisateur_a += '<option value="'+utilisateur.uti_id+'">'+utilisateur.login+'</option>';
                }
              }
              document.getElementById("utilisateur").innerHTML = utilisateur_a;
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
export default ModifierGestionnaire
