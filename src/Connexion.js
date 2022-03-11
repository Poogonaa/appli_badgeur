import axios from 'axios'
import React from 'react'

class Connexion extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            utilisateur : {
                login : "",
                mdp : "",
            },
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.connexion = this.connexion.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Connexion</h2>
                <br />
                <label>Login:</label>
                <br />
                <input type="text" name="login" value={this.state.utilisateur.login} onChange={this.handleChange}/>
                <br /><br/>
                <label>Mot de passe:</label>
                <br />
                <input type="text" name="mdp" value={this.state.utilisateur.mdp} onChange={this.handleChange}/>
                <br /><br/>
                <button className="btn btn-success start" onClick={this.connexion} >Connexion</button>
            </div>
        )   
    }

    connexion(){
        console.log("tentative de connexion")
        axios({
			data: this.state.utilisateur,
            method: "post",
            url: '/utilisateurs/signin',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            this.setState({
                utilisateur: res.data
            });
            sessionStorage.setItem("id", this.state.utilisateur.uti_id);
            sessionStorage.setItem("dtype", this.state.utilisateur.dtype);
            document.location.href = "/";
        })
    }

    handleChange(event){
        // immutable data
        this.setState({
            utilisateur: {
                ...this.state.utilisateur,
                [event.target.name]: event.target.value
            }
        });

    }


}
export default Connexion