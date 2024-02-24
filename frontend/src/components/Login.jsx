/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import "../assets/Login.css"
import sketch from "../assets/cubosRotando"
import p5 from "p5"
import { Link, useNavigate } from "react-router-dom"



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
    const history = useNavigate()
    async function mailUsado() {
        return new Promise((resolve,reject)=>{
            const datos = {
                email: document.getElementById("inputCorreo").value
            }
            const configuracion = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            };
            fetch("http://localhost:8081/mailValido", configuracion)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length > 0 || document.getElementById("inputCorreo").value.length == 0) resolve(true)
                    else {resolve(false)}
                })
                .catch(error => console.error('Error:', error));
        })
    }
    async function nickUsado() {
        return new Promise((resolve,reject)=>{
            const datos = {
                nick : document.getElementById("inputNick").value
            }
            const configuracion = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            };
            fetch("http://localhost:8081/nickValido", configuracion)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length > 0 || document.getElementById("inputNick").value.length == 0) resolve(true)
                    else {resolve(false)}
                })
                .catch(error => console.error('Error:', error));
        })
    }
    function inputsValidos() {
        return true
    }
    async function datosEnSessionStorage(nick) {
        let b = "http://localhost:8081/getUsuarioNick?nick="+nick
        fetch(b)
        .then(res => res.json())
        .then(data =>{
            window.sessionStorage.setItem("id_usuario",data[0].id_usuario)
            window.sessionStorage.setItem("img",data[0].imagen)
        })
        .catch(err => console.error(err))
    }
    async function nuevoUsuarioValido() {
        let nick = document.getElementById("inputNick").value
        let mailUdo = await mailUsado()
        let nickUdo = await nickUsado()
        if (!mailUdo && !nickUdo && inputsValidos()) {
            const datos = {
                nombre: document.getElementById("inputNombre").value,
                apellido1: document.getElementById("inputApellido1").value,
                apellido2: document.getElementById("inputApellido2").value,
                email: document.getElementById("inputCorreo").value,
                nick: nick,
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
                .then(async (data) => {
                    await datosEnSessionStorage(nick)
                    window.localStorage.setItem("nick", nick)
                })
                .catch(error => console.error('Error:', error));
            return true
        }
        console.log("registro de usuario no valido")
        return false
    }
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
                <Link to={"/principal"} className="botonEnvio" onClick={async(e) => {
                    e.preventDefault();
                    if(await nuevoUsuarioValido()) history("/principal")
                }}>Registrarme</Link>
            </div>
        </div>
    )
}




function FormLogin({ setEnlogin }) {
    const [nick, setNick] = useState('');
    const history = useNavigate()
    useEffect(() => {
        if (window.localStorage.getItem("nick")) {
            setNick(window.localStorage.getItem("nick"))
        }
    }, [])
    async function datosEnSessionStorage() {
        let b = "http://localhost:8081/getUsuarioNick?nick="+document.getElementById("inputNick").value
        fetch(b)
        .then(res => res.json())
        .then(data =>{
            window.sessionStorage.setItem("id_usuario",data[0].id_usuario)
            window.sessionStorage.setItem("img",data[0].imagen)
        })
        .catch(err => console.error(err))
    }
    const handleNickChange = (event) => {
        setNick(event.target.value);
    }

    const handleFormSubmit = async (e) => {
        const isValid = await datosValidos();
        if (!isValid) e.preventDefault();
        else {
            await datosEnSessionStorage()
            history("/principal")
        }
    }

    const datosValidos = () => {
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
                    return response.json();
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

    return (
        <div className="contenedorForm">
            <form className="contenedorInputs" onSubmit={handleFormSubmit}>
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
                <Link to={"/principal"} className="botonEnvio" onClick={(e)=>{e.preventDefault();handleFormSubmit(e)}}>Iniciar sesión</Link>
            </div>
        </div>
    )
}

