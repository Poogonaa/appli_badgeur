import axios from 'axios'
import React from 'react'

class SupprimerFiliere_langue extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            filiere_langue : {},
            filiere_langues : {},
        }
        this.supprimer = this.supprimer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Supprimer un gestionnaire</h2>
                <label>Nom:</label>
                <br />
                <select name="fil_id" id="filiere_langue_recherche" onChange={this.handleChange}>
                            
                </select>
                <br />
                <br />
                <button className="btn btn-success start" onClick={this.supprimer} >Supprimer</button>
            </div>
        )   
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({url : '/filiere_langues/multi',
               method : "get",
        }).then(res => {
            this.setState({
                filiere_langues : res.data,
            });
            let filiere_langue_a = '<option value="">Choisir un nom</option>';
            for (const filiere_langue of this.state.filiere_langues) {
                filiere_langue_a += '<option value="'+filiere_langue.fil_id+'">'+filiere_langue.nom+'</option>';
              }
              document.getElementById("filiere_langue_recherche").innerHTML = filiere_langue_a;
        })
    }

    supprimer(){
        axios({
            url : '/filiere_langues/'+this.state.filiere_langue.fil_id,
            method : "delete",
        }).then(res => {
            alert("Filière langue supprimée");
            this.componentDidMount();
        })
    }

    handleChange(event){
        this.setState({
            filiere_langue: {
                ...this.state.filiere_langue,
                [event.target.name]: event.target.value
            }
        });

    }

}
export default SupprimerFiliere_langue
