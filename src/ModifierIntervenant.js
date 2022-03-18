import React from 'react'
import axios from 'axios'

class ModifierIntervenant extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateur : {},
            utilisateurs : {},
            coursDtos : {},
            utilisateur_cours : {},
            seanceFormationDtos : {},
            utilisateur_seanceFormation : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.modifier = this.modifier.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.handleChange_cours = this.handleChange_cours.bind(this);
        this.ajouter_cours = this.ajouter_cours.bind(this);
        this.supprimer_cours = this.supprimer_cours.bind(this);

        this.handleChange_seanceFormation = this.handleChange_seanceFormation.bind(this);
        this.ajouter_seanceFormation = this.ajouter_seanceFormation.bind(this);
        this.supprimer_seanceFormation = this.supprimer_seanceFormation.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Modifier un intervenant</h2>
                <div>
                    <label>Login:</label>
                    <br />
                    <select name="uti_id" id="utilisateur" onChange={this.handleChange}>
                            
                    </select>
                    <br />
                    <br />
                    <button className="btn btn-primary start" onClick={this.rechercher} >Rechercher</button>
                    <br />
                    <br />
                </div>
                <label>Login:</label>
                <br />
                <input type="text" name="login" value={this.state.utilisateur.login} onChange={this.handleChange}/>
                <br /><br />
                <label>Nom:</label>
                <br />
                <input type="text" name="nom" value={this.state.utilisateur.nom} onChange={this.handleChange}/>
                <br /><br />
                <label>Prenom:</label>
                <br />
                <input type="text" name="prenom" value={this.state.utilisateur.prenom} onChange={this.handleChange}/>
                <br /><br />
                <label>Mail:</label>
                <br />
                <input type="text" name="mail" value={this.state.utilisateur.mail} onChange={this.handleChange}/>
                <br /><br />
                <label>Cours liés</label>
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
                        <label>Ajouter un cours</label>
                        <br/>
                        <select name="cou_id" id="cours_ajouter" onChange={this.handleChange_cours}>
                            <option value="">Choisir un intitulé</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_cours} >Ajouter</button>
                        <br/><br/>
                    </div>
                    <div  className='col-md-6'>
                        <label>Supprimer un cours</label>
                        <br/>
                        <select name="cou_id" id="cours_supprimer" onChange={this.handleChange_cours}>
                        <option value="">Choisir un intitulé</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-danger start" onClick={this.supprimer_cours} >Supprimer</button>
                    </div>
                </div>
                <br/><br/>
                <label>Seances de formation liées</label>
                <table className="table">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Effectuée</td>
                        <td>Durée</td>
                        <td>Validé</td>
                        <td>Commentaire</td>
                    </tr>
                    </thead>
                    <tbody id = "seanceFormation_lie">
                    </tbody>
                </table>
                <div className="row">
                    <div className='col-md-6'>
                        <label>Ajouter une seance de formation</label>
                        <br/>
                        <select name="sea_id" id="seanceFormation_ajouter" onChange={this.handleChange_seanceFormation}>
                            <option value="">Choisir un ID</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_seanceFormation} >Ajouter</button>
                        <br/><br/>
                    </div>
                    <div  className='col-md-6'>
                        <label>Supprimer une seance de formation</label>
                        <br/>
                        <select name="sea_id" id="seanceFormation_supprimer" onChange={this.handleChange_seanceFormation}>
                        <option value="">Choisir un ID</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-danger start" onClick={this.supprimer_seanceFormation} >Supprimer</button>
                    </div>
                </div>
                <br/>
                <button className="btn btn-success start" onClick={this.modifier} >Modifier</button>
            </div>
        )
    }

    modifier() {
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({
            data:this.state.utilisateur,
            method : "put",
            url : '/intervenants',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            alert("Intervenant modifié");
            this.componentDidMount();
        })
    }

    rechercher(event){
        axios({
            url : '/intervenants/'+this.state.utilisateur.uti_id,
            method : "get",
        }).then(res => {
            this.setState({
                utilisateur : res.data,
            });
            let cours_a = "";
            for (const cours of this.state.utilisateur.coursDtos) {
                cours_a += "<tr>";
                cours_a += "<td scope='row'>"+cours.intitule+"</td>";
                cours_a += "</tr>";
              }
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
            let cours_supprimer_a = '<option value="">Choisir un intitule</option>';
            for(const cours_supprimer of this.state.utilisateur.coursDtos){
                cours_supprimer_a += '<option value="'+cours_supprimer.cou_id+'">'+cours_supprimer.intitule+'</option>';
            }
            document.getElementById("cours_supprimer").innerHTML = cours_supprimer_a;

            let seanceFormation_a = "";
            for (const seanceFormation of this.state.utilisateur.seanceFormationDtos) {
                seanceFormation_a += "<tr>";
                seanceFormation_a += "<td scope='row'>"+seanceFormation.sea_id+"</td>";
                if(seanceFormation.estEffectue === true){
                    seanceFormation_a += "<td scope='row'>Oui</td>";
                }
                else{
                    seanceFormation_a += "<td scope='row'>Non</td>";
                }
                seanceFormation_a += "<td scope='row'>"+seanceFormation.dureeEffective+"</td>";
                if(seanceFormation.valide === true){
                    seanceFormation_a += "<td scope='row'>Oui</td>";
                }
                else{
                    seanceFormation_a += "<td scope='row'>Non</td>";
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
            for(const seanceFormation_supprimer of this.state.utilisateur.seanceFormationDtos){
                seanceFormation_supprimer_a += '<option value="'+seanceFormation_supprimer.sea_id+'">'+seanceFormation_supprimer.sea_id+'</option>';
            }
            document.getElementById("seanceFormation_supprimer").innerHTML = seanceFormation_supprimer_a;
        })
    }

    componentDidMount(){
        axios({url : '/intervenants/multi',
               method : "get",
        }).then(res => {
            this.setState({
                utilisateurs : res.data,
            });
            let utilisateur_a = '<option value="">Choisir un login</option>';
            for (const utilisateur of this.state.utilisateurs) {
                if(utilisateur.dtype === "Intervenant"){
                    utilisateur_a += '<option value="'+utilisateur.uti_id+'">'+utilisateur.login+'</option>';
                }
              }
              document.getElementById("utilisateur").innerHTML = utilisateur_a;
        })
    }

    handleChange(event){
        this.setState({
            utilisateur: {
                ...this.state.utilisateur,
                [event.target.name]: event.target.value
            }
        });
    }

    handleChange_cours(event){
        this.setState({
            coursDtos: {
                ...this.state.coursDtos,
                [event.target.name]: event.target.value
            }
        });
    }

    ajouter_cours() {
        this.state.utilisateur_cours.uti_id = this.state.utilisateur.uti_id;
        this.state.utilisateur_cours.coursDtos = [this.state.coursDtos];
        axios({
            data:this.state.utilisateur_cours,
            method : "put",
            url : '/intervenants/addCours',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Cours ajouté");
            this.rechercher();
        })
    }

    supprimer_cours() {
        this.state.utilisateur_cours.uti_id = this.state.utilisateur.uti_id;
        this.state.utilisateur_cours.coursDtos = [this.state.coursDtos];
        axios({
            data:this.state.utilisateur_cours,
            method : "put",
            url : '/intervenants/removeCours',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Cours supprimé");
            this.rechercher();
        })
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
        this.state.utilisateur_seanceFormation.uti_id = this.state.utilisateur.uti_id;
        this.state.utilisateur_seanceFormation.seanceFormationDtos = [this.state.seanceFormationDtos];
        console.log(this.state.utilisateur_seanceFormation)
        axios({
            data:this.state.utilisateur_seanceFormation,
            method : "put",
            url : '/intervenants/addSeanceFormation',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Seance ajoutée");
            this.rechercher();
        })
    }

    supprimer_seanceFormation() {
        this.state.utilisateur_seanceFormation.uti_id = this.state.utilisateur.uti_id;
        this.state.utilisateur_seanceFormation.seanceFormationDtos = [this.state.seanceFormationDtos];
        axios({
            data:this.state.utilisateur_seanceFormation,
            method : "put",
            url : '/intervenants/removeSeanceFormation',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Seance supprimée");
            this.rechercher();
        })
    }
}
export default ModifierIntervenant
