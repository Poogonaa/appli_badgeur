import React from 'react'

class Naviguer extends React.Component {
    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render(){
        return (
            <div>
          </div>
        )
    }

    componentDidMount(){
        console.log(sessionStorage.getItem("id"))
        let affichage_navigation = '<ul><li><a href="/">Accueil</a></li>'
        if(sessionStorage.getItem("id") === null){
            affichage_navigation += '<li><a href="/Connexion">Connexion</a></li></ul>';
        }
        else{
            affichage_navigation += '<li><a href="/Deconnexion">Déconnexion</a></li></ul>';
        }
        if(sessionStorage.getItem("dtype") === "Gestionnaire"){
            affichage_navigation += '<h5>Cours</h5>';
            affichage_navigation += '<ul>';
                affichage_navigation += '<li><a href="/EnregistrerCours">Enregistrer un cours</a></li>';
                affichage_navigation += '<li><a href="/ListerCours">Lister les cours</a></li>';
                affichage_navigation += '<li><a href="/RechercheCours">Rechercher un cours</a></li>';
                affichage_navigation += '<li><a href="/ModifierCours">Modifier un cours</a></li>';
                affichage_navigation += '<li><a href="/SupprimerCours">Supprimer un cours</a></li>';
            affichage_navigation += '</ul>';
            affichage_navigation += '<h5>Intervenant</h5>';
            affichage_navigation += '<ul>';
                affichage_navigation += '<li><a href="/EnregistrerIntervenant">Enregistrer un intervenant</a></li>';
                affichage_navigation += '<li><a href="/ListerIntervenant">Lister les intervenants</a></li>';
                affichage_navigation += '<li><a href="/RechercheIntervenant">Rechercher un intervenant</a></li>';
                affichage_navigation += '<li><a href="/ModifierIntervenant">Modifier un intervenant</a></li>';
                affichage_navigation += '<li><a href="/SupprimerIntervenant">Supprimer un intervenant</a></li>';
            affichage_navigation += '</ul>';
            affichage_navigation += '<h5>Gestionnaire</h5>';
            affichage_navigation += '<ul>';
                affichage_navigation += '<li><a href="/EnregistrerGestionnaire">Enregistrer un gestionnaire</a></li>';
                affichage_navigation += '<li><a href="/ListerGestionnaire">Lister les gestionnaires</a></li>';
                affichage_navigation += '<li><a href="/RechercheGestionnaire">Rechercher un gestionnaire</a></li>';
                affichage_navigation += '<li><a href="/ModifierGestionnaire">Modifier un gestionnaire</a></li>';
                affichage_navigation += '<li><a href="/SupprimerGestionnaire">Supprimer un gestionnaire</a></li>';
            affichage_navigation += '</ul>';
            affichage_navigation += '<h5>Composante</h5>';
            affichage_navigation += '<ul>';
                affichage_navigation += '<li><a href="/EnregistrerComposante">Enregistrer une composante</a></li>';
                affichage_navigation += '<li><a href="/ListerComposante">Lister les composantes</a></li>';
                affichage_navigation += '<li><a href="/ModifierComposante">Modifier une composante</a></li>';
                affichage_navigation += '<li><a href="/RechercherComposante">Rechercher une composante</a></li>';
                affichage_navigation += '<li><a href="/SupprimerComposante">Supprimer une composante</a></li>';
            affichage_navigation += '</ul>';
            affichage_navigation += '<h5>Filière Langue</h5>';
            affichage_navigation += '<ul>';
                affichage_navigation += '<li><a href="/EnregistrerFiliere_langue">Enregistrer une filière langue</a></li>';
                affichage_navigation += '<li><a href="/ListerFiliere_langue">Lister les filières langues</a></li>';
                affichage_navigation += '<li><a href="/ModifierFiliere_langue">Modifier une filière langue</a></li>';
                affichage_navigation += '<li><a href="/RechercherFiliere_langue">Rechercher une filière langue</a></li>';
                affichage_navigation += '<li><a href="/SupprimerFiliere_langue">Supprimer une filière langue</a></li>';
            affichage_navigation += '</ul>';
        } else if(sessionStorage.getItem("dtype") == "Intervenant"){
            affichage_navigation += '<h5>Cours</h5>';
            affichage_navigation += '<ul>';
                affichage_navigation +='<li><a href="/ListerSeanceEffectuee">Lister les Séances de Formation effectuées</a></li>';
            affichage_navigation += '</ul>>';

        }
        document.getElementById("Gestion").innerHTML = affichage_navigation;
    }
}

export default Naviguer;