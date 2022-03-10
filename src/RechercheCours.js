import axios from 'axios'
import React from 'react'

class RechercherCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            cours : {"cou_id":0},
        }
        this.handleChange = this.handleChange.bind(this);
        this.rechercher = this.rechercher.bind(this);
    }

    render() {
        console.log("[render] : donnée cours :" + JSON.stringify(this.state.cours))
        return (
            <div>
                <br />
                <input type="text" name="cou_id" value={this.state.cours.cou_id} onChange={this.handleChange}/>
                <br />
                <button className="btn btn-success start" onClick={this.rechercher} >Rechercher</button>
                <br/>
                <p id="cours"></p>
            </div>
        )   
    }

    rechercher(){
        console.log("selectionner un cours")
        axios({
            method: "get",
            url: '/cours/'+this.state.cours.cou_id,
        }).then(res => {
            console.log("le titre du cours est " + res.data);
            this.setState({
                cours: res.data
            });
            console.log("le titre du cours est " + this.state.cours.intitule);
           
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
export default RechercherCours
