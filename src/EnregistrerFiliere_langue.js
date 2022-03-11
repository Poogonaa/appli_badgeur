import React from 'react'
import axios from 'axios'

class EnregistrerFiliere_langue extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            filiere_langue : {},
        }
        this.enregistrer = this.enregistrer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Enregistrement d'une filière Langue</h2>
                <br />
                <label>Code:</label>
                <br />
                <input id="code" type="text" name="code" value={this.state.filiere_langue.code} placeholder="code filiere" onChange={this.handleChange}/>
                <br /><br />
                <label>Nom:</label>
                <br />
                <input id="nom" type="text" name="nom" value={this.state.filiere_langue.nom} placeholder="nom filiere" onChange={this.handleChange}/>
                <br /><br />
                <button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button>
                <br />
                <div id="add_success">
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
    }

    enregistrer() {
        axios({
            data:this.state.filiere_langue,
            method : "post",
            url : '/filiere_langues',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            if(document.getElementById("code").value ==="" ) {
                alert("Veuillez renseigner le code de la composante!");
                return false;
            }
            if(document.getElementById("nom").value ==="" ) {
                alert("Veuillez renseigner le nom de la composante!");
                return false;
            }
            alert("Ajout réussi!") ;
            document.getElementById("code").value = "";
            document.getElementById("nom").value = "";
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
export default EnregistrerFiliere_langue;
