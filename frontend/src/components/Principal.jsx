/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import "../assets/Principal.css"
import Amigos from "./Amigos"
import Perfil from "./Perfil"
import MisRecords from "./MisRecords"
import Rankings from "./Rankings"
import { Link } from "react-router-dom"

function Principal() {
    const [ultimoHover, setUltimoHover] = useState("")
    const [popUpActivo,setPopUpActivo] = useState("")
    useEffect(()=>{
        document.getElementById("cubo").style.display = "block"
        document.getElementById("cubo").style.left = "50%"
        document.getElementById("cubo").style.top = "50%"
    },[])
    return (
        <div id="pantalla-principal">
            <Nav setPopUpActivo={setPopUpActivo}/>
            <div id="burbuja"></div>
            <BotonPractica ultimoHover={ultimoHover} setUltimoHover={setUltimoHover}/>
            <BotonCronometro ultimoHover={ultimoHover} setUltimoHover={setUltimoHover}/>
            <Boton1vs1 ultimoHover={ultimoHover} setUltimoHover={setUltimoHover}/>
            {popUpActivo === "misRecords" ? <MisRecords setPopUpActivo={setPopUpActivo}/> : ""}
            {popUpActivo === "perfil" ? <Perfil setPopUpActivo={setPopUpActivo}/> : ""}
            {popUpActivo === "amigos" ? <Amigos setPopUpActivo={setPopUpActivo}/> :  ""}
            {popUpActivo === "rankings" ? <Rankings setPopUpActivo={setPopUpActivo}/> :  ""}
        </div>
    )
}
function Nav({setPopUpActivo}) {
    return(
        <nav id="navPrincipal">
            <Logo/>
            <div id="contenedor-opciones-nav">
                <span onClick={()=>{setPopUpActivo("amigos")}}>Amigos</span>
                <span onClick={()=>{setPopUpActivo("rankings")}}>Rankings</span>
                <span onClick={()=>{setPopUpActivo("misRecords")}}>Mis records</span>
                <img onClick={()=>{setPopUpActivo("perfil")}} src="https://64.media.tumblr.com/abc53e11a41ec4d895cb9f41712b595e/3cf5d0bf006b077a-41/s540x810/dedf82d88c9b79291f063feaded278673a3c8d25.jpg" alt="" />
            </div>
        </nav>
    )
}
function Logo() {
    return(
        <div id="logo">
            <span style={{color : "blue"}}>C</span><span style={{color : "orange"}}>u</span><span style={{color : "red"}}>ble</span>
        </div>
    )
}
function BotonPractica({ultimoHover, setUltimoHover}) {
    return(
        <Link id="boton-practica" className="boton-modo" onMouseEnter={()=>{
            let burbuja = document.getElementById("burbuja")
            burbuja.classList.toggle("activo");
            if (ultimoHover === "cronometro") burbuja.style.transform = "rotateZ(-100deg)"
            else if (ultimoHover === "1vs1") burbuja.style.transform = "rotateZ(255deg)"
            else burbuja.style.transform = "rotateZ(-100deg)"
            setUltimoHover("practica")
            }} 
            onMouseLeave={()=>{
                document.getElementById("burbuja").classList.toggle("activo");
                }}>
            Práctica
        </Link>
    )
}

function BotonCronometro({ultimoHover, setUltimoHover}) {
    return(
        <Link to={"/cronometro"} id="boton-cronometro" className="boton-modo" onMouseEnter={()=>{
            let burbuja = document.getElementById("burbuja")
            burbuja.classList.toggle("activo")
            if (ultimoHover === "1vs1") burbuja.style.transform = "rotateZ(15deg)"
            else if (ultimoHover === "practica") burbuja.style.transform = "rotateZ(15deg)"
            else burbuja.style.transform = "rotateZ(15deg)"
            setUltimoHover("cronometro")
            }} 
            onMouseLeave={()=>{document.getElementById("burbuja").classList.toggle("activo")}}>
            Cronómetro
        </Link>
    )
}
function Boton1vs1({ultimoHover, setUltimoHover}) {
    return(
        <Link id="boton-1vs1" className="boton-modo" onMouseEnter={()=>{
            let burbuja = document.getElementById("burbuja")
            burbuja.classList.toggle("activo")
            if (ultimoHover === "cronometro") burbuja.style.transform = "rotateZ(133deg)"
            else if (ultimoHover === "practica") burbuja.style.transform = "rotateZ(133deg)"
            else burbuja.style.transform = "rotateZ(133deg)"
            setUltimoHover("1vs1")
            }} 
            onMouseLeave={()=>{document.getElementById("burbuja").classList.toggle("activo")}}>
            1 <span style={{fontSize : "15px"}}>vs</span> 1
        </Link>
    )
}


export default Principal