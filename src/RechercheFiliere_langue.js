import axios from 'axios'
import React from 'react'

class RechercherFiliere_langue extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            filiere_langue : {},
            filiere_langues : {},
        }
        this.rechercher = this.rechercher.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Rechercher une filiere langue</h2>
                <label>Nom:</label>
                <br />
                <select name="fil_id" id="filiere_langue_recherche" onChange={this.handleChange}>
                            
                </select>
                <br />
                <br />
                <button className="btn btn-success start" onClick={this.rechercher} >Rechercher</button>
                <br />
                <table>
                    <thead>
                    <tr>
                        <td>Nom</td>
                        <td>Code</td>
                    </tr>
                    </thead>
                    <tbody id = "filiere_langue">
                    </tbody>                   
                </table>
            </div>
        )   
    }

    componentDidMount(){
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

    rechercher(){
        axios({
            url : '/filiere_langues/'+this.state.filiere_langue.fil_id,
            method : "get",
        }).then(res => {
            this.setState({
                filiere_langue : res.data,
            });
            let filiere_langue_a = "";
            filiere_langue_a += "<tr>";
            filiere_langue_a += "<td>"+this.state.filiere_langue.nom+"</td>";
            filiere_langue_a += "<td>"+this.state.filiere_langue.code+"</td>";
            filiere_langue_a += "</tr>"
            document.getElementById("filiere_langue").innerHTML = filiere_langue_a;
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
export default RechercherFiliere_langue
