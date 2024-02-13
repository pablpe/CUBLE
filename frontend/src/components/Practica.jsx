import { useEffect } from "react"
import "../assets/Practica.css"
function Practica() {
    useEffect(()=>{
        document.getElementById("cubo").style.left = "50%"
        document.getElementById("cubo").style.top = "120%"
    },[])
    return (
        <div id="pantalla-practica">
            <div id="contenedor-opciones-algset">

            </div>
        </div>
    )
}
export default Practica