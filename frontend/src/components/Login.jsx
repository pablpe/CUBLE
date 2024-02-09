
import { useEffect } from "react"
import "../assets/Login.css"
import sketch from "../assets/cubosRotando"
import p5 from "p5"

export default function Login() {
    useEffect(()=>{
        let sketchInstance;
        sketchInstance = new p5(sketch, 'sketch-container');
        return () => {
          sketchInstance.remove();
        };    
    },[])
    return (
        <div id="pantallaLogin" >
            <div id="sketch-container"></div>
            <Logo/>
            <FormRegistro/>
        </div>
    )
}
function Logo() {
    
}
function FormRegistro() {
    return(
        <div className="contenedorForm">
            <div className="contenedorInputs">
                <input placeholder="Nombre" type="text" id="inputNombre"/>
                <input placeholder="Primer apellido" type="text" id="inputApellido1"/>
                <input placeholder="Segundo apellido" type="text" id="inputApellido2"/>
                <input placeholder="Correo electrónico" type="text" id="inputCorreo"/>
                <input placeholder="Nick" type="text" id="inputNick"/>
                <input placeholder="Contraseña" type="password" id="inputPwd"/>
            </div>
            <div className="opcionesForm">
                <p className="mensajeOpcion">¿Ya tienes cuenta? <span style={{color : "blue"}}>Inicia sesión</span></p>
                <button className="botonEnvio">Registrarme</button>
            </div>
        </div>
    )
}
