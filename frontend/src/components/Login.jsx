/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import "../assets/Login.css"
import sketch from "../assets/cubosRotando"
import p5 from "p5"
import { Link } from "react-router-dom"



export default function Login() {
    const [enLogin, setEnlogin] = useState(false)
    useEffect(()=>{
        let sketchInstance;
        sketchInstance = new p5(sketch, 'sketch-container');
        let cubo = document.getElementById("cubo")//.querySelector("canvas")
        if(cubo) cubo.style.display = "none"
        return () => {
          sketchInstance.remove();
        };    
    },[])
    return (
        <div id="pantallaLogin" >
            <div id="sketch-container"></div>
            <Logo/>
            {enLogin ? <FormLogin setEnlogin={setEnlogin}/> : <FormRegistro setEnlogin={setEnlogin}/>}
        </div>
    )
}
function Logo() {
    
}
function FormRegistro({setEnlogin}) {
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
                <p className="mensajeOpcion">¿Ya tienes cuenta? <span style={{color : "blue",cursor : "pointer"}} onClick={()=>{setEnlogin(true)}}>Inicia sesión</span></p>
                <Link to={"/principal"} className="botonEnvio" onClick={()=>{}}>Registrarme</Link>
            </div>
        </div>
    )
}
function FormLogin({setEnlogin}) {
    return(
        <div className="contenedorForm">
            <div className="contenedorInputs">
                <input placeholder="Correo electrónico" type="text" id="inputCorreo"/>
                <input placeholder="Contraseña" type="password" id="inputPwd"/>
            </div>
            <div className="opcionesForm">
                <p className="mensajeOpcion">¿No tienes cuenta? <span style={{color : "blue",cursor : "pointer"}} onClick={()=>{setEnlogin(false)}}>Registrate</span></p>
                <button className="botonEnvio">Iniciar sesion</button>
            </div>
        </div>
    )
}
