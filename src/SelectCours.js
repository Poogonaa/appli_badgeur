import axios from 'axios'
import React from 'react'

class ListerCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            cours : {},
        }
        this.handleChange = this.handleChange.bind(this);
        this.rechercher = this.rechercher.bind(this);
    }

    render() {
        console.log(this.state.cours)
        return (
            <div>
                <br />
                <input type="text" name="id" value={this.state.cours.id} onChange={this.handleChange}/>
                <br />
                <button className="btn btn-success start" onClick={this.rechercher} >Rechercher</button>
                <br/>
                <h2>Voici le cours numéro </h2>
                <p id="cours"></p>
            </div>
        )   
    }

    rechercher(){
        console.log("selectionner un cours")
        axios({
            data:this.state.cours,
            method: "get",
            url: '/cours/mono',
            headers: { 'Content-type': 'application/json'},
        }).then(res => {
            //console.log(JSON.stringify(res.data))
            this.setState({
                cours: res.data
            });
            //console.log("le titre du cours est " + this.state.cours.intitule);
            console.log("le titre du cours est " + res.data);
            document.getElementById("cours").innerHTML = this.state.cours.intitule;
        })
    }

    handleChange(event){
        // immutable data
        this.setState({
            cours: {
                ...this.state.cours,
                [event.target.name]: event.target.value
            }
        });

    }


}
export default ListerCours
