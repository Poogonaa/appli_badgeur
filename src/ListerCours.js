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
        console.log(this.state.cours)
        console.log("nombre de cours : "+this.state.cours.length)
        return (
            <div>
                <h2>Liste des Cours</h2>
                <p id="cours"></p>
            </div>
        )   
    }

    componentDidMount(){
        console.log("lister les cours")
        axios({
            method: "get",
            url: '/cours/multi',
        }).then(res => {
            //console.log(JSON.stringify(res.data))
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
