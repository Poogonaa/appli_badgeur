import React from 'react'
import axios from 'axios'

class ModifierCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            unCours : {},
            cours : {},
            intervenantDtos : {},
            cours_intervenant : {},
            filiere_langueDtos : {},
            cours_filiere_langue : {},
            creneauDtos : {},
            cours_creneau : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.enregistrer = this.enregistrer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.handleChange_intervenant = this.handleChange_intervenant.bind(this);
        this.ajouter_intervenant = this.ajouter_intervenant.bind(this);
        this.supprimer_intervenant = this.supprimer_intervenant.bind(this);

        this.handleChange_filiere_langue = this.handleChange_filiere_langue.bind(this);
        this.ajouter_filiere_langue = this.ajouter_filiere_langue.bind(this);
        this.supprimer_filiere_langue = this.supprimer_filiere_langue.bind(this);

        this.handleChange_creneau = this.handleChange_creneau.bind(this);
        this.ajouter_creneau = this.ajouter_creneau.bind(this);
        this.supprimer_creneau = this.supprimer_creneau.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Modification d'un cours</h2>
                <label>Intitulé:</label>
                <br />
                <select name="cou_id" id="cours_recherche" onChange={this.handleChange}>
                            
                </select>
                <br/><br/>
                <button className="btn btn-primary start" onClick={this.rechercher} >Rechercher</button>
                <br /><br />
                <label>Intitulé:</label>
                <br />
                <input type="text" name="intitule" value={this.state.cours.intitule} onChange={this.handleChange}/>
                <br /><br/>
                <label>Intervenant liés</label>
                <table className="table">
                    <thead>
                    <tr>
                        <td>Login</td>
                        <td>Nom</td>
                        <td>Prénom</td>
                    </tr>
                    </thead>
                    <tbody id = "intervenant_lie">
                    </tbody>
                </table>
                <div class="row">
                    <div class='col-md-6'>
                        <label>Ajouter un intervenant</label>
                        <br/>
                        <select name="uti_id" id="intervenant_ajouter" onChange={this.handleChange_intervenant}>
                            <option value="">Choisir un login</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_intervenant} >Ajouter</button>
                        <br/><br/>
                    </div>
                    <div  class='col-md-6'>
                        <label>Supprimer un intervenant</label>
                        <br/>
                        <select name="uti_id" id="intervenant_supprimer" onChange={this.handleChange_intervenant}>
                        <option value="">Choisir un login</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-danger start" onClick={this.supprimer_intervenant} >Supprimer</button>
                    </div>
                </div>
                <br/>
                <label>Filières langues liées</label>
                <table className="table">
                    <thead>
                    <tr>
                        <td>Nom</td>
                        <td>Code</td>
                    </tr>
                    </thead>
                    <tbody id = "filiere_langue_lie">
                    </tbody>
                </table>
                <div class="row">
                    <div class='col-md-6'>
                        <label>Ajouter une filiere langue</label>
                        <br/>
                        <select name="fil_id" id="filiere_langue_ajouter" onChange={this.handleChange_filiere_langue}>
                            <option value="">Choisir un nom</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_filiere_langue} >Ajouter</button>
                    </div>
                    <div class='col-md-6'>
                        <label>Supprimer une filiere langue</label>
                        <br/>
                        <select name="fil_id" id="filiere_langue_supprimer" onChange={this.handleChange_filiere_langue}>
                            <option value="">Choisir un nom</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-danger start" onClick={this.supprimer_filiere_langue} >Supprimer</button>
                    </div>
                </div>
                <br/>
                <label>Creneaux liés</label>
                <table className="table">
                    <thead>
                    <tr>
                        <td>Date</td>
                        <td>Durée</td>
                        <td>Salle</td>
                    </tr>
                    </thead>
                    <tbody id = "creneau_lie">
                    </tbody>
                </table>
                <div class="row">
                    <div class='col-md-6'>
                        <label>Ajouter un creneau</label>
                        <br/>
                        <select name="cre_id" id="creneau_ajouter" onChange={this.handleChange_creneau}>
                            <option value="">Choisir une date</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_creneau} >Ajouter</button>
                    </div>
                    <div class='col-md-6'>
                        <label>Supprimer un creneau</label>
                        <br/>
                        <select name="cre_id" id="creneau_supprimer" onChange={this.handleChange_creneau}>
                            <option value="">Choisir une date</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-danger start" onClick={this.supprimer_creneau} >Supprimer</button>
                    </div>
                </div>
                <br/>
                <button className="btn btn-success start" onClick={this.enregistrer} >Modifier</button>
            </div>
        )
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({url : '/cours/multi',
               method : "get",
        }).then(res => {
            this.setState({
                cours : res.data,
            });
            let cours_a = '<option value="">Choisir un cours</option>';
            for (const un_cours of this.state.cours) {
                cours_a += '<option value="'+un_cours.cou_id+'">'+un_cours.intitule+'</option>';
              }
              document.getElementById("cours_recherche").innerHTML = cours_a;
        })
    }

    enregistrer() {
        console.log("enregistrer")
        axios({
            data:this.state.cours,
            method : "put",
            url : '/cours',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            alert("Cours modifié");
            this.componentDidMount()
        })
    }

    rechercher(){
        axios({
            url : '/cours/'+this.state.cours.cou_id,
            method : "get",
        }).then(res =>{
            this.setState({
                cours : res.data,
            });
            let intervenant_a = "";
            for (const intervenant of this.state.cours.intervenantDtos) {
                intervenant_a += "<tr>";
                intervenant_a += "<td scope='row'>"+intervenant.login+"</td>";
                intervenant_a += "<td scope='row'>"+intervenant.nom+"</td>";
                intervenant_a += "<td scope='row'>"+intervenant.prenom+"</td>";
                intervenant_a += "</tr>";
            }
            document.getElementById("intervenant_lie").innerHTML = intervenant_a;

            axios({
                url : '/intervenants/multi',
                method : "get",
                }).then(res =>{
                this.setState({
                    intervenant_ajouter : res.data,
                });
                let intervenant_ajouter_a = '<option value="">Choisir un nom</option>';
                for(const intervenant_ajouter of this.state.intervenant_ajouter){
                    intervenant_ajouter_a += '<option value="'+intervenant_ajouter.uti_id+'">'+intervenant_ajouter.login +'</option>';
                }
                document.getElementById("intervenant_ajouter").innerHTML = intervenant_ajouter_a;
            })
            let intervenant_supprimer_a = '<option value="">Choisir un nom</option>';
            for(const intervenant_supprimer of this.state.cours.intervenantDtos){
                intervenant_supprimer_a += '<option value="'+intervenant_supprimer.uti_id+'">'+intervenant_supprimer.login +'</option>';
            }
            document.getElementById("intervenant_supprimer").innerHTML = intervenant_supprimer_a;

            let filiere_langue_a = "";
            for (const filiere_langue of this.state.cours.filiere_langueDtos) {
                filiere_langue_a += "<tr>";
                filiere_langue_a += "<td scope='row'>"+filiere_langue.nom+"</td>";
                filiere_langue_a += "<td scope='row'>"+filiere_langue.code+"</td>";
                filiere_langue_a += "</tr>";
              }
              document.getElementById("filiere_langue_lie").innerHTML = filiere_langue_a;

              axios({
                url : '/filiere_langues/multi',
                method : "get",
                }).then(res =>{
                this.setState({
                    filieres_langues_ajouter : res.data,
                });
                let filiere_langue_ajouter_a = '<option value="">Choisir un nom</option>';
                for(const filiere_langue_ajouter of this.state.filieres_langues_ajouter){
                    filiere_langue_ajouter_a += '<option value="'+filiere_langue_ajouter.fil_id+'">'+filiere_langue_ajouter.nom +'</option>';
                }
                document.getElementById("filiere_langue_ajouter").innerHTML = filiere_langue_ajouter_a;
            })
            let filiere_langue_supprimer_a = '<option value="">Choisir un nom</option>';
            for(const filiere_langue_supprimer of this.state.cours.filiere_langueDtos){
                filiere_langue_supprimer_a += '<option value="'+filiere_langue_supprimer.fil_id+'">'+filiere_langue_supprimer.nom +'</option>';
            }
            document.getElementById("filiere_langue_supprimer").innerHTML = filiere_langue_supprimer_a;

            let creneau_a = "";
            for (const creneau of this.state.cours.creneauDtos) {
                creneau_a += "<tr>";
                creneau_a += "<td scope='row'>"+creneau.date+' '+creneau.heure_debut+"</td>";
                creneau_a += "<td scope='row'>"+creneau.duree+"</td>";
                creneau_a += "<td scope='row'>"+creneau.salle+"</td>";
                creneau_a += "</tr>";
              }
              document.getElementById("creneau_lie").innerHTML = creneau_a;
            axios({
                url : '/creneaux/multi',
                method : "get",
                }).then(res =>{
                this.setState({
                    creneaux_ajouter : res.data,
                });
                console.log(this.state.creneaux_ajouter)
                let creneau_ajouter_a = '<option value="">Choisir une date</option>';
                for(const creneau_ajouter of this.state.creneaux_ajouter){
                    creneau_ajouter_a += '<option value="'+creneau_ajouter.cre_id+'">'+creneau_ajouter.date+' '+creneau_ajouter.heure_debut+'</option>';
                }
                document.getElementById("creneau_ajouter").innerHTML = creneau_ajouter_a;
            })
            let creneau_supprimer_a = '<option value="">Choisir une date</option>';
            for(const creneau_supprimer of this.state.cours.creneauDtos){
                creneau_supprimer_a += '<option value="'+creneau_supprimer.cre_id+'">'+creneau_supprimer.date+' '+creneau_supprimer.heure_debut+'</option>';
            }
            document.getElementById("creneau_supprimer").innerHTML = creneau_supprimer_a;
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

    handleChange_intervenant(event){
        this.setState({
            intervenantDtos: {
                ...this.state.intervenantDtos,
                [event.target.name]: event.target.value
            }
        });
    }

    ajouter_intervenant() {
        this.state.cours_intervenant.cou_id = this.state.cours.cou_id;
        this.state.cours_intervenant.intervenantDtos = [this.state.intervenantDtos];
        axios({
            data:this.state.cours_intervenant,
            method : "put",
            url : '/cours/addIntervenant',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Intervenant ajouté");
            this.rechercher();
        })
    }

    supprimer_intervenant() {
        this.state.cours_intervenant.cou_id = this.state.cours.cou_id;
        this.state.cours_intervenant.intervenantDtos = [this.state.intervenantDtos];
        axios({
            data:this.state.cours_intervenant,
            method : "put",
            url : '/cours/removeIntervenant',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Intervenant supprimé");
            this.rechercher();
        })
    }

    handleChange_filiere_langue(event){
        this.setState({
            filiere_langueDtos: {
                ...this.state.filiere_langueDtos,
                [event.target.name]: event.target.value
            }
        });
    }

    ajouter_filiere_langue() {
        this.state.cours_filiere_langue.cou_id = this.state.cours.cou_id;
        this.state.cours_filiere_langue.filiere_langueDtos = [this.state.filiere_langueDtos];
        axios({
            data:this.state.cours_filiere_langue,
            method : "put",
            url : '/cours/addFiliere_langue',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Filière langue ajoutée");
            this.rechercher();
        })
    }

    supprimer_filiere_langue() {
        this.state.cours_filiere_langue.cou_id = this.state.cours.cou_id;
        this.state.cours_filiere_langue.filiere_langueDtos = [this.state.filiere_langueDtos];
        axios({
            data:this.state.cours_filiere_langue,
            method : "put",
            url : '/cours/removeFiliere_langue',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Filiere langue supprimée");
            this.rechercher();
        })
    }

    handleChange_creneau(event){
        this.setState({
            creneauDtos: {
                ...this.state.creneauDtos,
                [event.target.name]: event.target.value
            }
        });
    }

    ajouter_creneau() {
        this.state.cours_creneau.cou_id = this.state.cours.cou_id;
        this.state.cours_creneau.filiere_langueDtos = [this.state.creneauDtos];
        axios({
            data:this.state.cours_creneau,
            method : "put",
            url : '/cours/addCreneau',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Ceneau ajouté");
            this.rechercher();
        })
    }

    supprimer_creneau() {
        this.state.cours_creneau.cou_id = this.state.cours.cou_id;
        this.state.cours_creneau.creneauDtos = [this.state.creneauDtos];
        axios({
            data:this.state.cours_creneau,
            method : "put",
            url : '/cours/removeCreneau',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Creneau supprimé");
            this.rechercher();
        })
    }
}
export default ModifierCours
