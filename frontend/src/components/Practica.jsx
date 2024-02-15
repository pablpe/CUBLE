import { useEffect } from "react"
import "../assets/Practica.css"
function Practica() {
    useEffect(()=>{
        document.getElementById("cubo").style.left = "50%"
        document.getElementById("cubo").style.top = "120%"
    },[])
    return (
        <div id="pantalla-practica">
            <ContenedorAlgsets/>
            <ContenedorCuboYTiempos/>
        </div>
    )
}
function ContenedorAlgsets(){
    return (
        <div id="contenedor-opciones-algset">
            <div id="tipos-algset">
                <div className="tipo-algset">CMLL</div>
                <div className="tipo-algset">OLL</div>
                <div className="tipo-algset">PLL</div>
            </div>
            <div id="contenedor-casos">
                <div className="caso"><Cubo2D/></div>
                <div className="caso"><Cubo2D/></div>
                <div className="caso"><Cubo2D/></div>
                <div className="caso"><Cubo2D/></div>
                <div className="caso"><Cubo2D/></div>
                <div className="caso"><Cubo2D/></div>
                <div className="caso"><Cubo2D/></div>
                <div className="caso"><Cubo2D/></div>
                <div className="caso"><Cubo2D/></div>
            </div>
        </div>
    )
}

function ContenedorCuboYTiempos() {
    return(
        <div id="cubo-y-tiempos">
            <div id="caso-actual"><Cubo2D/>Tiempo : 2.75s</div>
            <div id="tiempo-actual">Media : 3.21s</div>
            <div id="media-sesion"></div>
        </div>
    )
}

function Cubo2D() {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{width : "100%",height : "100%"}} viewBox="-0.9 -0.9 1.8 1.8">
  <rect fill="transparent" x="-0.9" y="-0.9" width="1.8" height="1.8"></rect>
  <g style={{ strokeWidth: 0.1, strokeLinejoin: "round", opacity: 1 }}>
    <polygon fill="#000000" stroke="#000000" points="-0.522222222222,-0.522222222222 0.522222222222,-0.522222222222 0.522222222222,0.522222222222 -0.522222222222,0.522222222222"></polygon>
  </g>
  <g style={{ opacity: 1, strokeOpacity: 0.5, strokeWidth: 0, strokeLinejoin: "round" }}>
    <polygon id="Ubl" fill="#08F" stroke="#000000" points="-0.527777777778,-0.527777777778 -0.212962962963,-0.527777777778 -0.212962962963,-0.212962962963 -0.527777777778,-0.212962962963"></polygon>
    <polygon id="Ub" fill="#EF0" stroke="#000000" points="-0.157407407407,-0.527777777778 0.157407407407,-0.527777777778 0.157407407407,-0.212962962963 -0.157407407407,-0.212962962963"></polygon>
    <polygon id="Urb" fill="#F90" stroke="#000000" points="0.212962962963,-0.527777777778 0.527777777778,-0.527777777778 0.527777777778,-0.212962962963 0.212962962963,-0.212962962963"></polygon>
    <polygon id="Ul" fill="#EF0" stroke="#000000" points="-0.527777777778,-0.157407407407 -0.212962962963,-0.157407407407 -0.212962962963,0.157407407407 -0.527777777778,0.157407407407"></polygon>
    <polygon id="U" fill="#EF0" stroke="#000000" points="-0.157407407407,-0.157407407407 0.157407407407,-0.157407407407 0.157407407407,0.157407407407 -0.157407407407,0.157407407407"></polygon>
    <polygon id="Ur" fill="#EF0" stroke="#000000" points="0.212962962963,-0.157407407407 0.527777777778,-0.157407407407 0.527777777778,0.157407407407 0.212962962963,0.157407407407"></polygon>
    <polygon id="Ulf" fill="#EF0" stroke="#000000" points="-0.527777777778,0.212962962963 -0.212962962963,0.212962962963 -0.212962962963,0.527777777778 -0.527777777778,0.527777777778"></polygon>
    <polygon id="Uf" fill="#EF0" stroke="#000000" points="-0.157407407407,0.212962962963 0.157407407407,0.212962962963 0.157407407407,0.527777777778 -0.157407407407,0.527777777778"></polygon>
    <polygon id="Ufr" fill="#F10" stroke="#000000" points="0.212962962963,0.212962962963 0.527777777778,0.212962962963 0.527777777778,0.527777777778 0.212962962963,0.527777777778"></polygon></g>
    <g style={{ opacity: 1, strokeOpacity: 1, strokeWidth: 0.02, strokeLinejoin: "round" }}>
    <polygon id="uBl" fill="#EF0" stroke="#000000" points="-0.195146871009,-0.554406130268 -0.543295019157,-0.554406130268 -0.507279693487,-0.718390804598 -0.183141762452,-0.718390804598"></polygon>
    <polygon id="uB" fill="#222" stroke="#000000" points="0.174457215837,-0.554406130268 -0.173690932312,-0.554406130268 -0.161685823755,-0.718390804598 0.16245210728,-0.718390804598"></polygon>
    <polygon id="urB" fill="#0C0" stroke="#000000" points="0.544061302682,-0.554406130268 0.195913154534,-0.554406130268 0.183908045977,-0.718390804598 0.508045977011,-0.718390804598"></polygon>
    <polygon id="ubL" fill="#F90" stroke="#000000" points="-0.554406130268, -0.544061302682 -0.554406130268, -0.195913154534 -0.718390804598,-0.183908045977 -0.718390804598,-0.508045977011"></polygon>
    <polygon id="ul" fill="#222" stroke="#000000" points="-0.554406130268, -0.174457215837 -0.554406130268,0.173690932312 -0.718390804598,0.161685823755 -0.718390804598,-0.16245210728"></polygon>
    <polygon id="ulf" fill="#F10" stroke="#000000" points="-0.554406130268,0.195146871009 -0.554406130268,0.543295019157 -0.718390804598,0.507279693487 -0.718390804598,0.183141762452"></polygon>
    <polygon id="uRb" fill="#EF0" stroke="#000000" points="0.554406130268, -0.195146871009 0.554406130268, -0.543295019157 0.718390804598,-0.507279693487 0.718390804598,-0.183141762452"></polygon>
    <polygon id="uR" fill="#222" stroke="#000000" points="0.554406130268,0.174457215837 0.554406130268, -0.173690932312 0.718390804598,-0.161685823755 0.718390804598,0.16245210728"></polygon>
    <polygon id="ufR" fill="#08F" stroke="#000000" points="0.554406130268,0.544061302682 0.554406130268,0.195913154534 0.718390804598,0.183908045977 0.718390804598,0.508045977011"></polygon>
    <polygon id="ulF" fill="#0C0" stroke="#000000" points="-0.544061302682,0.554406130268 -0.195913154534,0.554406130268 -0.183908045977,0.718390804598 -0.508045977011,0.718390804598"></polygon>
    <polygon id="uF" fill="#222" stroke="#000000" points="-0.174457215837,0.554406130268 0.173690932312,0.554406130268 0.161685823755,0.718390804598 -0.16245210728,0.718390804598"></polygon>
    <polygon id="uFr" fill="#EF0" stroke="#000000" points="0.195146871009,0.554406130268 0.543295019157,0.554406130268 0.507279693487,0.718390804598 0.183141762452,0.718390804598"></polygon>
    </g>
    </svg>
    )
}

export default Practica