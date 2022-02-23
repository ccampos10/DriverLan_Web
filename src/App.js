import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Config from './Config';
import Home from './Home';
import Disco from './Disco';
import Login from './Login';
import SignUP from './SignUp';

import "./App.css";

function App() {
    const [ip, setIp] = useState("http://localhost:80"); //Direccion por defecto del server
    const [estaConectado, setConeccion] = useState(false);
    const [estaLogeado, setLogeo] = useState(false);
    const propiedades = {ip,estaConectado,estaLogeado,setLogeo};

    fetch(ip, {credentials: 'include'})
    .then(res => {
        setConeccion(true);
        if (res.status === 200){
            setLogeo(true);
        }
    })
    .catch(err => console.error(err));

    if(!estaConectado && estaLogeado) setLogeo(false);

    return(
    <React.Fragment>
        <Router>
            <Switch>
                <Route path="/Configuraciones">
                    <Config propiedades={propiedades} setIp={setIp} setConeccion={setConeccion}/>
                </Route>
                <Route path="/Login">
                    <Login propiedades={propiedades}/>
                </Route>
                <Route path="/Disco">
                    {estaLogeado ? <Disco propiedades={propiedades}/> : <Redirect to="/"/>}
                </Route>
                <Route path="/SignUP">
                    <SignUP propiedades={propiedades}/>
                </Route>
                <Route path="/">
                    <Home propiedades={propiedades}/>
                </Route>
            </Switch>
        </Router>

    </React.Fragment>
    )
}

export default App;