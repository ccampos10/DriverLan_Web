import {Fragment} from 'react';
import {Link} from 'react-router-dom';

import "./Header.css";

function Header(props) {

    function logOut() {
        fetch(props.ip+'/logout', {credentials: 'include'})
        .then(() => props.setLogeo(false))
        .catch(err => console.error(err));
    }

    return(
        <header id="genericHeader">
            <div id="blur">
                <i className="fas fa-bars" onClick={props.abrirMenu}></i>
                <div id="UserAcctions">
                    {( () => {
                        if(!props.estaLogeado){
                        return(<Fragment> <Link to='/Login'>Login</Link> <Link to='/SignUp'>Sign Up</Link> </Fragment>)}
                        else{
                        return(<Link to='#' onClick={logOut}>Logout</Link>)}
                    })() }

                </div>
            </div>

        </header>
    )
}

export default Header;