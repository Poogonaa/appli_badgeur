import React from 'react'

class Deconnexion extends React.Component {

    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        return ( <div></div>) ; 
    }

    componentDidMount(){
        sessionStorage.clear();
        document.location.href = "/";
        
    }



}
export default Deconnexion
