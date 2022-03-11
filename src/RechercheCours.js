import axios from 'axios'
import React from 'react'

class RechercherCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            liste_cours : {},
            cours : {},
        }
        this.handleChange = this.handleChange.bind(this);
        this.rechercher = this.rechercher.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Rechercher un gestionnaire</h2>
                <label>Intitulé:</label>
                <br />
                <select name="cou_id" id="cours_recherche" onChange={this.handleChange}>
                            
                </select>
                <br /><br />
                <button className="btn btn-success start" onClick={this.rechercher} >Rechercher</button>
                <br/><br/>
                <p id="cours"></p>
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
                list_cours : res.data,
            });
            let cours_a = '<option value="">Choisir un Intitulé</option>';
            for (const un_cours of this.state.list_cours) {
                cours_a += '<option value="'+un_cours.cou_id+'">'+un_cours.intitule+'</option>';
              }
              document.getElementById("cours_recherche").innerHTML = cours_a;
        })
    }

    rechercher(){
        axios({
            method: "get",
            url: '/cours/'+this.state.cours.cou_id,
        }).then(res => {
            this.setState({
                cours: res.data
            });
            document.getElementById("cours").innerHTML = this.state.cours.intitule;
        })
    }

    handleChange(event){
        this.setState({
            cours: {
                ...this.state.cours,
                [event.target.name]: event.target.value
            }
        });

    }


}
export default RechercherCours
