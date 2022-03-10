import axios from 'axios'
import React from 'react'

class ListerComposante extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            composantes: {},
        }
      
    }

   render() {
            return (
                <div>
                    <h2>Liste des composantes</h2>
                    <br />
                    <div id="affichage_composante">
                    </div>
                </div>
                )
    }
   

    componentDidMount  () {
        console.log("Lister des composantes")
        axios({
            method: "get",
            url: '/composantes/multi',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            this.setState({
                composantes : res.data,
            })
            console.log(this.state.composantes)

            let composante_a = "<ul>";
            for (const composante of this.state.composantes) {
                composante_a += "<li>"+composante.nomComposante+"</li>";
              }
              composante_a += "</ul>";
              document.getElementById("affichage_composante").innerHTML = composante_a;
        })
            .catch(err=> console.log(err))
    }
}

export default ListerComposante