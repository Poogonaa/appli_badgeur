import axios from 'axios'
import React from 'react'

class ListerCompossante extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            composante: {},
        }
      
    }

   render() {
            return (
                <div>
                    <h2>Liste des composantes</h2>
                    <p></p>
                </div>
                )
    }
   

    componentDidMount  () {
        console.log("Lister des composantes")
        axios({
            data: this.state.composante,
            method: "get",
            url: '/composantes/multi',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            var composanteListe = [];
            for (var i = 0; i < data.length; i++) {
                var varcompo = data[i];
                composanteListe.push(varcompo);
            }
            console.log(composanteListe);
            this.setState({ composanteListe })
            console.log(this.state.composanteListe);

        })
            .catch(err=> console.log(err))
    }
}