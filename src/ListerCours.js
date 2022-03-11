import axios from 'axios'
import React from 'react'

class ListerCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            cours : {},
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Liste des Cours</h2>
                <p id="cours"></p>
            </div>
        )   
    }

    componentDidMount(){

        if( sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }

        axios({
            method: "get",
            url: '/cours/multi',
        }).then(res => {
            this.setState({
                cours: res.data
            });
            let listCours = "<ul>";
            for (let i = 0; i < this.state.cours.length ; i++){
                listCours += "<li>" + this.state.cours[i].intitule + "</li>";
            }
            listCours += "</ul>";
            document.getElementById("cours").innerHTML = listCours;
        })
    }



}
export default ListerCours
