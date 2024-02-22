/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import "../assets/Login.css"
import sketch from "../assets/cubosRotando"
import p5 from "p5"
import { Link } from "react-router-dom"



export default function Login() {
    const [enLogin, setEnlogin] = useState(true)
    useEffect(() => {
        let sketchInstance;
        sketchInstance = new p5(sketch, 'sketch-container');
        let cubo = document.getElementById("cubo")//.querySelector("canvas")
        if (cubo) cubo.style.display = "none"
        return () => {
            sketchInstance.remove();
        };
    }, [])
    return (
        <div id="pantallaLogin" >
            <div id="sketch-container"></div>
            <Logo />
            {enLogin ? <FormLogin setEnlogin={setEnlogin} /> : <FormRegistro setEnlogin={setEnlogin} />}
        </div>
    )
}
function Logo() {

}
function FormRegistro({ setEnlogin }) {
    function mailUsado() {
        return false
    }
    function nickUsado() {
        return false
    }
    function nuevoUsuarioValido() {
        if (!mailUsado() && !nickUsado()) {
            const datos = {
                nombre: document.getElementById("inputNombre").value,
                apellido1: document.getElementById("inputApellido1").value,
                apellido2: document.getElementById("inputApellido2").value,
                email: document.getElementById("inputCorreo").value,
                nick: document.getElementById("inputNick").value,
                contrasena: document.getElementById("inputPwd").value
            }
            const configuracion = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            };
            fetch("http://localhost:8081/usuarioAlta", configuracion)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
            window.localStorage.setItem("nick", document.getElementById("inputNick").value)
            return true
        }
        return false
    }
    useEffect(() => {
        window.localStorage.setItem("nick", "hola")
    }, [])
    return (
        <div className="contenedorForm">
            <form className="contenedorInputs">
                <input placeholder="Nombre" type="text" id="inputNombre" />
                <input placeholder="Primer apellido" type="text" id="inputApellido1" />
                <input placeholder="Segundo apellido" type="text" id="inputApellido2" />
                <input placeholder="Correo electrónico" type="text" id="inputCorreo" />
                <input placeholder="Nick" type="text" id="inputNick" />
                <input placeholder="Contraseña" type="password" id="inputPwd" />
            </form>
            <div className="opcionesForm">
                <p className="mensajeOpcion">¿Ya tienes cuenta? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => { setEnlogin(true) }}>Inicia sesión</span></p>
                <Link to={"/principal"} className="botonEnvio" onClick={(e) => {
                    if (!nuevoUsuarioValido()) e.preventDefault()
                }}>Registrarme</Link>
            </div>
        </div>
    )
}
function FormLogin({ setEnlogin }) {
    const [nick, setNick] = useState('');

    function handleNickChange(event) {
        console.log(event.target.value);
        setNick(event.target.value);
    }
    function datosValidos() {
        return new Promise((resolve, reject) => {
            const datos = {
                nick: document.getElementById("inputNick").value,
                contrasena: document.getElementById("inputPwd").value
            };
            const configuracion = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            };
            fetch("http://localhost:8081/loginValido", configuracion)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    if (data.length > 0) {
                        window.localStorage.setItem("nick", document.getElementById("inputNick").value)
                        resolve(true);
                    }
                    else resolve(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    }
    useEffect(() => {
        if (window.localStorage.getItem("nick")) {
            setNick(window.localStorage.getItem("nick"))
        }
    }, [])
    return (
        <div className="contenedorForm">
            <form className="contenedorInputs">
                <input
                    placeholder="Nick"
                    type="text"
                    id="inputNick"
                    value={nick}
                    onChange={handleNickChange}
                />                
                <input placeholder="Contraseña" type="password" id="inputPwd" />
            </form>
            <div className="opcionesForm">
                <p className="mensajeOpcion">¿No tienes cuenta? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => { setEnlogin(false) }}>Registrate</span></p>
                <Link to={"/principal"} className="botonEnvio" onClick={(e) => { if (!datosValidos()) e.preventDefault() }}>Iniciar sesión</Link>
            </div>
        </div>
    )
}

