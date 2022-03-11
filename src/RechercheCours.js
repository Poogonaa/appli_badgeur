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
        axios({
            method: "get",
            url: '/cours/'+this.state.cours.cou_id,
        }).then(res => {
            this.setState({
                cours: res.data
            });
            document.getElementById("cours").innerHTML = this.state.cours.intitule;
        })
    }

    handleChange(event){
        this.setState({
            cours: {
                ...this.state.cours,
                [event.target.name]: event.target.value
            }
        });

    }


}
export default RechercherCours
