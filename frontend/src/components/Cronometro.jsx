/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react"
import "../assets/Cronometro.css"
function Cronometro() {
    const [solveSeleccionado,setSolveSeleccionado] = useState(null)
    useEffect(()=>{
        document.getElementById("cubo").style.left = "65%"
        document.getElementById("cubo").style.top = "50%"
    },[])
    return (
        <div id="pantalla-cronometro">
            <div id="seccion-izquierda">
                <Logo/>
                <HeaderTiempos/>
                <Tiempos setSolveSeleccionado={setSolveSeleccionado}/>
            </div>
            <div id="seccion-derecha">
                <DisplayScramble/>
                <DatosSesion/>
            </div>
            {solveSeleccionado && <PopUpTiempo setSolveSeleccionado={setSolveSeleccionado}/>}
        </div>
    )
}

function Logo() {
    let estiloLogo = {
        width : "100%",
        padding : "1rem 0",
        height : "fit-content",
        backgroundColor : "#3C0B3C"
    }
    return(
        <div id="logo" style={estiloLogo}>
            <span style={{color : "blue"}}>C</span><span style={{color : "orange"}}>u</span><span style={{color : "red"}}>ble</span>
        </div>
    )
}
function HeaderTiempos() {
    return(
        <div id="header-tiempos">
            <h2 style={{left : "41%"}}>Tiempo</h2>
            <h3 style={{left : "68%"}}>Media de 5</h3>
        </div>
    )
}
function Tiempos({setSolveSeleccionado}) {
    
    return(
        <div id="tiempos">
            <Tiempo setSolveSeleccionado={setSolveSeleccionado}/>
            <Tiempo setSolveSeleccionado={setSolveSeleccionado}/>
            <Tiempo setSolveSeleccionado={setSolveSeleccionado}/>
            <Tiempo setSolveSeleccionado={setSolveSeleccionado}/>
            <Tiempo setSolveSeleccionado={setSolveSeleccionado}/>
            <Tiempo setSolveSeleccionado={setSolveSeleccionado}/>
            <Tiempo setSolveSeleccionado={setSolveSeleccionado}/>
            <Tiempo setSolveSeleccionado={setSolveSeleccionado}/>
            <Tiempo setSolveSeleccionado={setSolveSeleccionado}/>
        </div>
    )
}
function Tiempo({setSolveSeleccionado}) {
    return(
        <div className="tiempo" onClick={()=>{setSolveSeleccionado(1)}}>
            <i className="fa-solid fa-xmark eliminar-tiempo" style={{color : "#C00000",scale : "1.7"}}></i>
            <span className="valor-tiempo">17.7s</span>
            <span className="valor-media">17.5s</span>
        </div>
    )
}
function DisplayScramble() {
    return(
        <div id="displayScramble">
            U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2
        </div>
    )
}
function DatosSesion() {
    return(
        <div id="contenedor-datos-sesion">
            <h1 id="titulo-datos-sesion">Datos de la sesión</h1>
            <div id="datos-sesion">
                <span>media de movimientos : 58</span>
                <span>media TPS : 3.32</span>
            </div>
        </div>
    )
}
function PopUpTiempo({setSolveSeleccionado}) {
    return (
        <div id="fondo-popup-tiempo" onClick={()=>{setSolveSeleccionado(null)}}>
            <TiempoYDatos/>
            <ContenedorGrafico/>
            <ContenedorMovimientosYScramble/>
        </div>
    )
}
function TiempoYDatos() {
    return(
        <div id="tiempo-y-datos" onClick={(e)=>{e.stopPropagation()}}>
            <div className="dato">
                <p className="nombre-dato">Tiempo</p>
                <p className="valor-dato">12.54</p>
            </div>
            <div className="dato">
                <p className="nombre-dato">Nºmovimientos</p>
                <p className="valor-dato">72</p>
            </div>
            <div className="dato">
                <p className="nombre-dato">TPS</p>
                <p className="valor-dato">3.43</p>
            </div>
        </div>
    )
}
function ContenedorGrafico() {
    return(
        <div id="contenedor-grafico" onClick={(e)=>{e.stopPropagation()}}>
            <div id="grafico">

            </div>
        </div>
    )
}
function ContenedorMovimientosYScramble() {
    return(
        <div id="contenedor-movimientos-scramble" onClick={(e)=>{e.stopPropagation()}}>
            <div className="dato">
                <p className="nombre-dato">Scramble</p>
                <p className="valor-dato">U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2</p>
            </div>
            <div className="dato">
                <p className="nombre-dato">Movimientos</p>
                <p className="valor-dato">U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2</p>
            </div>
        </div>
    )
}
export default Cronometro