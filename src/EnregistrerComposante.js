import React from 'react'
import axios from 'axios'

class EnregistrerComposante extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			composante: {},
		}
		this.enregistrer = this.enregistrer.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	render() {
		return (
			<div>
				<h2> Enregistrement d'une composante </h2>
				<br />
				<label>Nom:</label>
                <br />
				<input type="text" name="nomComposante" value={this.state.composante.nomComposante} onChange={this.handleChange} />
				<br /><br />
				<button className="btn btn-success start" onClick={this.enregistrer}> Enregistrer</button>
				<br />
                <div id="add_success">
                </div>
			</div>
			)
	}

	componentDidMount(){
        if( sessionStorage.getItem("dtype") !== "Gestionnaire"){
            document.location.href = "/";
        }
    }

	enregistrer() {
		axios({
			data: this.state.composante,
			method: "post",
			url: '/composantes',
			headers: { 'Content-Type': 'application/json' },
		}).then(res => {
			document.getElementById("add_success").innerHTML = "<p>Ajout réussi!</p>";
		})
	}

	handleChange(event) {
		this.setState({
			composante: {
				...this.state.composante,
				[event.target.name]: event.target.value
			}
		});
	}
}
export default EnregistrerComposante