import React from "react";
import axios from "axios";

class SupprimerComposante extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            composante : {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.rechercher = this.rechercher.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }

    render() {
        return (
            <div>
                <h2>Supprimer composante </h2>
                <label>Nom composante</label>
                <br/> <br/>
                <select name="com_id" id="composante_r" onChange={this.handleChange}></select>
                <br/> <br/>
                <button className="btn btn-success start" onClick={this.rechercher}>Supprimer </button>
                <br/>
                <div id = "delete_success"></div>
            </div>
        )
    }

    componentDidMount() {
        console.log("Liste composantes")
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

    rechercher(){
        console.log("Delete composante")
        console.log(this.state.composante)
        axios({
            url: '/composantes/'+this.state.composante.com_id,
            method: "delete",
        }).then(res => {
            this.setState({
                composante : res.data,
            });
            document.getElementById("delete_success").innerHTML = "Composante supprimée";

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