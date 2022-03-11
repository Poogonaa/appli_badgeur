import React from "react";
import axios from "axios";

class RechercherComposante extends React.Component {
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
                <h2>Rechercher composante </h2>
                <label>Nom composante</label>
                <br/> <br/>
                <select name="com_id" id="composante_r" onChange={this.handleChange}></select>
                <br/> <br/>
                <button className="btn btn-success start" onClick={this.rechercher}>Rechercher </button>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <td>Nom Composante</td>
                        </tr>
                    </thead>
                    <tbody id ="composante"></tbody>
                </table>
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
        console.log("Selectionner composante")
        console.log(this.state.composante)
        axios({
            url: '/composantes/'+this.state.composante.com_id,
            method: "get",
        }).then(res => {
            this.setState({
                composante : res.data,
            });
            let composante_a = "";
            composante_a += "<tr>";
            composante_a += "<td>"+this.state.composante.nomComposante+"</td>";
            composante_a += "</tr>";
            document.getElementById("composante").innerHTML = this.state.composante.nomComposante;

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

export default RechercherComposante