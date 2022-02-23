import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';

import './SignUp.css';

function SignUP(props) {
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
        const UserName = e.target.username.value;
        const Email = e.target.email.value;
        const Password = e.target.password.value;
        fetch(ip+'/register',{
            method: 'POST',
            body: JSON.stringify({username: UserName, email: Email, password: Password}),
            credentials: 'include',
            headers: {'content-type': 'application/json'},
        })
        .then(res => {
            if (res.status === 200) {
                setListo(true);
            }
            else {
                console.log('nombre o email ya en uso')
            }
        })
        .catch(err => console.error(err));
    }

    return(
        <React.Fragment>
            {listo ? <Redirect to="/"/> : undefined}
            <Header abrirMenu={abrirMenu} ip={ip} setLogeo={setLogeo} estaLogeado={estaLogeado}/>
            <section id='SignUp' style={{height: altura}}>
                <form onSubmit={submit}>
                    <h2>SignUp</h2>
                    <p>UserName</p>
                    <input type="text" name="username" required/>
                    <p>Email</p>
                    <input type="email" name="email" required/>
                    <p>Password</p>
                    <input type="password" name="password" required/>
                    <input type="submit" value="Enviar" id="submitSignUpButt"/>
                </form>
            </section>
            <Menu estaAbierto={estaAbiertoMenu} cerrarMenu={cerrarMenu} estaConectado={estaConectado} estaLogeado={estaLogeado}/>
        </React.Fragment>
    );
}

export default SignUP;