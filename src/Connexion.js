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
                <br/><br/>
                <div id = "msg_error">
                </div>
            </div>
        )   
    }

    connexion(){
        axios({
			data: this.state.utilisateur,
            method: "post",
            url: '/utilisateurs/signin',
            headers: { 'Content-Type': 'application/json'},
        }).then(res => {
            this.setState({
                utilisateur: res.data
            });
            if(this.state.utilisateur.uti_id !== undefined) {
                sessionStorage.setItem("id", this.state.utilisateur.uti_id);
                sessionStorage.setItem("dtype", this.state.utilisateur.dtype);
                document.location.href = "/";
            }
        }).catch(function (error) {
            document.getElementById("msg_error").innerHTML = "Login ou/et mot de passe incorrect."
          })
    }

    handleChange(event){
        this.setState({
            utilisateur: {
                ...this.state.utilisateur,
                [event.target.name]: event.target.value
            }
        });

    }


}
export default Connexion