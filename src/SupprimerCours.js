import axios from 'axios'
import React from 'react'

class SupprimerCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            cours : {},
        }
        this.handleChange = this.handleChange.bind(this);
        this.supprimer = this.supprimer.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Supprimer un cours</h2>
                <label>Intitule:</label>
                <br />
                <select name="cou_id" id="cours_recherche" onChange={this.handleChange}>
                            
                </select>
                <br /><br/>
                <button className="btn btn-success start" onClick={this.supprimer} >Supprimer</button>
            </div>
        )   
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({url : '/cours/multi',
               method : "get",
        }).then(res => {
            this.setState({
                cours : res.data,
            });
            let cours_a = '<option value="">Choisir un intitule</option>';
            for (const un_cours of this.state.cours) {
                cours_a += '<option value="'+un_cours.cou_id+'">'+un_cours.intitule+'</option>';
              }
              document.getElementById("cours_recherche").innerHTML = cours_a;
        })
    }

    supprimer(){
        axios({
            method: "delete",
            url: '/cours/'+this.state.cours.cou_id,
        }).then(res => {
            alert("Cours supprimé");
            this.componentDidMount();
        })
    }

    handleChange(event){
        // immutable data
        this.setState({
            cours: {
                ...this.state.cours,
                [event.target.name]: event.target.value
            }
        });

    }


}
export default SupprimerCours
