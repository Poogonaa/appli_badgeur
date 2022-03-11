import React from 'react'
import axios from 'axios'

class EnregistrerCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            cours : {},
        }
        this.enregistrer = this.enregistrer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Enregistrement d'un cours</h2>
                <br />
                <label>Nom:</label>
                <br />
                <input id="intitule" type="text" name="intitule" value={this.state.cours.intitule} placeholder="nom du cours" onChange={this.handleChange}/>
                <br /><br />
                <button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button>
                <br />
                <div id="add_success">
                </div>
            </div>
        )
    }

    componentDidMount(){

        if( sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
    }

    enregistrer() {
        axios({
            data:this.state.cours,
            method : "post",
            url : '/cours',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            if(document.getElementById("intitule").value ==="" ) {
                alert("Veuillez renseigner un nom pour le cours!");
                return false;
            }
            alert("Ajout réussi!");
            document.getElementById("intitule").value="";
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
export default EnregistrerCours
