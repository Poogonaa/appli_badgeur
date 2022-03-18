import React from 'react'
import axios from 'axios'
import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';

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
        this.handleChange_creneau = this.handleChange_creneau.bind(this);
    }

// apres la connexion un intervenant peut se pointer 
// on recupere son id et on affiche un formulaire avec des listes deroulante

render() {
    return(
        <div>
            <h2>Pointez vous bande de criminels</h2>
            <br></br>
            <div>
                {/* Recherche du cours? */}
                <h5>Selectionnez un cours </h5>
                <div>
                    <select name="cou_id" id="recherche_cours" onChange={this.handleChange} ></select>
                    <br/><br/>
                    <button className="btn btn-primary start" onClick={this.rechercher}>Rechercher</button>
                </div>
            </div>
            <br></br>
            {/* Recherche du creneau */}
            <div>
                <h5> Selectionnez un creneau </h5> 
                <div>
                <select name="cre_id" id="recherche_creneau" onChange={this.handleChange}></select>
                <br/><br/>
                <button className="btn btn-primary start" onClick={this.rechercherCreneau}>Rechercher</button>
                </div>
            </div><br/>
            <br/><br/>
        {/* Formulaire pre-rempli des informations du creneau*/}
            <div>
                <label> date: </label> <br></br>
                <input id ="date" type="text" name="date" value={this.state.creneau.date} onChange={this.handleChange} placeholder="YYYY-mm-dd" readOnly="readOnly" ></input>
                <br/><br/>
                <label> Heure: </label> <br></br>
                <input id="heure_debut" type="text" name="heure_debut" value={this.state.creneau.heure_debut} onChange={this.handleChange} placeholder="00h00" readOnly="readOnly" ></input>
                <br/><br/>
                <label> salle: </label> <br></br>
                <input id="salle" type="text" name="salle" value={this.state.creneau.salle} onChange={this.handleChange} placeholder="batiment.etage.num" readOnly="readOnly" ></input>
                <br/><br/>
                <label> Type: </label> <br></br>
                <input id="type" type="text" name="type" value={this.state.creneau.type} onChange={this.handleChange} placeholder="CM/TD/TP" readOnly="readOnly" ></input>
                <br/>
                
            </div>
            <br/><br/>

            {/* formulaire a remplir des infos de la seance effectue ou non */}
            <div>
                <label> Duree de la senace (en minute) : </label> <br></br>
                <input id="dureeEffective" type="text" name="dureeEffective" value={this.state.seance.duree_effective} onChange={this.handleChange_creneau} placeholder="duree de la seance en min"></input>
                <br/> <br/>
                <label> Commentaire : </label> <br></br>
                <input id="commentaire" type="text" name="commentaire" value={this.state.seance.commentaire} onChange={this.handleChange_creneau} placeholder="Commentaire"></input>
                <br/>
                <br/>
                <label>Creneau effectue : </label> <br></br>
                <select id="effectue" name="estEffectue" onChange={this.handleChange_creneau}>
                    <option value="">Creneau effectue?</option>
                    <option value="true"> OUI </option>
                    <option value="false"> NON </option>
                </select>
                <br></br><br></br>
                <button className="btn btn-success start" onClick={this.pointer}>Se pointer</button>
                <br></br><br></br>
            </div>
        </div>

    )
}
// Bouton de Recherche du cours
rechercher(event) {
    if (this.state.pointage.cou_id === undefined) {
        alert ("AUCUN COURS N'EST SELECTIONNE!! ")
    }
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

    console.log(this.state.pointage.cre_id)
    if (this.state.pointage.cre_id === undefined) {
        alert ("AUCUN CRENEAU N'EST SELECTIONNE!! ")
        return false;
    }
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
    if (this.state.pointage.cou_id === undefined) {
        alert ("AUCUN COURS N'EST SELECTIONNE!! ")
        return false;
    }

    if (this.state.creneau.cre_id === undefined) {
        alert ("AUCUN CRENEAU N'EST SELECTIONNE!! ")
        return false;
    }
    
    this.state.seance.uti_id = sessionStorage.getItem("id");
    this.state.seance.valide = 0;
    console.log(this.state.seance)
    axios({
        data:this.state.seance,
        method: "post",
        url : '/seancesformations',
    }).then(res => {
        this.setState({
            creneau : res.data,
        });
        if(document.getElementById("date").value=== "") {
            alert("Veuillez remplir tous les champs")
            return false;
        }
        if(document.getElementById("heure_debut").value=== "") {
            alert("Veuillez remplir tous les champs")
            return false;
        }
        if(document.getElementById("salle").value=== "") {
            alert("Veuillez remplir tous les champs")
            return false;
        }
        if(document.getElementById("type").value=== "") {
            alert("Veuillez remplir tous les champs")
            return false;
        }
        if(document.getElementById("dureeEffective").value=== "") {
            alert("Veuillez remplir tous les champs")
            return false;
        }
        if(document.getElementById("commentaire").value=== "") {
            alert("Veuillez remplir tous les champs")
            return false;
        }
        this.state.creneau.creneauDto = {cre_id : this.state.pointage.cre_id};
        
        console.log(this.state.creneau)
        axios({
            data:this.state.creneau,
            method : "put",
            url : "/seancesformations/addCreneau",
            headers : {'Content-Type' : 'application/json'},
        })
        this.state.creneau.intervenantDto = {uti_id :sessionStorage.getItem("id")};
        axios({
            data:this.state.creneau,
            method : "put", 
            
            url : "/seancesformations/addIntervenant",
            headers : {'Content-Type' : 'application/json'},
        })

        alert ("vous etes pointes")
    })
    console.log(this.state.seance);
}


componentDidMount() {
    if(sessionStorage.getItem("dtype") !== "Intervenant"){
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

handleChange_creneau(event) {
    this.setState({
        seance : {
            ...this.state.seance,
            [event.target.name]: event.target.value
        }
    });
}

}
export default Pointage
