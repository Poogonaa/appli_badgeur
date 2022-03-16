import axios from 'axios'
import React from 'react'

class ListerFiliere_langue extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            filiere_langues : {},
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Liste des filières langues</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="row">Nom</th>
                        <th scope="row">Code</th>
                    </tr>
                    </thead>
                    <tbody id = "filiere_langue">
                    </tbody>                   
                </table>
            </div>
        )   
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
            let filiere_langue_a = "";
            for (const filiere_langue of this.state.filiere_langues) {
                filiere_langue_a += "<tr>";
                filiere_langue_a += "<td scope='row'>"+filiere_langue.nom+"</td>";
                filiere_langue_a += "<td scope='row'>"+filiere_langue.code+"</td>";
                filiere_langue_a += "</tr>"
              }
              document.getElementById("filiere_langue").innerHTML = filiere_langue_a;
        })
    }

}
export default ListerFiliere_langue;
