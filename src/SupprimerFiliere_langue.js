import axios from 'axios'
import React from 'react'

class SupprimerFiliere_langue extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            filiere_langue : {},
            filiere_langues : {},
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
                <select name="fil_id" id="filiere_langue_recherche" onChange={this.handleChange}>
                            
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

    rechercher(){
        axios({
            url : '/filiere_langues/'+this.state.filiere_langue.fil_id,
            method : "delete",
        }).then(res => {
            document.getElementById("delete_success").innerHTML = "Filière langue supprimer";
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
