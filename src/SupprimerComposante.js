import React from "react";
import axios from "axios";

class SupprimerComposante extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            composante : {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.supprimer = this.supprimer.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }

    render() {
        return (
            <div>
                <h2>Supprimer une composante </h2>
                <label>Nom</label>
                <br/>
                <select name="com_id" id="composante_r" onChange={this.handleChange}></select>
                <br/> <br/>
                <button className="btn btn-danger start" onClick={this.supprimer}>Supprimer </button>
            </div>
        )
    }

    componentDidMount() {
        if( sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
        axios({
            url : '/composantes/multi',
            method : 'get',
        }).then(res => {
            this.setState({
                composantes : res.data,
            });
            let composante_a = '<option value="">Choisir une compsante</option>';
            for (const composante of this.state.composantes) {
                composante_a += '<option value="'+composante.com_id+'">' +composante.nomComposante+'</option> '
            }
            document.getElementById("composante_r").innerHTML = composante_a;

        })
    }

    supprimer(){
        console.log(this.state.composante)
        axios({
            url: '/composantes/'+this.state.composante.com_id,
            method: "delete",
        }).then(res => {
            this.setState({
                composante : res.data,
            });
            alert("Composante supprimée");
            this.componentDidMount();
        })
    }

    handleChange(event){
        this.setState({
            composante: {
                ...this.state.composante,
                [event.target.name] : event.target.value
            }
        });
    }
}

export default SupprimerComposante