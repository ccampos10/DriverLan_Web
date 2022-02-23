import React, {useState} from 'react';
import Header from './Header';
import Menu from './Menu';

import './Config.css';

function Config(props) {
    const {setConeccion} = props;
    const {estaConectado, estaLogeado, ip, setLogeo} = props.propiedades;
    const [estaAbiertoMenu, setEstadoMenu] = useState(false);
    function abrirMenu() {
        setEstadoMenu(true);
    }
    function cerrarMenu() {
        setEstadoMenu(false);
    }

    function submit(e){
        e.preventDefault();
        const ip = e.target.Ip.value;
        if(ip.indexOf('http://') === 0) {
            fetch(ip)
            .then(res => {
                props.setIp(ip);
                setConeccion(true);
            })
            .catch(err => console.error(err));
        }
        else console.log('ip invalida');
    }

    return(
        <React.Fragment>
            <Header abrirMenu={abrirMenu} ip={ip} setLogeo={setLogeo} estaLogeado={estaLogeado}/>
            <section id="config">
                <form onSubmit={submit}>
                    <h2>Servidor</h2>
                    <p className="titulo">Estado:</p>
                    <p id="estado" className={estaConectado ? "conectado" : "desconectado"}>
                        <Estado estaConectado={estaConectado}/>
                    </p>
                    <br />
                    <p className="titulo">Direccion ip:</p>
                    <input type="text" name="Ip" id="ipInput" required/>
                    <input type="submit" value="Conectar" id="conectarButton" className={estaConectado ? "disable" : "enable"} disabled={estaConectado ? true : false}/>
                </form>
            </section>
            <Menu estaAbierto={estaAbiertoMenu} cerrarMenu={cerrarMenu} estaConectado={estaConectado} estaLogeado={estaLogeado}/>
        </React.Fragment>
    )
}

// Icono de desconectado
function Estado(props) {
    if(props.estaConectado) {
        return(
            <React.Fragment><i className="fas fa-check check"></i>Conectado con el servidor</React.Fragment>
        )
    }
    else {
        return(
        <React.Fragment>
            <div id="iconCloud">
                <i className="fas fa-cloud iconCloud"></i>
                <i className="fas fa-cloud iconCloud interior"></i>
                <i className="fas fa-slash iconCloud T" id="shadow"></i>
                <i className="fas fa-slash iconCloud"></i>
            </div>
            Sin coneccion con el servidor
        </React.Fragment>
        )
    }
}

export default Config;