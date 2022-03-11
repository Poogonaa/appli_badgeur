import React from 'react'
import axios from 'axios'

class ModifierFiliere_langue extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            filiere_langue : {},
            filiere_langues : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.modifier = this.modifier.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Rechercher une filiere langue</h2>
                <label>Login:</label>
                <div>
                    <br />
                    <select name="fil_id" id="filiere_langue_recherche" onChange={this.handleChange}>
                            
                    </select>
                    <br />
                    <br />
                    <button className="btn btn-success start" onClick={this.rechercher} >Rechercher</button>
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
}
export default ModifierFiliere_langue
