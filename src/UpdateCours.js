import React from 'react'
import axios from 'axios'

class UpdateCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            cours : {},
        }
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Modification d'un cours</h2>
                <br />
                <p>id</p><input type="text" name="cou_id" value={this.state.cours.cou_id} onChange={this.handleChange}/>
                <br />
                <p>Intitule</p><input type="text" name="intitule" value={this.state.cours.intitule} onChange={this.handleChange}/>
                <br />
                <button className="btn btn-success start" onClick={this.update} >Modifier</button>
            </div>
        )
    }

    update() {
        console.log("enregistrer")
        axios({
            data:this.state.cours,
            method : "put",
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
export default UpdateCours
