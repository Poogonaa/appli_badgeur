import React from "react";
import axios from "axios";

class ModifierComposante extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            composante : {},
            composantes :{},
            filiere_langueDtos :{},
            composante_filiere_langue : {},
            responsableDtos : {},
            composante_responsable : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.enregistrer = this.enregistrer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange_filiere_langue = this.handleChange_filiere_langue.bind(this);
        this.ajouter_filiere_langue = this.ajouter_filiere_langue.bind(this);
        this.supprimer_filiere_langue = this.supprimer_filiere_langue.bind(this);
        this.handleChange_responsable = this.handleChange_responsable.bind(this);
        this.ajouter_responsable = this.ajouter_responsable.bind(this);
        this.supprimer_responsable = this.supprimer_responsable.bind(this);
    }

    render() {
        return(
            <div>
                <h2>Modifier une composante </h2>
                <div>
                    <label>Nom </label>
                    <br/>
                    <select name="com_id" id="composante" onChange={this.handleChange}></select>
                    <br/><br/>
                    <button className="btn btn-primary start" onClick={this.rechercher}>Rechercher</button>
                    <br/><br/>
                </div>

                <label>Nom de la composante</label>
                <br/>
                <input type="text" name="nomComposante" value={this.state.composante.nomComposante} onChange={this.handleChange}></input>
                <br/><br/>
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
                <div className="row">
                    <div className='col-md-6'>
                        <label>Ajouter une filiere langue</label>
                        <br/>
                        <select name="fil_id" id="filiere_langue_ajouter" onChange={this.handleChange_filiere_langue}>
                            <option value="">Choisir un nom</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_filiere_langue} >Ajouter</button>
                    </div>
                    <div className='col-md-6'>
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
                <label>Responsables liés</label>
                <table className="table">
                    <thead>
                    <tr>
                        <td>Login</td>
                        <td>Nom</td>
                        <td>Prénom</td>
                    </tr>
                    </thead>
                    <tbody id = "reponsable_lie">
                    </tbody>
                </table>
                <div class="row">
                    <div class='col-md-6'>
                        <label>Ajouter un responsable</label>
                        <br/>
                        <select name="uti_id" id="responsable_ajouter" onChange={this.handleChange_responsable}>
                            <option value="">Choisir un login</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_responsable} >Ajouter</button>
                    </div>
                    <div class='col-md-6'>
                        <label>Supprimer un responsable</label>
                        <br/>
                        <select name="uti_id" id="responsable_supprimer" onChange={this.handleChange_responsable}>
                            <option value="">Choisir un login</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-danger start" onClick={this.supprimer_responsable} >Supprimer</button>
                    </div>
                </div>
                <br/><br/>
                <button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button>
            </div>
        )
    }

    enregistrer() {
        axios({
            data:this.state.composante,
            method : "put",
            url : '/composantes',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Composante modifiée");
            this.componentDidMount();
        })
    }

    ajouter_filiere_langue() {
        this.state.composante_filiere_langue.com_id = this.state.composante.com_id;
        this.state.composante_filiere_langue.filiere_langueDtos = [this.state.filiere_langueDtos];
        axios({
            data:this.state.composante_filiere_langue,
            method : "put",
            url : '/composantes/addFiliere_langue',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Filière langue ajoutée");
            this.rechercher();
        })
    }

    supprimer_filiere_langue() {
        this.state.composante_filiere_langue.com_id = this.state.composante.com_id;
        this.state.composante_filiere_langue.filiere_langueDtos = [this.state.filiere_langueDtos];
        axios({
            data:this.state.composante_filiere_langue,
            method : "put",
            url : '/composantes/removeFiliere_langue',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Filière langue supprimée");
            this.rechercher();
        })
    }

    ajouter_responsable() {
        this.state.composante_responsable.com_id = this.state.composante.com_id;
        this.state.composante_responsable.responsableDtos = [this.state.responsableDtos];
        axios({
            data:this.state.composante_responsable,
            method : "put",
            url : '/composantes/addResponsable',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Responsable ajouté");
            this.rechercher();
        })
    }

    supprimer_responsable() {
        this.state.composante_responsable.com_id = this.state.composante.com_id;
        this.state.composante_responsable.responsableDtos = [this.state.responsableDtos];
        axios({
            data:this.state.composante_responsable,
            method : "put",
            url : '/composantes/removeResponsable',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Responsable supprimé");
            this.rechercher();
        })
    }

    rechercher(){
        axios({
            url : '/composantes/'+this.state.composante.com_id,
            method : "get",
        }).then(res =>{
            this.setState({
                composante : res.data,
            });
            let filiere_langue_a = "";
            for (const filiere_langue of this.state.composante.filiere_langueDtos) {
                filiere_langue_a += "<tr>";
                filiere_langue_a += "<td scope='row'>"+filiere_langue.nom+"</td>";
                filiere_langue_a += "<td scope='row'>"+filiere_langue.code+"</td>";
                filiere_langue_a += "</tr>";
              }
              document.getElementById("filiere_langue_lie").innerHTML = filiere_langue_a;

              let responsable_a = "";
            for (const reponsable of this.state.composante.responsableDtos) {
                responsable_a += "<tr>";
                responsable_a += "<td scope='row'>"+reponsable.login+"</td>";
                responsable_a += "<td scope='row'>"+reponsable.nom+"</td>";
                responsable_a += "<td scope='row'>"+reponsable.prenom+"</td>";
                responsable_a += "</tr>";
            }
            document.getElementById("reponsable_lie").innerHTML = responsable_a;

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
            for(const filiere_langue_supprimer of this.state.composante.filiere_langueDtos){
                filiere_langue_supprimer_a += '<option value="'+filiere_langue_supprimer.fil_id+'">'+filiere_langue_supprimer.nom +'</option>';
            }
            document.getElementById("filiere_langue_supprimer").innerHTML = filiere_langue_supprimer_a;


            axios({
                url : '/responsables/multi',
                method : "get",
                }).then(res =>{
                this.setState({
                    responsable_ajouter : res.data,
                });
                let responsable_ajouter_a = '<option value="">Choisir un nom</option>';
                for(const responsable_ajouter of this.state.responsable_ajouter){
                    responsable_ajouter_a += '<option value="'+responsable_ajouter.uti_id+'">'+responsable_ajouter.login +'</option>';
                }
                document.getElementById("responsable_ajouter").innerHTML = responsable_ajouter_a;
            })

            let responsable_supprimer_a = '<option value="">Choisir un nom</option>';
            for(const responsable_supprimer of this.state.composante.responsableDtos){
                responsable_supprimer_a += '<option value="'+responsable_supprimer.uti_id+'">'+responsable_supprimer.login +'</option>';
            }
            document.getElementById("responsable_supprimer").innerHTML = responsable_supprimer_a;
        })
    }

    componentDidMount(){
        if( sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({url:'/composantes/multi',
        method : "get",
    }).then(res => {
        this.setState({
            composantes : res.data,
        });
        let composante_a = '<option value="">Choisir un nom</option>';
        for(const composante of this.state.composantes){
            composante_a += '<option value="'+composante.com_id+'">'+composante.nomComposante +'</option>';
        }
        document.getElementById("composante").innerHTML = composante_a;
    })
    }

    handleChange(event){
        this.setState({
            composante: {
                ...this.state.composante,
                [event.target.name]: event.target.value
            }
        });
    }

    handleChange_filiere_langue(event){
        this.setState({
            filiere_langueDtos: {
                ...this.state.filiere_langueDtos,
                [event.target.name]: event.target.value
            }
        });
    }

    handleChange_responsable(event){
        this.setState({
            responsableDtos: {
                ...this.state.responsableDtos,
                [event.target.name]: event.target.value
            }
        });
    }

}
export default ModifierComposante