/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

/* eslint-disable react/no-unknown-property */
function Amigos({setPopUpActivo}) {
    const [menuAmigos,setMenuAmigos] = useState("lista-amigos")
    const [id_perfil,setIdPerfil] = useState("")
    return(
        <div className="fondo-popup amigos" onClick={()=>{setPopUpActivo("");}}>
                <div id="contenedorAmigos" onClick={(e)=>{e.stopPropagation()}}>
                    <nav>
                    <i className="fa-solid fa-users icono-amigos" onClick={()=>{setMenuAmigos("lista-amigos")}} style={{borderBottom: (menuAmigos === "lista-amigos" ? "3px solid #FCAF58" : "")}}></i>
                    <h1 className="h1Amigos">Amigos</h1>
                    <i className="fa-solid fa-plus icono-amigos" onClick={()=>{setMenuAmigos("buscador-amigos")}} style={{borderBottom: (menuAmigos === "buscador-amigos" ? "3px solid #FCAF58" : "")}}></i>
                    </nav>
                    {menuAmigos === "buscador-amigos" && <BuscadorAmigos/>}
                    {menuAmigos === "lista-amigos" && <ListadoAmigos setIdPerfil={setIdPerfil}/>}
                </div>
                <Perfil id_perfil={id_perfil}/>
        </div>
    )
}
function Perfil({id_perfil}) {
    const [datosPerfil, setDatosPerfil] = useState({});
    
    useEffect(() => {
        fetch("http://localhost:8081/getPerfilID?id="+id_perfil)
        .then(res => res.json())
        .then(data => {
            setDatosPerfil(data[0]);
        });
    }, [id_perfil]);

    return (
        <>
        {datosPerfil?.nick && <div className="contenido-mis-records" onClick={(e) => {e.stopPropagation()}}>
            <img id="imgRecords" src={"../../public/imagenesPerfil/"+ datosPerfil?.imagen} alt="" />
            <h1 id="nick">{datosPerfil?.nick}</h1>
            <div id="statsRecords">
                <div className="stat">
                    <div className="contTituloRango">
                        <h2 className="titulo">Mejor tiempo</h2>
                        <span className="rango">#{datosPerfil?.rank_tiempo}</span>
                    </div>
                    <p className="valor">
                        {datosPerfil?.mejor_tiempo}s
                    </p>
                </div>
                <div className="stat">
                    <div className="contTituloRango">
                        <h2 className="titulo">Mejor media de 5</h2>
                        <span className="rango">#{datosPerfil?.rank_media}</span>
                    </div>
                    <p className="valor">
                        {datosPerfil?.mejor_media}s
                    </p>
                </div>
                <div className="stat">
                    <div className="contTituloRango">
                        <h2 className="titulo">Victorias</h2>
                        <span className="rango">#{datosPerfil?.rank_victorias}</span>
                    </div>
                    <p className="valor">
                        {datosPerfil?.victorias}
                    </p>
                </div>
                <div className="stat">
                    <div className="contTituloRango">
                        <h2 className="titulo">Derrotas</h2>
                        <span className="rango">#{datosPerfil?.rank_derrotas}</span>
                    </div>
                    <p className="valor">
                        {datosPerfil?.derrotas}
                    </p>
                </div>
            </div>
        </div>}
        </>
    );
}
function ListadoAmigos({setIdPerfil}) {
    const [solicitudes, setSolicitudes] = useState([])
    const [amigos, setAmigos] = useState([])
    useEffect(()=>{
        let id = window.sessionStorage.getItem("id_usuario")
        fetch("http://localhost:8081/getSolicitudesPendientes?id="+id)
        .then(res => res.json())
        .then(data => setSolicitudes([...data]))

        fetch("http://localhost:8081/getAmigosId?id="+id)
        .then(res => res.json())
        .then(data => setAmigos([...data]))
    },[])
    return(
        <div id="listado-amigos">
            {solicitudes.map(solicitud => {return <SolicitudAmigo img={solicitud.imagen} nick={solicitud.nick} id={solicitud.id_usuario} 
            key={solicitud.id_usuario} solicitudes={solicitudes} setSolicitudes={setSolicitudes} amigos={amigos} setAmigos={setAmigos}/> })}
            {amigos.map(amigo => {return <Amigo img={amigo.imagen} nick={amigo.nick} id={amigo.id_usuario} esAmigo={true} key={amigo.id_usuario} setIdPerfil={setIdPerfil}/>})}
        </div>
    )
}
function Amigo({img, nick, esAmigo,id,setIdPerfil,usuarios,setUsuarios}) {
    function verPerfil() {
        setIdPerfil(id)
    }
    function anadirUsuario() {
        let id_usuarioSolicitante = window.sessionStorage.getItem("id_usuario")
        // enviar solicitud de amistad
        let datos = {
            id_solicitante :  id_usuarioSolicitante,
            id_solicitado : id
        }
        const configuracion = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        };
        fetch("http://localhost:8081/enviarSolicitudAmistad", configuracion)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id));
                return response.text();
            })
            .then(data => console.log(data))
            .catch(error => {
                console.error('Error:', error);
            });
    }
    return(
        <div className="info-amigo">
            <img src={"../../public/imagenesPerfil/"+img} alt="" />
            <h3 style={{fontWeight : "200", fontSize : "larger"}}>{nick}</h3>
            {esAmigo == true ? <button onClick={verPerfil} className="botonEditarPerfil">Perfil</button> : <button onClick={anadirUsuario} className="botonEditarPerfil">Añadir</button>}
        </div>
    )
}


