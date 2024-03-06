/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import "../assets/Practica.css"
import useStore from "../stateManager";
function Practica() {
    useEffect(()=>{
        document.getElementById("cubo").style.left = "50%"
        document.getElementById("cubo").style.top = "120%"
        window.setEnPractica(true)
        setTimeout(() => {
            document.getElementById("cubo").style.display = "none"
        }, 500);
        return(()=>{
            window.setEnPractica(false)
            casoBase = {
                Ulb: 'white',
                Ub: 'white',
                Urb: 'white',
                Ul: 'white',
                U: 'white',
                Ur: 'white',
                Ulf: 'white',
                Uf: 'white',
                Urf: 'white',
                Bl: 'blue',
                B: 'blue',
                Br: 'blue',
                Lb: 'orange',
                L: 'orange',
                Lf: 'orange',
                Rb: 'red',
                R: 'red',
                Rf: 'red',
                Fl: 'green',
                F: 'green',
                Fr: 'green'
            }
        })
    },[])
    const [casosActuales, setCasosActuales] = useState([])
    //useEffect(()=>{console.log(casosActuales)},[casosActuales])
    return (
        <div id="pantalla-practica" className={""/*"enResolucion"*/}>
            <ContenedorAlgsets casosActuales={casosActuales} setCasosActuales={setCasosActuales}/>
            <ContenedorCuboYTiempos casosActuales={casosActuales} setCasosActuales={setCasosActuales}/>
        </div>
    )
}
function ContenedorAlgsets({casosActuales, setCasosActuales}){
    const [algsetSeleccionado,setAlgsetSeleccionado] = useState("CMLL")
    const [algset,setAlgset] = useState([])
    const [todosPulsados,setTodosPulsados] = useState(false)
    useEffect(()=>{
        fetch("http://localhost:8081/algset?alg_set="+algsetSeleccionado)
        .then(res => res.json())
        .then(data => {setAlgset(data)})
        setCasosActuales([])
        document.getElementById("marcarTodas").checked = false
        casoBase = {
            Ulb: 'white',
            Ub: 'white',
            Urb: 'white',
            Ul: 'white',
            U: 'white',
            Ur: 'white',
            Ulf: 'white',
            Uf: 'white',
            Urf: 'white',
            Bl: 'blue',
            B: 'blue',
            Br: 'blue',
            Lb: 'orange',
            L: 'orange',
            Lf: 'orange',
            Rb: 'red',
            R: 'red',
            Rf: 'red',
            Fl: 'green',
            F: 'green',
            Fr: 'green'
        }
    },[algsetSeleccionado])
    useEffect(()=>{
        if(todosPulsados) setCasosActuales(algset)
        else setCasosActuales([])
    },[todosPulsados])
    return (
        <div id="contenedor-opciones-algset">
            <div id="tipos-algset">
                <div className={"tipo-algset" + (algsetSeleccionado === "CMLL" ? " activo" : "")} onClick={() => { setAlgsetSeleccionado("CMLL") }}>CMLL</div>
                <div className={"tipo-algset" + (algsetSeleccionado === "PLL" ? " activo" : "")} onClick={()=>{setAlgsetSeleccionado("PLL")}}>PLL</div>
                <div className={"tipo-algset" + (algsetSeleccionado === "OLL" ? " activo" : "")} onClick={()=>{setAlgsetSeleccionado("OLL")}}>OLL</div>
            </div>
            <div id="contenedor-casos">
            <div id="contenedor-marcar-todos">
                <div className="input-wrapper">
                        <input type="checkbox" id="marcarTodas" onInput={()=>{setTodosPulsados(!todosPulsados)}}/>
                    </div>
                    <label htmlFor="marcarTodas">marcar todos</label>
                </div>
                {algset.map((caso,index) => {
                    return <Cubo2DCaso caso={caso} key={index} todosPulsados={todosPulsados} casosActuales={casosActuales} setCasosActuales={setCasosActuales}/>
                })}
            </div>
        </div>
    )
}

