import axios from 'axios'
import React from 'react'

class SupprimerIntervenant extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateur : {},
            utilisateurs : {},
        }
        this.supprimer = this.supprimer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Supprimer un intervenant</h2>
                <label>Login:</label>
                <br />
                <select name="uti_id" id="utilisateur_recherche" onChange={this.handleChange}>
                            
                </select>
                <br />
                <br />
                <button className="btn btn-danger start" onClick={this.supprimer} >Supprimer</button>
            </div>
        )   
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({url : '/intervenants/multi',
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

    supprimer(){
        axios({
            url : '/intervenants/'+this.state.utilisateur.uti_id,
            method : "delete",
        }).then(res => {
            this.setState({
                utilisateur : res.data,
            });
            alert("Intevenant supprimé");
            this.componentDidMount();
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
export default SupprimerIntervenant
