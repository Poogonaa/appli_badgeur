import axios from 'axios'
import React from 'react'

class ListerCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            cours : {},
        }
        this.lister = this.lister.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Liste des Cours</h2>
                <p></p>
            </div>
        )   
    }

    lister(){
        console.log("lister les cours")
        axios({
            data:this.state.cours,
            method: "get",
            url: '/cours/multi',
            headers: {'content-Type': 'application/json'},
        }).then(res => {
            console.log(JSON.stringify(res.data))
        })
    }

}
export default ListerCours
