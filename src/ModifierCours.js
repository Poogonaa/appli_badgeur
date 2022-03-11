import React from 'react'
import axios from 'axios'

class ModifierCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            cours : {},
        }
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Modification d'un cours</h2>
                <label>Intitulé:</label>
                <br />
                <select name="cou_id" id="cours_recherche" onChange={this.handleChange}>
                            
                </select>
                <br /><br />
                <label>Intitulé:</label>
                <br />
                <input type="text" name="intitule" value={this.state.cours.intitule} onChange={this.handleChange}/>
                <br /><br/>
                <button className="btn btn-success start" onClick={this.update} >Modifier</button>
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
            let cours_a = '<option value="">Choisir un cours</option>';
            for (const un_cours of this.state.list_cours) {
                cours_a += '<option value="'+un_cours.cou_id+'">'+un_cours.intitule+'</option>';
              }
              document.getElementById("cours_recherche").innerHTML = cours_a;
        })
    }

    update() {
        console.log("enregistrer")
        axios({
            data:this.state.cours,
            method : "put",
            url : '/cours',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            alert("Cours modifié");
            this.componentDidMount()
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
export default ModifierCours
