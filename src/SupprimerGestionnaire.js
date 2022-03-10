import axios from 'axios'
import React from 'react'

class SupprimerGestionnaire extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateur : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Supprimer un gestionnaire</h2>
                <label>Login:</label>
                <br />
                <select name="uti_id" id="utilisateur_recherche" onChange={this.handleChange}>
                            
                </select>
                <br />
                <br />
                <button className="btn btn-success start" onClick={this.rechercher} >Supprimer</button>
                <br />
                <div id = "delete_success">
                </div>
            </div>
        )   
    }

    componentDidMount(){
        console.log("lister les gestionnaires")
        axios({url : '/utilisateurs/multi',
               method : "get",
        }).then(res => {
            this.setState({
                utilisateurs : res.data,
            });
            let utilisateur_a = '<option value="">Choisir un login</option>';
            for (const utilisateur of this.state.utilisateurs) {
                console.log(utilisateur.dtype);
                if(utilisateur.dtype === "Gestionnaire"){
                    utilisateur_a += '<option value="'+utilisateur.uti_id+'">'+utilisateur.login+'</option>';
                }
              }
              document.getElementById("utilisateur_recherche").innerHTML = utilisateur_a;
        })
    }

    rechercher(){
        console.log("supprimer un intervenant")
        console.log(this.state.utilisateur)
        axios({
            url : '/utilisateurs/'+this.state.utilisateur.uti_id,
            method : "delete",
        }).then(res => {
            this.setState({
                utilisateur : res.data,
            });
            document.getElementById("delete_success").innerHTML = "Gestionnaire supprimer";
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
export default SupprimerGestionnaire
