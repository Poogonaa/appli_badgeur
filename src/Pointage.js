import React from 'react'
import axios from 'axios'

class Pointage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pointage: {},
            pointages : {},
            creneau :{},
            seance :{},
        };
        this.rechercher = this.rechercher.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.rechercherCreneau = this.rechercherCreneau.bind(this);
        this.pointer = this.pointer.bind(this);
    }

// apres la connexion un intervenant peut se pointer 
// on recupere son id et on affiche un formulaire avec des listes deroulante

render() {
    return(
        <div>
            <div>
                {/* Recherche du cours? */}
                <h2>Les Cours attribues</h2>
                <label>Cours</label>
                <div>
                    <br></br>
                    <select name="cou_id" id="recherche_cours" onChange={this.handleChange} ></select>
                    <br/><br/>
                    <button className="btn btn-success start" onClick={this.rechercher}>Rechercher</button>
                </div>
            </div>
            {/* Recherche du creneau */}
            <div>
                <h2> Les creneaux </h2>
                <div>
                <br></br>
                <select name="cre_id" id="recherche_creneau" onChange={this.handleChange}></select>
                <br/><br/>
                <button className="btn btn-success start" onClick={this.rechercherCreneau}>Rechercher</button>
                </div>
            </div><br/>
            <br/><br/>
        {/* Formulaire pre-rempli */}
            <div>
                <label> date: </label>
                <input type="text" name="date" value={this.state.creneau.date} onChange={this.handleChange}></input>
                <br/><br/>
                <label> Heure: </label>
                <input type="text" name="heure" value={this.state.creneau.heure_debut} onChange={this.handleChange}></input>
                <br/><br/>
                <label> salle: </label>
                <input type="text" name="salle" value={this.state.creneau.salle} onChange={this.handleChange}></input>
                <br/><br/>
                <label> Type: </label>
                <input type="text" name="type" value={this.state.creneau.type} onChange={this.handleChange}></input>
                <br/>
                
            </div>
            <br/><br/>

            {/* formulaire a remplir */}
            <div>
                <label> Duree de la senace (en minute) : </label>
                <input type="text" name="duree" value={this.state.creneau.duree_effective} onChange={this.handleChange}></input>
                <br/> <br/>
                <label> Commentaire: </label>
                <input type="text" name="type" value={this.state.creneau.commentaire} onChange={this.handleChange}></input>
                <br/>
                <br/>
                <label>Creneau effectuee : </label>
                <select id="effectue" name="effectue">
                    <option value="true"> OUI </option>
                    <option value="false"> NON </option>
                </select>
                <br></br><br></br>
                <button className="btn btn-success start" onClick={this.pointer}>Se pointer</button>
            </div>


        </div>

    )
}
// Bouton de Recherche du cours
rechercher(event) {
    //console.log(this.state)
    axios({
        url : '/cours/'+this.state.pointage.cou_id,
        method : "get",
    }).then(res => {
        this.setState({
            pointage : res.data,
        });
        //console.log(this.state)

        // apres la recherche affichage dans la deuxieme liste deroulante les creneaux du cours selectionne 
        let creneau_a = '<option value=""> Choisir un creneau </option>';
        for (const creneau of this.state.pointage.creneauDtos) {
            console.log(creneau)
            creneau_a += '<option value='+creneau.cre_id+'>'+creneau.date+'</option>';
        }
        document.getElementById("recherche_creneau").innerHTML = creneau_a;
    })
}

// Bouton de recherche de creneau
rechercherCreneau(event) {
    console.log(this.state.pointage)
    axios({
        url : '/creneaux/'+this.state.pointage.cre_id,
        method : "get",
    }).then( res=> {
            this.setState({
                creneau : res.data,
            });

    })
}

pointer() {
    console.log(this.state.pointage.cre_id);
    console.log(this.state.pointage.duree_effective);
    this.state.creneau.cre_id = this.state.pointage.cre_id;
    this.state.creneau.duree_effective = this.state.creneau.duree_effective;
    this.state.creneau.commentaire = this.state.creneau.commentaire;
    this.state.creneau.est_effectue = document.getElementById("effectue").value;
    this.state.creneau.uti_id = sessionStorage.getItem("id");
    axios({
        data:this.state.creneau,
        method: "post",
        url : '/seancesformations',
    }).then(res => {
        alert ("vous etes pointes")
    })
    console.log(this.state.creneau);
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
            document.getElementById("recherche_cours").innerHTML = cours_a;
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
