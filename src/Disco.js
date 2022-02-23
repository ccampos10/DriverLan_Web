import React, {useState, useEffect} from 'react';
import Menu from './Menu';
import Header from './Header';

import './Disco.css';

function processRuta(ruta) {
    while (ruta.indexOf('/') !== -1) ruta = ruta.replace('/', '-');
    return ruta;
}

function MenuDisco(props) {
    const {ruta, setRuta, ip, reload} = props;
    // const {historial, setHistorial} = useState('');
    function backRuta() {
        if (ruta !== '/') {
            let newRuta = '';
            let carpetas = ruta.split('/');
            for (const carpetaI in carpetas) {
                if (carpetaI !== (carpetas.length-1).toString() && carpetaI !== '0') newRuta += '/' + carpetas[carpetaI];
            }
            setRuta(newRuta !== '' ? newRuta : '/');
        }
    }

    function newFolder() {
        let nombre = prompt('Cual es el nombre de la nueva carpeta?', 'NuevaCarpeta');
        if(nombre){
            fetch(ip + '/ruta/file/R' + (processRuta(ruta) === '-' ? '' : processRuta(ruta)) + '-' + nombre, {
                method: 'POST',
                credentials: 'include',
                headers: {'tipo': 'newFolder'}
            })
            .then(r => {reload()});
        }
    }

    function upLoad(e) {
        let files = e.target.files;
        let data = new FormData();
        for (const file of files) {
            data.append(file.name, file)
        }
        fetch(ip+'/ruta/file/R'+processRuta(ruta), {
            credentials: 'include',
            method: 'POST',
            headers: {'tipo': 'uploadFiles'},
            body: data
        })
        .then(r => {reload()});
    }

    return(
        <div id="MenuDisco">
            <div>
                <button onClick={backRuta} className={ruta === '/' ? 'disabled' : ''} disabled={ruta === '/' ? true : false}><i className="fas fa-chevron-left"></i></button>
                <button className='disabled' disabled><i className="fas fa-chevron-right"></i></button>
                <h3 id="rutaContenido">{ruta}</h3>
            </div>
            <div>
                <button onClick={newFolder} ><i className="fas fa-folder-plus"></i> Nueva Carpeta</button>
                <button onClick={() => document.getElementById('subirFile').click()} ><i className="fas fa-file-upload"></i> Subir Archivo</button>
                <input type="file" id="subirFile" style={{'display': 'none'}} onChange={upLoad} />
            </div>
        </div>
    )
}

function Elemento(props) {
    const {nombre, tipo, setRuta, ruta} = props;

    function Click() {
        if (tipo === "ruta"){
            if (ruta === '/') setRuta(ruta+nombre)
            else setRuta(ruta+'/'+nombre);
        }
    }

    return(
        <div className="elemento" onClick={Click}>
            {tipo === 'ruta' ? <i className="fas fa-folder"></i> : <i className="fas fa-file"></i>}
            <p>{nombre}</p>
        </div>
    )
}

function Disco(props) {
    const {estaConectado, estaLogeado, ip, setLogeo} = props.propiedades;
    const [estaAbiertoMenu, setEstadoMenu] = useState(false);
    const [ruta, setRuta] = useState('/');
    const [contenido, setContenido] = useState({rutas:[], archivos:[]});

    function abrirMenu() {
        setEstadoMenu(true);
    }
    function cerrarMenu() {
        setEstadoMenu(false);
    }

    useEffect(() => {
        fetch(ip+'/ruta/file/R'+processRuta(ruta), {credentials: 'include'})
        .then(res => res.json())
        .then(res => setContenido(res))
    }, [ruta, ip]);

    function reload() {
        fetch(ip+'/ruta/file/R'+processRuta(ruta), {credentials: 'include'})
        .then(res => res.json())
        .then(res => setContenido(res))
    }

    return(
        <React.Fragment>
            <Header abrirMenu={abrirMenu} ip={ip} setLogeo={setLogeo} estaLogeado={estaLogeado}/>
            <section id="Disco">
                <MenuDisco ruta={ruta} setRuta={setRuta} ip={ip} reload={reload} />
                <hr />
                {contenido.rutas.map((e, i) => <Elemento key={i} nombre={e} tipo="ruta" setRuta={setRuta} ruta={ruta} />)}
                {contenido.archivos.map((e, i) => <Elemento key={i} nombre={e} tipo="archivos" setRuta={setRuta} ruta={ruta} />)}
            </section>
            <Menu estaAbierto={estaAbiertoMenu} cerrarMenu={cerrarMenu} estaConectado={estaConectado} estaLogeado={estaLogeado}/>
        </React.Fragment>
    )
}

export default Disco;