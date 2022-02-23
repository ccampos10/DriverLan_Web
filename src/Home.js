import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Menu from './Menu';

import './Home.css';

let imgLink = 'https://drive.google.com/u/0/uc?id=1jHIfJHV5ea_iGZvAWQwTcd3VzrIjwOY3&export=download';

function Home(props) {
    const {estaLogeado, estaConectado, ip, setLogeo} = props.propiedades;
    const [estaAbiertoMenu, setEstadoMenu] = useState(false);
    function abrirMenu() {
        setEstadoMenu(true);
    }
    function cerrarMenu() {
        setEstadoMenu(false);
    }

    function logOut() {
        fetch(ip+'/logout', {credentials: 'include'})
        .then(() => setLogeo(false))
        .catch(err => console.error(err));
    }

    return(
    <React.Fragment>
        <header id="Home">
            <div id="Blur">
                <section id="menuOp">
                    <i className="fas fa-bars" onClick={abrirMenu}></i>
                    <div id="UserAcctions">
                    {( () => {
                        if(!estaLogeado){
                        return(<React.Fragment> <Link to='/Login'>Login</Link> <Link to='/SignUp'>Sign Up</Link> </React.Fragment>)}
                        else{
                        return( <Link to='#' onClick={logOut}>Logout</Link>)}
                    })() }

                    </div>
                </section>
                <img src={imgLink} alt="Logo"/>
                <h1>Driver Cloud</h1>
                <div id="Difuminado"></div>
            </div>
        </header>
        <section id="cuerpo">
            <h2>Descripcion</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, quos tenetur repudiandae magni nemo temporibus odio praesentium omnis consectetur ea similique nihil tempora! Corporis eligendi magnam commodi fugit itaque delectus.</p>
            <h2>Configuracion</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus quasi aliquam fugit aspernatur molestias ratione blanditiis possimus a dolorum quo totam ipsum aut, omnis cumque hic vitae facilis vero? Neque corporis ut alias ad iste, excepturi unde nesciunt, a itaque explicabo voluptatum blanditiis nam, dolores magni cupiditate consectetur harum soluta.</p>
            <div style={{height: 100}}></div>
        </section>
        <Menu estaAbierto={estaAbiertoMenu} cerrarMenu={cerrarMenu} estaConectado={estaConectado} estaLogeado={estaLogeado}/>
    </React.Fragment>
    )
}

export default Home;