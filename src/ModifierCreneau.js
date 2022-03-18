import React from 'react'
import axios from 'axios'

class ModifierCreneau extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            creneau : {},
            creneaux : {},
            coursDto : {},
            creneau_cours : {},
            seanceFormationDtos : {},
            creneau_seanceFormation : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.modifier = this.modifier.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.handleChange_seanceFormation = this.handleChange_seanceFormation.bind(this);
        this.ajouter_seanceFormation = this.ajouter_seanceFormation.bind(this);
        this.supprimer_seanceFormation = this.supprimer_seanceFormation.bind(this);

        this.handleChange_cours = this.handleChange_cours.bind(this);
        this.ajouter_cours = this.ajouter_cours.bind(this);
        this.supprimer_cours = this.supprimer_cours.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Modifier un creneau</h2>
                <div>
                    <label>Date:</label>
                    <br />
                    <select name="cre_id" id="creneau_recherche" onChange={this.handleChange}>
                            
                    </select>
                    <br />
                    <br />
                    <button className="btn btn-primary start" onClick={this.rechercher} >Rechercher</button>
                    <br />
                    <br />
                </div>
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
                <label>Séances de formations liées</label>
                <table className="table">
                    <thead>
                    <tr>
                    <th  scope='row'>ID</th>
                        <th  scope='row'>Effectuée</th>
                        <th  scope='row'>Durée</th>
                        <th  scope='row'>Validée</th>
                        <th  scope='row'>Commentaire</th>
                    </tr>
                    </thead>
                    <tbody id = "seanceFormation_lie">
                    </tbody>
                </table>
                <div className="row">
                    <div className='col-md-6'>
                        <label>Ajouter une séance de formation</label>
                        <br/>
                        <select name="sea_id" id="seanceFormation_ajouter" onChange={this.handleChange_seanceFormation}>
                            <option value="">Choisir un intitulé</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_seanceFormation} >Ajouter</button>
                        <br/><br/>
                    </div>
                    <div  className='col-md-6'>
                        <label>Supprimer une séance de formation</label>
                        <br/>
                        <select name="sea_id" id="seanceFormation_supprimer" onChange={this.handleChange_seanceFormation}>
                        <option value="">Choisir un intitulé</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-danger start" onClick={this.supprimer_seanceFormation} >Supprimer</button>
                    </div>
                </div>
                <br /><br />
                <label>Cours lié</label>
                <table className="table">
                    <thead>
                    <tr>
                        <td>Intitulé</td>
                    </tr>
                    </thead>
                    <tbody id = "cours_lie">
                    </tbody>
                </table>
                <div className="row">
                    <div className='col-md-6'>
                        <label>Ajouter une cours</label>
                        <br/>
                        <select name="cou_id" id="cours_ajouter" onChange={this.handleChange_cours}>
                            <option value="">Choisir un nom</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_cours} >Ajouter</button>
                        <br/><br/>
                    </div>
                    <div  className='col-md-6'>
                        <label>Supprimer une cours</label>
                        <br/><br/>
                        <button className="btn btn-danger start" onClick={this.supprimer_cours} >Supprimer</button>
                    </div>
                </div>
                <br/>
                <button className="btn btn-success start" onClick={this.modifier} >Modifier</button>
            </div>
        )
    }

    modifier() {
        axios({
            data:this.state.creneau,
            method : "put",
            url : '/creneaux',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            alert("Filière langue modifiée");
        })
    }

    rechercher(event){
        axios({
            url : '/creneaux/'+this.state.creneau.cre_id,
            method : "get",
        }).then(res => {
            this.setState({
                creneau : res.data,
            });
            let seanceFormation_a = "";
            for (const seanceFormation of this.state.creneau.seanceFormationDtos) {
                seanceFormation_a += "<tr>";
                seanceFormation_a += "<td scope='row'>"+seanceFormation.sea_id+"</td>";
                if(seanceFormation.estEffectue === true){
                    seanceFormation_a+= "<td scope='row'>Oui</td>";
                }
                else{
                    seanceFormation_a+= "<td scope='row'>Non</td>";
                }
                seanceFormation_a += "<td scope='row'>"+seanceFormation.dureeEffective+"</td>";
                if(seanceFormation.valide === true){
                    seanceFormation_a+= "<td scope='row'>Oui</td>";
                }
                else{
                    seanceFormation_a+= "<td scope='row'>Non</td>";
                }
                seanceFormation_a += "<td scope='row'>"+seanceFormation.commentaire+"</td>";
                seanceFormation_a += "</tr>";
              }
            document.getElementById("seanceFormation_lie").innerHTML = seanceFormation_a;
            axios({
                url : '/seancesformations/multi',
                method : "get",
                }).then(res =>{
                this.setState({
                    seanceFormation_ajouter : res.data,
                });
                let seanceFormation_ajouter_a = '<option value="">Choisir un ID</option>';
                for(const seanceFormation_ajouter of this.state.seanceFormation_ajouter){
                    seanceFormation_ajouter_a += '<option value="'+seanceFormation_ajouter.sea_id+'">'+seanceFormation_ajouter.sea_id+'</option>';
                }
                document.getElementById("seanceFormation_ajouter").innerHTML = seanceFormation_ajouter_a;
            })
            let seanceFormation_supprimer_a = '<option value="">Choisir un ID</option>';
            for(const seanceFormation_supprimer of this.state.creneau.seanceFormationDtos){
                seanceFormation_supprimer_a += '<option value="'+seanceFormation_supprimer.sea_id+'">'+seanceFormation_supprimer.sea_id+'</option>';
            }
            document.getElementById("seanceFormation_supprimer").innerHTML = seanceFormation_supprimer_a;

            let cours_a = "<tr>";
            if(this.state.creneau.coursDto != null){
                cours_a += "<td scope='row'>"+this.state.creneau.coursDto.intitule+"</td>";
            }
            cours_a += "</tr>";
            document.getElementById("cours_lie").innerHTML = cours_a;
            axios({
                url : '/cours/multi',
                method : "get",
                }).then(res =>{
                this.setState({
                    cours_ajouter : res.data,
                });
                let cours_ajouter_a = '<option value="">Choisir un intitule</option>';
                for(const cours_ajouter of this.state.cours_ajouter){
                    cours_ajouter_a += '<option value="'+cours_ajouter.cou_id+'">'+cours_ajouter.intitule+'</option>';
                }
                document.getElementById("cours_ajouter").innerHTML = cours_ajouter_a;
            })
        })
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({url : '/creneaux/multi',
               method : "get",
        }).then(res => {
            this.setState({
                creneaux : res.data,
            });
            let creneau_a = '<option value="">Choisir un nom</option>';
            for (const creneau of this.state.creneaux) {
                creneau_a += '<option value="'+creneau.cre_id+'">'+creneau.date+" "+creneau.heure_debut+'</option>';
              }
              document.getElementById("creneau_recherche").innerHTML = creneau_a;
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

    handleChange_seanceFormation(event){
        this.setState({
            seanceFormationDtos: {
                ...this.state.seanceFormationDtos,
                [event.target.name]: event.target.value
            }
        });
    }

    ajouter_seanceFormation() {
        this.state.creneau_seanceFormation.cre_id = this.state.creneau.cre_id;
        this.state.creneau_seanceFormation.seanceFormationDtos = [this.state.seanceFormationDtos];
        axios({
            data:this.state.creneau_seanceFormation,
            method : "put",
            url : '/creneaux/addSeanceFormation',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Seance de formation ajoutée");
            this.rechercher();
        })
    }

    supprimer_seanceFormation() {
        this.state.creneau_seanceFormation.fil_id = this.state.creneau.sea_id;
        this.state.creneau_seanceFormation.seanceFormationDtos = [this.state.seanceFormationDtos];
        axios({
            data:this.state.creneau_seanceFormation,
            method : "put",
            url : '/creneaux/removeSeanceFormation',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Seance de formation supprimée");
            this.rechercher();
        })
    }

    handleChange_cours(event){
        this.setState({
            coursDto: {
                ...this.state.coursDto,
                [event.target.name]: event.target.value
            }
        });
    }

    ajouter_cours() {
        this.state.creneau_seanceFormation.cre_id = this.state.creneau.cre_id;
        this.state.creneau_seanceFormation.coursDto = this.state.coursDto;
        axios({
            data:this.state.creneau_seanceFormation,
            method : "put",
            url : '/creneaux/addCours',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Cours ajouté");
            this.rechercher();
        })
    }

    supprimer_cours() {
        this.state.creneau_seanceFormation.cre_id = this.state.creneau.cre_id;
        this.state.creneau_seanceFormation.coursDto = this.state.coursDto;
        axios({
            data:this.state.creneau_seanceFormation,
            method : "put",
            url : '/creneaux/removeCours',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Cours supprimé");
            this.rechercher();
        })
    }
}
export default ModifierCreneau
