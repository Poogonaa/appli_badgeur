import React from 'react'
import axios from 'axios'

class Pointage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pointage: {},
            pointages : {},
        };
        this.rechercher = this.rechercher.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

// apres la connexion un intervenant peut se pointer 
// on recupere son id et on affiche un formulaire avec des listes deroulante

render() {
    return(
        <div>
            <div>
                <h2>Les Cours attribues</h2>
                <label>Cours</label>
                <div>
                    <br></br>
                    <select name="cou_id" id="recherche_cours" onChange={this.handleChange} ></select>
                    <br/><br/>
                    <button className="btn btn-success start" onClick={this.rechercher}>Rechercher</button>
                </div>
            </div>
        
            <div>
                <h2> Les creneaux </h2>
                <div>
                <br></br>
                <select name="cre_id" id="recherche_creneau" onChange={this.handleChange}></select>
                <br/><br/>
                    <button className="btn btn-success start" onClick={this.rechercherCreneau}>Rechercher</button>
                </div>
            </div>
        </div>

    )
}

rechercher(event) {
    console.log(this.state)
    axios({
        url : '/cours/'+this.state.pointage.cou_id,
        method : "get",
    }).then(res => {
        this.setState({
            pointage : res.data,
        });
        console.log(this.state)
    })
}
rechercherCreneau(event) {
    axios({
        url : '/creneau/'
    })
}

componentDidMount() {
    if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
        document.location.href = "/";
    }
    axios({url : '/cours/multi',
               method : "get",
    }).then(res => {
        this.setState({
            pointages : res.data,
        });
        let cours_a = '<option value=""> Choisir un cours</option>';
        for (const cours of this.state.pointages) {
            cours_a += '<option value="'+cours.cou_id+'">'+cours.intitule+'</option>';
        }

        let creneau_a = '<option value=""> Choisir un creneau </option>';
        for (const creneau of this.state.pointages) {
            creneau_a += '<option value="'+creneau.creneauDtos+'">'+creneau.cre_id+'</option>';
        }
              document.getElementById("recherche_cours").innerHTML = cours_a;
        console.log(this.state.pointages.creneauDtos)

        
    }) 
    

    
}

handleChange(event){
    this.setState({
        pointage: {
            ...this.state.pointage,
            [event.target.name]: event.target.value
        }
    });
}

}
export default Pointage




/*<label> date: </label>
                <input type="date" name="date" value={this.state.pointage.date} onChange={this.handleChange}></input>
                <br/>
                <label> Heure: </label>
                <input type="time" name="heure" value={this.state.pointage.heure_debut} onChange={this.handleChange}></input>
                <br/>
                <label> salle: </label>
                <input type="text" name="salle" value={this.state.pointage.salle} onChange={this.handleChange}></input>
                <br/>
*/