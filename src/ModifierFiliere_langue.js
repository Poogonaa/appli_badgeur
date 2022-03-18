import React from 'react'
import axios from 'axios'

class ModifierFiliere_langue extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            filiere_langue : {},
            filiere_langues : {},
            coursDtos : {},
            filiere_langue_cours : {},
            composanteDto : {},
            filiere_langue_composante : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.modifier = this.modifier.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.handleChange_cours = this.handleChange_cours.bind(this);
        this.ajouter_cours = this.ajouter_cours.bind(this);
        this.supprimer_cours = this.supprimer_cours.bind(this);

        this.handleChange_composante = this.handleChange_composante.bind(this);
        this.ajouter_composante = this.ajouter_composante.bind(this);
        this.supprimer_composante = this.supprimer_composante.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Modifier une filiere langue</h2>
                <div>
                    <label>Nom:</label>
                    <br />
                    <select name="fil_id" id="filiere_langue_recherche" onChange={this.handleChange}>
                            
                    </select>
                    <br />
                    <br />
                    <button className="btn btn-primary start" onClick={this.rechercher} >Rechercher</button>
                    <br />
                    <br />
                </div>
                <label>Code:</label>
                <br />
                <input type="text" name="code" value={this.state.filiere_langue.code} onChange={this.handleChange}/>
                <br /><br />
                <label>Nom:</label>
                <br />
                <input type="text" name="nom" value={this.state.filiere_langue.nom} onChange={this.handleChange}/>
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
                <br /><br />
                <label>Composante lié</label>
                <table className="table">
                    <thead>
                    <tr>
                        <td>Nom</td>
                    </tr>
                    </thead>
                    <tbody id = "composante_lie">
                    </tbody>
                </table>
                <div className="row">
                    <div className='col-md-6'>
                        <label>Ajouter une composante</label>
                        <br/>
                        <select name="com_id" id="composante_ajouter" onChange={this.handleChange_composante}>
                            <option value="">Choisir un nom</option>
                        </select>
                        <br/><br/>
                        <button className="btn btn-success start" onClick={this.ajouter_composante} >Ajouter</button>
                        <br/><br/>
                    </div>
                    <div  className='col-md-6'>
                        <label>Supprimer une composante</label>
                        <br/><br/>
                        <button className="btn btn-danger start" onClick={this.supprimer_composante} >Supprimer</button>
                    </div>
                </div>
                <br/>
                <button className="btn btn-success start" onClick={this.modifier} >Modifier</button>
            </div>
        )
    }

    modifier() {
        axios({
            data:this.state.filiere_langue,
            method : "put",
            url : '/filiere_langues',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            alert("Filière langue modifiée");
        })
    }

    rechercher(event){
        axios({
            url : '/filiere_langues/'+this.state.filiere_langue.fil_id,
            method : "get",
        }).then(res => {
            this.setState({
                filiere_langue : res.data,
            });
            let cours_a = "";
            for (const cours of this.state.filiere_langue.coursDtos) {
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
            for(const cours_supprimer of this.state.filiere_langue.coursDtos){
                cours_supprimer_a += '<option value="'+cours_supprimer.cou_id+'">'+cours_supprimer.intitule+'</option>';
            }
            document.getElementById("cours_supprimer").innerHTML = cours_supprimer_a;

            let composante_a = "<tr>";
            if(this.state.filiere_langue.composanteDto != null){
                composante_a += "<td scope='row'>"+this.state.filiere_langue.composanteDto.nomComposante+"</td>";
            }
            composante_a += "</tr>";
            document.getElementById("composante_lie").innerHTML = composante_a;
            axios({
                url : '/composantes/multi',
                method : "get",
                }).then(res =>{
                this.setState({
                    composante_ajouter : res.data,
                });
                let composante_ajouter_a = '<option value="">Choisir un intitule</option>';
                for(const composante_ajouter of this.state.composante_ajouter){
                    composante_ajouter_a += '<option value="'+composante_ajouter.com_id+'">'+composante_ajouter.nomComposante+'</option>';
                }
                document.getElementById("composante_ajouter").innerHTML = composante_ajouter_a;
            })
        })
    }

    componentDidMount(){
        if(sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({url : '/filiere_langues/multi',
               method : "get",
        }).then(res => {
            this.setState({
                filiere_langues : res.data,
            });
            let filiere_langue_a = '<option value="">Choisir un nom</option>';
            for (const filiere_langue of this.state.filiere_langues) {
                filiere_langue_a += '<option value="'+filiere_langue.fil_id+'">'+filiere_langue.nom+'</option>';
              }
              document.getElementById("filiere_langue_recherche").innerHTML = filiere_langue_a;
        })
    }

    handleChange(event){
        this.setState({
            filiere_langue: {
                ...this.state.filiere_langue,
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
        this.state.filiere_langue_cours.fil_id = this.state.filiere_langue.fil_id;
        this.state.filiere_langue_cours.coursDtos = [this.state.coursDtos];
        axios({
            data:this.state.filiere_langue_cours,
            method : "put",
            url : '/filiere_langues/addCours',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Cours ajouté");
            this.rechercher();
        })
    }

    supprimer_cours() {
        this.state.filiere_langue_cours.fil_id = this.state.filiere_langue.fil_id;
        this.state.filiere_langue_cours.coursDtos = [this.state.coursDtos];
        axios({
            data:this.state.filiere_langue_cours,
            method : "put",
            url : '/filiere_langues/removeCours',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Cours supprimé");
            this.rechercher();
        })
    }

    handleChange_composante(event){
        this.setState({
            composanteDto: {
                ...this.state.composanteDto,
                [event.target.name]: event.target.value
            }
        });
    }

    ajouter_composante() {
        this.state.filiere_langue_composante.fil_id = this.state.filiere_langue.fil_id;
        this.state.filiere_langue_composante.composanteDto = this.state.composanteDto;
        axios({
            data:this.state.filiere_langue_composante,
            method : "put",
            url : '/filiere_langues/addComposante',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Composante ajoutée");
            this.rechercher();
        })
    }

    supprimer_composante() {
        this.state.filiere_langue_composante.fil_id = this.state.filiere_langue.fil_id;
        this.state.filiere_langue_composante.composanteDto = this.state.filiere_langue.composanteDto;
        axios({
            data:this.state.filiere_langue_composante,
            method : "put",
            url : '/filiere_langues/removeComposante',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            alert("Composante supprimée");
            this.rechercher();
        })
    }
}
export default ModifierFiliere_langue
