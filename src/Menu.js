import React from 'react';
import {Link} from 'react-router-dom';

import './Menu.css'

function Menu(props) {
    const {estaAbierto, cerrarMenu, estaConectado, estaLogeado} = props;

    const enable = (
            <Link to="/Disco" className="elementoMenu">
            <i className="fas fa-cloud"></i>
            <h3>Disco</h3>
            </Link>
        )
    const disabled = (
            <div className="elementoMenu disabled">
            <i className="fas fa-cloud"></i>
            <h3>Disco</h3>
            </div>
        )

    return (
    <React.Fragment>
    { estaAbierto ? <div id="outMenu" onClick={cerrarMenu}/> : undefined }
    <section id='menu' className={estaAbierto ? "" : "disabled"}>
        <div id="opcionesBox">
            <Link to="/" className="elementoMenu">
                <i className="fas fa-home"></i>
                <h3>Inicio</h3>
            </Link>
            {estaLogeado ? enable : disabled}
            <Link to="Configuraciones" className="elementoMenu">
                <i className="fas fa-cog"></i>
                <h3>Configuraciones</h3>
            </Link>
        </div>
        <div id="estadoBox">
            <p id="estadoServer">
                {estaConectado ? "Conectado con el servidor local" : "Sin coneccion con el servidor local"}
            </p>
        </div>
    </section>
    </React.Fragment>
    )
}

export default Menu;