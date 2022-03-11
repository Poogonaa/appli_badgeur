import axios from 'axios'
import React from 'react'

class SupprimerCours extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            cours : {},
        }
        this.handleChange = this.handleChange.bind(this);
        this.delete = this.delete.bind(this);
    }

    render() {
        console.log("[render] : donnée cours :" + JSON.stringify(this.state.cours))
        return (
            <div>
                <br />
                <input type="text" name="cou_id" value={this.state.cours.cou_id} onChange={this.handleChange}/>
                <br />
                <button className="btn btn-success start" onClick={this.delete} >Supprimer</button>
                <br/>
            </div>
        )   
    }

    componentDidMount(){

        if( sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
    }

    delete(){
        console.log("supprimer un cours")
        axios({
            method: "delete",
            url: '/cours/'+this.state.cours.cou_id,
        }).then(res => {
            console.log("le cours supprimé est " + res.data);
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
export default SupprimerCours
