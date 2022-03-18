import axios from 'axios'
import React from 'react'

class SupprimerCreneau extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            creneau : {},
            creneaux : {},
        }
        this.supprimer = this.supprimer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Supprimer un creneau</h2>
                <label>Date:</label>
                <br />
                <select name="cre_id" id="creneau_recherche" onChange={this.handleChange}>
                            
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
        axios({url : '/creneaux/multi',
               method : "get",
        }).then(res => {
            this.setState({
                creneaux : res.data,
            });
            let creneau_a = '<option value="">Choisir un nom</option>';
            for (const creneau of this.state.creneaux) {
                creneau_a += '<option value="'+creneau.cre_id+'">'+creneau.date+" "+creneau.heure_debut+'</option>';
              }
              document.getElementById("creneau_recherche").innerHTML = creneau_a;
        })
    }

    supprimer(){
        axios({
            url : '/creneaux/'+this.state.creneau.cre_id,
            method : "delete",
        }).then(res => {
            alert("Creneau supprimé");
            this.componentDidMount();
        })
    }

    handleChange(event){
        this.setState({
            creneau: {
                ...this.state.creneau,
                [event.target.name]: event.target.value
            }
        });

    }

}
export default SupprimerCreneau