function SolicitudAmigo({img, nick,id, solicitudes, setSolicitudes, amigos, setAmigos}) {
    function anadirAmistad() {
        let id_usuarioMain = window.sessionStorage.getItem("id_usuario")
        let datos = {
            id_1 :  id_usuarioMain,
            id_2 : id
        }
        const configuracion = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        };
        fetch("http://localhost:8081/anadirAmistad", configuracion)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
                    let datos = {
                        id_solicitado :  id_usuarioMain,
                        id_solicitante : id
                    }
                    const configuracion = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(datos),
                    };
                    fetch("http://localhost:8081/eliminarSolicitudAmistad", configuracion)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        setSolicitudes(solicitudes.filter(solicitud => solicitud.id_usuario !== id));
                        const amigosActualizados = [...amigos, {id_usuario : id, imagen : img, nick : nick}];
                        // Actualizar el estado 'amigos' con la lista completa de amigos actualizada
                        setAmigos(amigosActualizados);
                        return response.text();
                    })
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    function denegarAmistad() {
        let id_usuarioMain = window.sessionStorage.getItem("id_usuario")
        let datos = {
            id_solicitado :  id_usuarioMain,
            id_solicitante : id
        }
        const configuracion = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        };
        fetch("http://localhost:8081/eliminarSolicitudAmistad", configuracion)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setSolicitudes(solicitudes.filter(solicitud => solicitud.id_usuario !== id));
            return response.text();
        })
    }
      //eEroMucho:)
    return(
        <div className="info-amigo">
            <img src={"../../public/imagenesPerfil/"+img} alt="" />
            <h3 style={{fontWeight : "200", fontSize : "larger"}}>{nick}</h3>
            <div className="contenedor-botones-solicitud">
                <button onClick={anadirAmistad} className="botonEditarPerfil" style={{backgroundColor : "#2292A4"}}>Aceptar</button>
                <button onClick={denegarAmistad} className="botonEditarPerfil" style={{backgroundColor : "#922D50"}}>Denegar</button>
            </div>
        </div>
    )
}
function BuscadorAmigos() {
    let estiloBuscador = {
        position : "sticky",
        top : "0.5rem",
        borderRadius : "20px",
        padding : "0.5rem",
        border : "none",
        transition : "all 0.4s"
    }
    let id = window.sessionStorage.getItem("id_usuario")
    const [usuarios, setUsuarios] = useState([])
    const [busqueda, setBusqueda] = useState("")
    useEffect(()=>{
        if(busqueda.length != 0){
            fetch("http://localhost:8081/buscarPersonas?id_u1="+id+"&nick="+busqueda)
            .then(res => res.json())
            .then(data => setUsuarios([...data]))
        }else setUsuarios([])
    },[busqueda])
    return(
        <div id="listado-amigos">
            <input type="text" id="buscador-amigos" style={estiloBuscador} placeholder="Buscar . . ." value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
            {usuarios.map(usuario => <Amigo esAmigo={false} img={usuario.imagen} nick={usuario.nick} id={usuario.id_usuario} key={usuario.id_usuario} usuarios={usuarios} setUsuarios={setUsuarios}/>)}
        </div>
    )
}
export default Amigos