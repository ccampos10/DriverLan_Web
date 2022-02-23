import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';

import "./Login.css";

function Login(props) {
    const {estaConectado, ip, setLogeo, estaLogeado} = props.propiedades;
    const [estaAbiertoMenu, setEstadoMenu] = useState(false);
    const [listo, setListo] = useState(false);
    let altura = window.visualViewport.height - 40;

    function abrirMenu() {
        setEstadoMenu(true);
    }
    function cerrarMenu() {
        setEstadoMenu(false);
    }

    function submit(e) {
        e.preventDefault();
        let UserName = e.target.username.value;
        let Password = e.target.password.value;
        fetch(ip+"/login", {
            method: 'POST',
            body: JSON.stringify({user: UserName, password: Password}),
            credentials: 'include',
            headers: {'content-type': 'application/json'}
        })
        .then(res => {
            if (res.status === 200){
                setLogeo(true);
                setListo(true);
            }
        })
        .catch(err => console.error(err));
    }

    return(
    <React.Fragment>
            {listo ? <Redirect to="/"/> : undefined}
            <Header abrirMenu={abrirMenu} ip={ip} setLogeo={setLogeo} estaLogeado={estaLogeado}/>
            <section id='Login' style={{height: altura}}>
                <form onSubmit={submit}>
                    <h2>Login</h2>
                    <p>UserName</p>
                    <input type="text" name='username' required />
                    <p>Password</p>
                    <input type="password" name='password' required />
                    <input type="submit" value="Conectar" id="submitLoginButt" />
                </form>
            </section>
            <Menu estaAbierto={estaAbiertoMenu} cerrarMenu={cerrarMenu} estaConectado={estaConectado} estaLogeado={estaLogeado}/>
    </React.Fragment>
    )
}

export default Login;