function ContenedorCuboYTiempos({casosActuales}) {
    const {resolviendoAlg, setResolviendoAlg,inicioTiempoAlg, tiemposAlg,setinicioTiempoAlg, setTiemposAlg} = useStore()
    const [cuboBas, setCuboBas] = useState(casoBase)
    function movimientoPractica(move) {
        window.moveAN(move)
        if(!resolviendoAlg){
            setResolviendoAlg(true)
            setinicioTiempoAlg(new Date())
            document.getElementById("pantalla-practica").classList.add("enResolucion")
        }
        if(window.isSolved()){
            console.log("tooma")
            setResolviendoAlg(false)
            document.getElementById("pantalla-practica").classList.remove("enResolucion")
            // mostrar tiempo
            let tiempoAct = (Math.abs(new Date().getTime() - inicioTiempoAlg.getTime())/1000)
            document.getElementById("tiempo-actual").innerHTML = `Tiempo : ${tiempoAct}s`
            // recalcular media
            let arrTiempos = [...tiemposAlg, tiempoAct]
            setTiemposAlg(arrTiempos)
            let sumaTiempos = 0
            for (let i = 0; i < arrTiempos.length; i++) {
                sumaTiempos += arrTiempos[i]
            }
            document.getElementById("media-sesion").innerHTML = `Media : ${sumaTiempos/arrTiempos.length}`
        }
    }
    window.movimientoPractica = movimientoPractica
    useEffect(()=>{
        if(cuboBas.movimientos){
            window.resetCube()
        // rehacer scramble
        let movimientos = JSON.parse(cuboBas.movimientos).reverse()
        window.moveArr(movimientos)
        // tiempo a 0
        setResolviendoAlg(false)
        document.getElementById("pantalla-practica").classList.remove("enResolucion")
        }
        function handleKeyDown(e){
            if (e.code === "Space") {
                //  resetear cubo
                window.resetCube()
                // rehacer scramble
                let movimientos = JSON.parse(cuboBas.movimientos).reverse()
                window.moveArr(movimientos)
                // tiempo a 0
                setResolviendoAlg(false)
                document.getElementById("pantalla-practica").classList.remove("enResolucion")
            }
            if(e.code === "Enter"){
                // resolver cubo
                window.resetCube()
                // tiempo a 0
                setResolviendoAlg(false)
                // nuevo alg random
                let nuevoAlg = casosActuales[Math.floor(Math.random() * casosActuales.length)]
                setCuboBas(nuevoAlg)
                // rehacer scramble
                let movimientos = JSON.parse(nuevoAlg.movimientos).reverse()
                window.moveArr(movimientos)
                
            }
        }
        document.addEventListener("keydown",handleKeyDown)
        return(()=>{
            document.removeEventListener("keydown",handleKeyDown)
        })
    },[cuboBas,casosActuales])
    useEffect(()=>{
        if(casosActuales.length > 0) setCuboBas(casosActuales[Math.floor(Math.random() * casosActuales.length)])
    },[casosActuales])

    return(
        <div id="cubo-y-tiempos">
            <div id="caso-actual"><Cubo2D caso={cuboBas}/></div>
            <div id="tiempo-actual">Tiempo : 2.75s</div>
            <div id="media-sesion">Media : 3.21s</div>
        </div>
    )
}
let casoBase = {
    Ulb: 'white',
    Ub: 'white',
    Urb: 'white',
    Ul: 'white',
    U: 'white',
    Ur: 'white',
    Ulf: 'white',
    Uf: 'white',
    Urf: 'white',
    Bl: 'blue',
    B: 'blue',
    Br: 'blue',
    Lb: 'orange',
    L: 'orange',
    Lf: 'orange',
    Rb: 'red',
    R: 'red',
    Rf: 'red',
    Fl: 'green',
    F: 'green',
    Fr: 'green'
}

