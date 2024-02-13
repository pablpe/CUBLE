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

            </div>
            <div id="contenedor-casos">
                
            </div>
        </div>
    )
}
function ContenedorCuboYTiempos() {
    
}
export default Practica