import React from "react";
import axios from "axios";

class ModifierComposante extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            composante : {},
            composantes :{},
        }
        this.rechercher = this.rechercher.bind(this);
        this.enregistrer = this.enregistrer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return(
            <div>
                <h2>Rechercher la composante à modifier </h2>
                <label>Nom composante</label>
                <div>
                    <br></br>
                    <select name="com_id" id="composante" onChange={this.handleChange}></select>
                    <br/><br/>
                    <button className="btn btn-success start" onClick={this.rechercher}>Rechercher</button>
                    <br/><br/>
                </div>

                <label>Nom de la composante</label>
                <br/>
                <input type="text" name="nomComposante" value={this.state.composante.nomComposante} onChange={this.handleChange}></input>
                <br/><br/>
                <button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button>
            </div>
        )
    }

    enregistrer() {
        console.log("enregistrer")
        axios({
            data:this.state.composante,
            method : "put",
            url : '/composantes',
            headers : {'Content-Type': 'application/json'},
        }).then(res => {
            console.log(JSON.stringify(res.data))
        })
    }

    rechercher(event){
        console.log("afficher une composante")
        console.log(this.state.composante)
        axios({
            url : '/composantes/'+this.state.composante.com_id,
            method : "get",
        }).then(res =>{
            this.setState({
                composante : res.data,
            });
        })
    }

    componentDidMount(){
        if( sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        console.log("lister les composantes")
        axios({url:'/composantes/multi',
        method : "get",
    }).then(res => {
        this.setState({
            composantes : res.data,
        });
        console.log(this.state.composantes)
        let composante_a = '<option value="">Choisir un nom</option>';
        for(const composante of this.state.composantes){
            composante_a += '<option value="'+composante.com_id+'">'+composante.nomComposante +'</option>';
        }
        document.getElementById("composante").innerHTML = "<p>Modification réussi</p>";
       
        

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

}
export default ModifierComposante