function Cubo2D({caso}) {
    useEffect(()=>{
        
        if (caso) {
            //let movimientos = JSON.parse(caso.movimientos)
            //console.log(movimientos)
        }
    },[caso])
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{width : "100%",height : "100%"}} viewBox="-0.9 -0.9 1.8 1.8" id="caso-principal">
            <rect fill="transparent" x="-0.9" y="-0.9" width="1.8" height="1.8"></rect>
            <g style={{ strokeWidth: 0.1, strokeLinejoin: "round", opacity: 1 }}>
                <polygon fill="#000000" stroke="#000000" points="-0.522222222222,-0.522222222222 0.522222222222,-0.522222222222 0.522222222222,0.522222222222 -0.522222222222,0.522222222222"></polygon>
            </g>
            <g style={{ opacity: 1, strokeOpacity: 0.5, strokeWidth: 0, strokeLinejoin: "round" }}>
                    <polygon id="Ubl" fill={caso.Ulb} stroke="#000000" points="-0.527777777778,-0.527777777778 -0.212962962963,-0.527777777778 -0.212962962963,-0.212962962963 -0.527777777778,-0.212962962963"></polygon>
                    <polygon id="Ub" fill={caso.Ub} stroke="#000000" points="-0.157407407407,-0.527777777778 0.157407407407,-0.527777777778 0.157407407407,-0.212962962963 -0.157407407407,-0.212962962963"></polygon>
                    <polygon id="Urb" fill={caso.Urb} stroke="#000000" points="0.212962962963,-0.527777777778 0.527777777778,-0.527777777778 0.527777777778,-0.212962962963 0.212962962963,-0.212962962963"></polygon>
                    <polygon id="Ul" fill={caso.Ul} stroke="#000000" points="-0.527777777778,-0.157407407407 -0.212962962963,-0.157407407407 -0.212962962963,0.157407407407 -0.527777777778,0.157407407407"></polygon>
                    <polygon id="U" fill={caso.U} stroke="#000000" points="-0.157407407407,-0.157407407407 0.157407407407,-0.157407407407 0.157407407407,0.157407407407 -0.157407407407,0.157407407407"></polygon>
                    <polygon id="Ur" fill={caso.Ur} stroke="#000000" points="0.212962962963,-0.157407407407 0.527777777778,-0.157407407407 0.527777777778,0.157407407407 0.212962962963,0.157407407407"></polygon>
                    <polygon id="Ulf" fill={caso.Ulf} stroke="#000000" points="-0.527777777778,0.212962962963 -0.212962962963,0.212962962963 -0.212962962963,0.527777777778 -0.527777777778,0.527777777778"></polygon>
                    <polygon id="Uf" fill={caso.Uf} stroke="#000000" points="-0.157407407407,0.212962962963 0.157407407407,0.212962962963 0.157407407407,0.527777777778 -0.157407407407,0.527777777778"></polygon>
                    <polygon id="Ufr" fill={caso.Urf} stroke="#000000" points="0.212962962963,0.212962962963 0.527777777778,0.212962962963 0.527777777778,0.527777777778 0.212962962963,0.527777777778"></polygon></g>
                    <g style={{ opacity: 1, strokeOpacity: 1, strokeWidth: 0.02, strokeLinejoin: "round" }}>
                    <polygon id="uBl" fill={caso.Bl} stroke="#000000" points="-0.195146871009,-0.554406130268 -0.543295019157,-0.554406130268 -0.507279693487,-0.718390804598 -0.183141762452,-0.718390804598"></polygon>
                    <polygon id="uB" fill={caso.B} stroke="#000000" points="0.174457215837,-0.554406130268 -0.173690932312,-0.554406130268 -0.161685823755,-0.718390804598 0.16245210728,-0.718390804598"></polygon>
                    <polygon id="urB" fill={caso.Br} stroke="#000000" points="0.544061302682,-0.554406130268 0.195913154534,-0.554406130268 0.183908045977,-0.718390804598 0.508045977011,-0.718390804598"></polygon>
                    <polygon id="ubL" fill={caso.Lb} stroke="#000000" points="-0.554406130268, -0.544061302682 -0.554406130268, -0.195913154534 -0.718390804598,-0.183908045977 -0.718390804598,-0.508045977011"></polygon>
                    <polygon id="ul" fill={caso.L} stroke="#000000" points="-0.554406130268, -0.174457215837 -0.554406130268,0.173690932312 -0.718390804598,0.161685823755 -0.718390804598,-0.16245210728"></polygon>
                    <polygon id="ulf" fill={caso.Lf} stroke="#000000" points="-0.554406130268,0.195146871009 -0.554406130268,0.543295019157 -0.718390804598,0.507279693487 -0.718390804598,0.183141762452"></polygon>
                    <polygon id="uRb" fill={caso.Rb} stroke="#000000" points="0.554406130268, -0.195146871009 0.554406130268, -0.543295019157 0.718390804598,-0.507279693487 0.718390804598,-0.183141762452"></polygon>
                    <polygon id="uR" fill={caso.R} stroke="#000000" points="0.554406130268,0.174457215837 0.554406130268, -0.173690932312 0.718390804598,-0.161685823755 0.718390804598,0.16245210728"></polygon>
                    <polygon id="ufR" fill={caso.Rf} stroke="#000000" points="0.554406130268,0.544061302682 0.554406130268,0.195913154534 0.718390804598,0.183908045977 0.718390804598,0.508045977011"></polygon>
                    <polygon id="ulF" fill={caso.Fl} stroke="#000000" points="-0.544061302682,0.554406130268 -0.195913154534,0.554406130268 -0.183908045977,0.718390804598 -0.508045977011,0.718390804598"></polygon>
                    <polygon id="uF" fill={caso.F} stroke="#000000" points="-0.174457215837,0.554406130268 0.173690932312,0.554406130268 0.161685823755,0.718390804598 -0.16245210728,0.718390804598"></polygon>
                    <polygon id="uFr" fill={caso.Fr} stroke="#000000" points="0.195146871009,0.554406130268 0.543295019157,0.554406130268 0.507279693487,0.718390804598 0.183141762452,0.718390804598"></polygon>
                </g>
            </svg>
    )
}
function Cubo2DCaso({caso, todosPulsados, setCasosActuales, casosActuales}) {
    const [pulsado, setPulsado] = useState(false)
    useEffect(()=>{
        setPulsado(false)
    },[caso])
    useEffect(() => {
        setPulsado(todosPulsados);
    }, [todosPulsados]);

    useEffect(() => {
        if (pulsado) {
            setCasosActuales([...casosActuales, caso]); 
        } else {
            setCasosActuales(casosActuales.filter(casoActual => casoActual.id_alg !== caso.id_alg));
        }
    }, [pulsado]);

    return (
        <div className={"caso " + (pulsado ? "activo" : "")} onClick={()=>{setPulsado(!pulsado);}}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{width : "100%",height : "100%"}} viewBox="-0.9 -0.9 1.8 1.8">
                <rect fill="transparent" x="-0.9" y="-0.9" width="1.8" height="1.8"></rect>
                <g style={{ strokeWidth: 0.1, strokeLinejoin: "round", opacity: 1 }}>
                    <polygon fill="#000000" stroke="#000000" points="-0.522222222222,-0.522222222222 0.522222222222,-0.522222222222 0.522222222222,0.522222222222 -0.522222222222,0.522222222222"></polygon>
                </g>
                <g style={{ opacity: 1, strokeOpacity: 0.5, strokeWidth: 0, strokeLinejoin: "round" }}>
                    <polygon id="Ubl" fill={caso.Ulb} stroke="#000000" points="-0.527777777778,-0.527777777778 -0.212962962963,-0.527777777778 -0.212962962963,-0.212962962963 -0.527777777778,-0.212962962963"></polygon>
                    <polygon id="Ub" fill={caso.Ub} stroke="#000000" points="-0.157407407407,-0.527777777778 0.157407407407,-0.527777777778 0.157407407407,-0.212962962963 -0.157407407407,-0.212962962963"></polygon>
                    <polygon id="Urb" fill={caso.Urb} stroke="#000000" points="0.212962962963,-0.527777777778 0.527777777778,-0.527777777778 0.527777777778,-0.212962962963 0.212962962963,-0.212962962963"></polygon>
                    <polygon id="Ul" fill={caso.Ul} stroke="#000000" points="-0.527777777778,-0.157407407407 -0.212962962963,-0.157407407407 -0.212962962963,0.157407407407 -0.527777777778,0.157407407407"></polygon>
                    <polygon id="U" fill={caso.U} stroke="#000000" points="-0.157407407407,-0.157407407407 0.157407407407,-0.157407407407 0.157407407407,0.157407407407 -0.157407407407,0.157407407407"></polygon>
                    <polygon id="Ur" fill={caso.Ur} stroke="#000000" points="0.212962962963,-0.157407407407 0.527777777778,-0.157407407407 0.527777777778,0.157407407407 0.212962962963,0.157407407407"></polygon>
                    <polygon id="Ulf" fill={caso.Ulf} stroke="#000000" points="-0.527777777778,0.212962962963 -0.212962962963,0.212962962963 -0.212962962963,0.527777777778 -0.527777777778,0.527777777778"></polygon>
                    <polygon id="Uf" fill={caso.Uf} stroke="#000000" points="-0.157407407407,0.212962962963 0.157407407407,0.212962962963 0.157407407407,0.527777777778 -0.157407407407,0.527777777778"></polygon>
                    <polygon id="Ufr" fill={caso.Urf} stroke="#000000" points="0.212962962963,0.212962962963 0.527777777778,0.212962962963 0.527777777778,0.527777777778 0.212962962963,0.527777777778"></polygon></g>
                    <g style={{ opacity: 1, strokeOpacity: 1, strokeWidth: 0.02, strokeLinejoin: "round" }}>
                    <polygon id="uBl" fill={caso.Bl} stroke="#000000" points="-0.195146871009,-0.554406130268 -0.543295019157,-0.554406130268 -0.507279693487,-0.718390804598 -0.183141762452,-0.718390804598"></polygon>
                    <polygon id="uB" fill={caso.B} stroke="#000000" points="0.174457215837,-0.554406130268 -0.173690932312,-0.554406130268 -0.161685823755,-0.718390804598 0.16245210728,-0.718390804598"></polygon>
                    <polygon id="urB" fill={caso.Br} stroke="#000000" points="0.544061302682,-0.554406130268 0.195913154534,-0.554406130268 0.183908045977,-0.718390804598 0.508045977011,-0.718390804598"></polygon>
                    <polygon id="ubL" fill={caso.Lb} stroke="#000000" points="-0.554406130268, -0.544061302682 -0.554406130268, -0.195913154534 -0.718390804598,-0.183908045977 -0.718390804598,-0.508045977011"></polygon>
                    <polygon id="ul" fill={caso.L} stroke="#000000" points="-0.554406130268, -0.174457215837 -0.554406130268,0.173690932312 -0.718390804598,0.161685823755 -0.718390804598,-0.16245210728"></polygon>
                    <polygon id="ulf" fill={caso.Lf} stroke="#000000" points="-0.554406130268,0.195146871009 -0.554406130268,0.543295019157 -0.718390804598,0.507279693487 -0.718390804598,0.183141762452"></polygon>
                    <polygon id="uRb" fill={caso.Rb} stroke="#000000" points="0.554406130268, -0.195146871009 0.554406130268, -0.543295019157 0.718390804598,-0.507279693487 0.718390804598,-0.183141762452"></polygon>
                    <polygon id="uR" fill={caso.R} stroke="#000000" points="0.554406130268,0.174457215837 0.554406130268, -0.173690932312 0.718390804598,-0.161685823755 0.718390804598,0.16245210728"></polygon>
                    <polygon id="ufR" fill={caso.Rf} stroke="#000000" points="0.554406130268,0.544061302682 0.554406130268,0.195913154534 0.718390804598,0.183908045977 0.718390804598,0.508045977011"></polygon>
                    <polygon id="ulF" fill={caso.Fl} stroke="#000000" points="-0.544061302682,0.554406130268 -0.195913154534,0.554406130268 -0.183908045977,0.718390804598 -0.508045977011,0.718390804598"></polygon>
                    <polygon id="uF" fill={caso.F} stroke="#000000" points="-0.174457215837,0.554406130268 0.173690932312,0.554406130268 0.161685823755,0.718390804598 -0.16245210728,0.718390804598"></polygon>
                    <polygon id="uFr" fill={caso.Fr} stroke="#000000" points="0.195146871009,0.554406130268 0.543295019157,0.554406130268 0.507279693487,0.718390804598 0.183141762452,0.718390804598"></polygon>
                </g>
            </svg>
        </div>
    )
}

export default Practica