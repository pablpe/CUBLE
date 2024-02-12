
import { useEffect } from "react"
import "../assets/Cronometro.css"
function Cronometro() {
    useEffect(()=>{
        document.getElementById("cubo").style.left = "65%"
        document.getElementById("cubo").style.top = "50%"
    },[])
    return (
        <div id="pantalla-cronometro">
            <div id="seccion-izquierda">
                <Logo/>
                <HeaderTiempos/>
                <Tiempos/>
            </div>
            <div id="seccion-derecha">

            </div>
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
function Tiempos() {
    
    return(
        <div id="tiempos">
            <Tiempo/>
            <Tiempo/>
            <Tiempo/>
            <Tiempo/>
            <Tiempo/>
            <Tiempo/>
            <Tiempo/>
            <Tiempo/>
            <Tiempo/>
        </div>
    )
}
function Tiempo() {
    return(
        <div className="tiempo">
            <i className="fa-solid fa-xmark eliminar-tiempo" style={{color : "#C00000",scale : "1.7"}}></i>
            <span className="valor-tiempo">17.7s</span>
            <span className="valor-media">17.5s</span>
        </div>
    )
}
export default Cronometro