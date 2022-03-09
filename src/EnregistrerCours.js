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
    }

    render() {
        return (
            <div>
                <h2>Enregistrement d'un cours</h2>
                <br />
                <label>Intitulé:</label>
                <br />
                <input type="text" name="intitule" value={this.state.cours.intitule} onChange={this.handleChange}/>
                <br />
                <br />
                <button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button>
            </div>
        )
    }

    enregistrer() {
        console.log("enregistrer")
        axios({
            data:this.state.cours,
            method : "post",
            url : '/cours',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            // res.data est l'objet javascript envoyé par le serveur
            // JSON.stringify transforme cet objet en chaîne pour pouvoir l'afficher
            console.log(JSON.stringify(res.data))
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
export default EnregistrerCours
