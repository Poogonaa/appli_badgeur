import React from 'react'
import axios from 'axios'

class EnregistrerCreneau extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            creneau : {},
        }
        this.enregistrer = this.enregistrer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Enregistrement d'un creneau</h2>
                <br />
                <label>Date:</label>
                <br />
                <input id="date" type="text" name="date" value={this.state.creneau.date} placeholder="JJ-MM-AAAA" onChange={this.handleChange}/>
                <br /><br />
                <label>Heure:</label>
                <br />
                <input id="heure_debut" type="text" name="heure_debut" value={this.state.creneau.heure_debut} placeholder="00h00" onChange={this.handleChange}/>
                <br /><br />
                <label>Durée:</label>
                <br />
                <input id="duree" type="text" name="duree" value={this.state.creneau.duree} placeholder="En minute" onChange={this.handleChange}/>
                <br /><br />
                <label>Salle:</label>
                <br />
                <input id="salle" type="text" name="salle" value={this.state.creneau.salle} placeholder="Salle du creneau" onChange={this.handleChange}/>
                <br /><br />
                <label>Type:</label>
                <br />
                <input id="type" type="text" name="type" value={this.state.creneau.type} placeholder="CM, TD, TP..." onChange={this.handleChange}/>
                <br /><br />
                <button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button>
                <br />
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
            data:this.state.creneau,
            method : "post",
            url : '/creneaux',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            alert('Creneau ajouté');
        })
    }

    handleChange(event){
        this.setState({
            creneau: {
                ...this.state.creneau,
                [event.target.name]: event.target.value
            }
        });

    }
}
export default EnregistrerCreneau
