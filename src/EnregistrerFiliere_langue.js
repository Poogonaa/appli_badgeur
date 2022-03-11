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
    }

    render() {
        return (
            <div>
                <h2>Enregistrement d'une filière Langue</h2>
                <br />
                <label>Code:</label>
                <br />
                <input type="text" name="code" value={this.state.filiere_langue.code} onChange={this.handleChange}/>
                <br /><br />
                <label>Nom:</label>
                <br />
                <input type="text" name="nom" value={this.state.filiere_langue.nom} onChange={this.handleChange}/>
                <br /><br />
                <button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button>
                <br />
                <div id="add_success">
                </div>
            </div>
        )
    }

    enregistrer() {
        axios({
            data:this.state.filiere_langue,
            method : "post",
            url : '/filiere_langues',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            document.getElementById("add_success").innerHTML = "<p>Ajout réussi!</p>";
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
