/* eslint-disable react/prop-types */

import { useState } from "react";

/* eslint-disable react/no-unknown-property */
function Amigos({setPopUpActivo}) {
    const [menuAmigos,setMenuAmigos] = useState("lista-amigos")
    return(
        <div className="fondo-popup amigos" onClick={()=>{setPopUpActivo("");}}>
                <div id="contenedorAmigos" onClick={(e)=>{e.stopPropagation()}}>
                    <nav>
                    <i className="fa-solid fa-users icono-amigos" onClick={()=>{setMenuAmigos("lista-amigos")}} style={{borderBottom: (menuAmigos === "lista-amigos" ? "3px solid #FCAF58" : "")}}></i>
                    <h1 className="h1Amigos">Amigos</h1>
                    <i className="fa-solid fa-plus icono-amigos" onClick={()=>{setMenuAmigos("buscador-amigos")}} style={{borderBottom: (menuAmigos === "buscador-amigos" ? "3px solid #FCAF58" : "")}}></i>
                    </nav>
                    {menuAmigos === "buscador-amigos" && <BuscadorAmigos/>}
                    {menuAmigos === "lista-amigos" && <ListadoAmigos/>}
                </div>

                <div className="contenido-mis-records" onClick={(e)=>{e.stopPropagation()}}>
                <img id="imgRecords" src="https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg" alt="" />
                <h1 id="nick">Josito</h1>
                <div id="statsRecords">
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Mejor tiempo</h2>
                            <span className="rango">#2</span>
                        </div>
                        <p className="valor">
                            11.2s
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Mejor media de 5</h2>
                            <span className="rango">#2</span>
                        </div>
                        <p className="valor">
                            14.7s
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Victorias</h2>
                            <span className="rango">#5</span>
                        </div>
                        <p className="valor">
                            15
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Derrotas</h2>
                            <span className="rango">#2</span>
                        </div>
                        <p className="valor">
                            4
                        </p>
                    </div>
                </div>
                </div>
        </div>
    )
}
function ListadoAmigos() {
    return(
        <div id="listado-amigos">
            <SolicitudAmigo img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
            <Amigo esAmigo={true} img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
        </div>
    )
}
function Amigo({img, nombre, esAmigo}) {
    return(
        <div className="info-amigo">
            <img src={img} alt="" />
            <h3 style={{fontWeight : "200", fontSize : "larger"}}>{nombre}</h3>
            {esAmigo && <button className="botonEditarPerfil">Perfil</button>}
            {!esAmigo && <button className="botonEditarPerfil">Añadir</button>}
        </div>
    )
}
function SolicitudAmigo({img, nombre}) {
    return(
        <div className="info-amigo">
            <img src={img} alt="" />
            <h3 style={{fontWeight : "200", fontSize : "larger"}}>{nombre}</h3>
            {/* <button className="botonEditarPerfil">Perfil</button> */}
            <div className="contenedor-botones-solicitud">
                <button className="botonEditarPerfil" style={{backgroundColor : "#2292A4"}}>Aceptar</button>
                <button className="botonEditarPerfil" style={{backgroundColor : "#922D50"}}>Denegar</button>
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
    return(
        <div id="listado-amigos">
            <input type="text" id="buscador-amigos" style={estiloBuscador} placeholder="Buscar . . ."/>
            <Amigo esAmigo={false} img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
            <Amigo esAmigo={false} img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
            <Amigo esAmigo={false} img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
            <Amigo esAmigo={false} img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
            <Amigo esAmigo={false} img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
            <Amigo esAmigo={false} img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
            <Amigo esAmigo={false} img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
            <Amigo esAmigo={false} img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
        </div>
    )
}
export default Amigos