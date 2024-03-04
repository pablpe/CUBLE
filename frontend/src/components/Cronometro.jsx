/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react"
import "../assets/Cronometro.css"
import * as d3 from "d3";
import axios from 'axios';
import useStore from "../stateManager";

function Cronometro() {
    const [solveSeleccionado,setSolveSeleccionado] = useState(null)
    const [tiempos, setTiempos] = useState([]);
    useEffect(()=>{
        document.getElementById("cubo").style.left = "65%"
        document.getElementById("cubo").style.top = "50%"
        window.setEncronometro(true)
        return ()=>{
            window.setEncronometro(false)
        }
    },[])
    



    const [scramble, setScramble] = useState([])
    const [wrongMoves, setWrongMoves] = useState([])
    const [solutionMoves,setSolutionMoves] = useState([])

    const [inScrambleTime, setInScrambleTime] = useState(true);
    const [indexScramble, setIndexScramble] = useState(0)
    const [timeStarted, setTimeStarted] = useState(false)
    const[scrambleFin, setScrambleFin] = useState(false)
    let [timeStart,setTimeStart] = useState(null)

    let movements = ["U","D","F","B","L","R"]
    let moveSpec = ["","'"]
    function genScramble() {
        let scr = [];
        let lastMove = "";
        let consecutiveMoves = 0;
    
        for (let i = 0; i < 20; i++) {
            let move = movements[Math.floor(Math.random() * movements.length)];
            let spec = moveSpec[Math.floor(Math.random() * moveSpec.length)];
            let currentMove = move + spec;
    
            // Verificar si el movimiento es opuesto al anterior
            if (
                (lastMove === "U" && move === "U") ||
                (lastMove === "D" && move === "D") ||
                (lastMove === "F" && move === "F") ||
                (lastMove === "B" && move === "B") ||
                (lastMove === "L" && move === "L") ||
                (lastMove === "R" && move === "R")
            ) {
                // Cambiar el movimiento actual
                move = movements[Math.floor(Math.random() * movements.length)];
                spec = moveSpec[Math.floor(Math.random() * moveSpec.length)];
                currentMove = move + spec;
            }
    
            // Verificar si hay más de 3 movimientos consecutivos en la misma dirección
            if (currentMove === lastMove) {
                consecutiveMoves++;
            } else {
                consecutiveMoves = 0;
            }
    
            if (consecutiveMoves >= 3) {
                // Cambiar el movimiento actual si hay más de 3 movimientos consecutivos en la misma dirección
                move = movements[Math.floor(Math.random() * movements.length)];
                spec = moveSpec[Math.floor(Math.random() * moveSpec.length)];
                currentMove = move + spec;
                consecutiveMoves = 0;
            }
    
            scr.push(currentMove);
            lastMove = move;
        }
        return scr;
    }
    
    function getReverseMove(move) {
        if (move.includes("'")) {
            return move[0]
        }else{
            return `${move}'`
        }
    }
    async function gestionMovimientosCronometro(move) {
        if(inScrambleTime){
            if (wrongMoves.length == 0) {
                if (scramble.length == indexScramble + 1) { //ya está todo el scramble hecho
                    if(move === scramble[indexScramble]){
                        setSolutionMoves([])
                        setInScrambleTime(false)
                        setScrambleFin(true)
                    }else{
                        setWrongMoves([...wrongMoves, move])
                        //falta display wrong moves aqui
                    }
                }else{
                    if(move === scramble[indexScramble]){
                        setIndexScramble(indexScramble + 1)
                        //falta display scramble aqui
                    }else{
                        setWrongMoves([...wrongMoves, move])
                        //falta display wrong moves aqui
                    }
                }
            }else{
                if(move === getReverseMove(wrongMoves[wrongMoves.length-1])){
                    const arrMenosUltimo = wrongMoves.slice(0,-1)
                    setWrongMoves(arrMenosUltimo)
                }else setWrongMoves([...wrongMoves,move])
                // faltaria display sramble o wrongmoves
            }
        }else{
            if (!timeStarted) {
                setTimeStart(new Date())
                setTimeStarted(true)
            }
            setSolutionMoves([...solutionMoves,move])
            if(window.isSolved()) await showTime()
        }
    }
    window.gestionMovimientosCronometro = gestionMovimientosCronometro
    async function showTime() {
        if (inScrambleTime == false) {
            await loadYUnloadTiempo(new Date())
            //console.log(solutionMoves);
            //resetear todo para que sea un nuevo scramble
            setScramble(genScramble())
            setInScrambleTime(true)
            setTimeStarted(false)
            setIndexScramble(0)
            setScrambleFin(false)
            //aqui faltaria un displayScramble
        }
    }
    const {setArrNumMovimientos, setArrTps} = useStore()
    async function loadYUnloadTiempo(timeAct) { // id_usuario,tiempo,scramble,solucion,n_movimientos,tps
        let id = window.sessionStorage.getItem("id_usuario");
        let datosSolve = {
            id_usuario : id,
            tiempo : (Math.abs(timeAct.getTime() - timeStart.getTime())/1000),
            scramble : JSON.stringify(scramble),
            solucion : JSON.stringify(solutionMoves),
            n_movimientos : solutionMoves.length,
            tps : solutionMoves.length / (Math.abs(timeAct.getTime() - timeStart.getTime())/1000)
        }
        axios.post("http://localhost:8081/anadirSolve",datosSolve)
        .then(res =>{
            axios.get("http://localhost:8081/getUltimoSolve?id="+id)
            .then(data => {
                //console.log(data.data[0])
                setTiempos([data.data[0],...tiempos])
            })
        })
        setArrNumMovimientos(solutionMoves.length)
        setArrTps(solutionMoves.length / (Math.abs(timeAct.getTime() - timeStart.getTime())/1000))
    }
    useEffect(() => {
        setScramble(genScramble());
    }, []);
    const {method, setMethod} = useStore()
    return (
        <div id="pantalla-cronometro">
            <div id="seccion-izquierda">
                <Logo/>
                <HeaderTiempos/>
                <Tiempos setSolveSeleccionado={setSolveSeleccionado} tiempos={tiempos} setTiempos={setTiempos}/>
            </div>
            <div id="seccion-derecha">
                <DisplayScramble scramble={scramble} wrongMoves={wrongMoves} indexScramble={indexScramble} timeStarted={timeStarted} scrambleFin={scrambleFin}/>
                <DatosSesion/>
                <div id="contenedor-switch">
                    <span className={"metodo " + (method === "roux" ? "seleccionado" : "")}>Roux</span>
                    <label className="switch">
                        <input type="checkbox" onInput={(e)=>{if(e.target.checked)setMethod("cfop"); else setMethod("roux");}}/>
                        <span className="slider round"></span>
                    </label>
                    <span className={"metodo " + (method === "cfop" ? "seleccionado" : "")}>CFOP</span>
                </div>
            </div>
            {solveSeleccionado && <PopUpTiempo solveSeleccionado={solveSeleccionado} setSolveSeleccionado={setSolveSeleccionado}/>}
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
function Tiempos({ setSolveSeleccionado, tiempos, setTiempos }) {
    
    let id = window.sessionStorage.getItem("id_usuario");

    useEffect(() => {
        fetch("http://localhost:8081/solves?id=" + id + "&actual=0")
            .then(res => res.json())
            .then(data => {
                setTiempos([...data.reverse()]);
            });
    }, []);

    return (
        <div id="tiempos">
            {tiempos.map((tmp, index) => (
                <Tiempo key={index} index={index} setSolveSeleccionado={setSolveSeleccionado} tiempo={tmp.tiempo} id_solve={tmp.id_solve} tiempos={tiempos}/>
            ))}
        </div>
    );
}

function Tiempo({setSolveSeleccionado,tiempo,id_solve,index,tiempos}) {
    const [media, setMedia] = useState(0);
    useEffect(() => {
        let id = window.sessionStorage.getItem("id_usuario");
        if (index + 4 < tiempos.length) {
            let sumatoria = 0;
            for (let i = 0; i < 5; i++) {
                sumatoria += tiempos[index + i].tiempo;
            }
            const nuevaMedia = sumatoria / 5;
            setMedia(nuevaMedia);
            axios.get("http://localhost:8081/getMejorMediaId?id="+id)
            .then(mejorMedia => {
                let mejMedia = mejorMedia.data[0].mejor_media
                if (nuevaMedia < mejMedia || mejMedia == 0) {
                    axios.post("http://localhost:8081/usarioModMedia",{id : id, media : nuevaMedia})
                }
            })
        }
    }, []);

    return(
        <div className="tiempo" onClick={()=>{setSolveSeleccionado(id_solve)}}>
            <i className="fa-solid fa-circle-info eliminar-tiempo" style={{color : "rgba(255,255,255,0.2)",scale : "1.7"}}></i>
            <span className="valor-tiempo">{tiempo ? tiempo : 'No disponible'}</span>
            <span className="valor-media">{media == 0 ? "" : media.toFixed(2) + "s"}</span>
        </div>
    )
}
function DisplayScramble({scramble,wrongMoves,indexScramble,timeStarted,scrambleFin}) {
    
    return(
        <div id="displayScramble">
            {/* U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2 */}
            {!scrambleFin && !timeStarted &&  wrongMoves.length == 0 ? 
                scramble.map((letra,index) =>{
                    return <span key={index} className={"letraScramble " + (indexScramble > index ? "resuelta" : "")}>{letra}</span>
                })
            :
                wrongMoves.map((letra,index) =>{
                    return <span key={index} className="letraScramble">{letra}</span>
                })
            }
            {scrambleFin && !timeStarted && "Listo"}
            {timeStarted && "Resolviendo . . ."}
        </div>
    )
}
function DatosSesion() {
    const {arrNumMovimientos, arrTps} = useStore()
    const [mediaMovimientos, setMediaMovimientos] = useState(0)
    const [mediaTps, setMediaTps] = useState(0)
    useEffect(()=>{
        let sumMov = 0
        for (let i = 0; i < arrNumMovimientos.length; i++) {
            sumMov += arrNumMovimientos[i]
        }
        setMediaMovimientos(sumMov/arrNumMovimientos.length)
        let sumTps = 0
        for (let i = 0; i < arrTps.length; i++) {
            sumTps += arrTps[i]
        }
        setMediaTps(sumTps/arrTps.length)
    },[arrTps])
    return(
        <div id="contenedor-datos-sesion">
            <h1 id="titulo-datos-sesion">Datos de la sesión</h1>
            <div id="datos-sesion">
                <span>media de movimientos : {mediaMovimientos || ""}</span>
                <span>media TPS : {mediaTps ? mediaTps.toFixed(2) : ""}</span>
            </div>
        </div>
    )
}
function PopUpTiempo({solveSeleccionado,setSolveSeleccionado}) {
    const [datosSolve, setDatosSolve] = useState({})
    useEffect(()=>{
        fetch("http://localhost:8081/getSolve?id_solve="+solveSeleccionado)
        .then(res => res.json())
        .then(data => {
            data.scramble = JSON.parse(data.scramble)
            data.solucion = JSON.parse(data.solucion)
            setDatosSolve(data)
        })
    },[])
    return (
        <div id="fondo-popup-tiempo" onClick={()=>{setSolveSeleccionado(null)}}>
            <TiempoYDatos datosSolve={datosSolve}/>
            <ContenedorGrafico datosSolve={datosSolve}/>
            <ContenedorMovimientosYScramble datosSolve={datosSolve}/>
        </div>
    )
}
function TiempoYDatos({datosSolve}) {
    return(
        <div id="tiempo-y-datos" onClick={(e)=>{e.stopPropagation()}}>
            <div className="dato">
                <p className="nombre-dato">Tiempo</p>
                <p className="valor-dato">{datosSolve?.tiempo}</p>
            </div>
            <div className="dato">
                <p className="nombre-dato">Nºmovimientos</p>
                <p className="valor-dato">{datosSolve?.n_movimientos}</p>
            </div>
            <div className="dato">
                <p className="nombre-dato">TPS</p>
                <p className="valor-dato">{datosSolve?.tps}</p>
            </div>
        </div>
    )
}

function ContenedorMovimientosYScramble({datosSolve}) {
    const [strScramble,setStrScramble] = useState("")
    const [strSolucion, setStrSolucion] = useState("")
    useEffect(() => {
        if (datosSolve.solucion) {
            let newStrScramble = '';
            for (let i = 0; i < datosSolve.scramble.length; i++) {
                newStrScramble += datosSolve.scramble[i];
            }
            setStrScramble(newStrScramble);
        
            let newStrSolucion = '';
            for (let i = 0; i < datosSolve.solucion.length; i++) {
                newStrSolucion += datosSolve.solucion[i];
            }
            setStrSolucion(newStrSolucion);
        }
    }, [datosSolve]);
    
    return(
        <div id="contenedor-movimientos-scramble" onClick={(e)=>{e.stopPropagation()}}>
            <div className="dato">
                <p className="nombre-dato">Scramble</p>
                <p className="valor-dato">{strScramble}</p>
            </div>
            <div className="dato">
                <p className="nombre-dato">Movimientos</p>
                <p className="valor-dato">{strSolucion}</p>
            </div>
        </div>
    )
}

function ContenedorGrafico({datosSolve}) {
    const { method } = useStore(); // Usa useStore dentro del useEffect
    useEffect(() => {

        //console.log(method);
        if(!Array.isArray(datosSolve.solucion) || !Array.isArray(datosSolve.scramble)) return
        const data = [
            { name: (method === "roux" ? "FB" : "CROSS"), score: 12 },
            { name: (method === "roux" ? "SB" : "F2L"), score: 80 },
            { name: (method === "roux" ? "CMLL" : "OLL"), score: 14 },
            { name: (method === "roux" ? "LSE" : "PLL"), score: 18 }
        ];
        //console.log(datosSolve.scramble,datosSolve.solucion); window.analyzeROUX(datosSolve.scramble,datosSolve.solucion)
        const infoSolve = (method === "roux" ? window.analyzeROUX(datosSolve.scramble,datosSolve.solucion) : window.analyzeCFOP(datosSolve.scramble,datosSolve.solucion))
        //console.log(infoSolve);
        data[0].score = (method === "roux" ? infoSolve.fb : infoSolve.cross)
        data[1].score = (method === "roux" ? infoSolve.sb : infoSolve.f2l)
        data[2].score = (method === "roux" ? infoSolve.cmll : infoSolve.oll)
        data[3].score = (method === "roux" ? infoSolve.lse : infoSolve.pll)
        const width = 900;
        const height = 450;
        const margin = { top: 50, bottom: 50, left: 50, right: 50 };

        const svg = d3.select('#contenedor-grafico')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr("viewBox", [0, 0, width, height]);

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.score)])
            .range([height - margin.bottom, margin.top])

        svg
            .append("g")
            .attr("fill", 'royalblue')
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", height - margin.bottom) // Start the bars from the bottom
            .attr('title', (d) => d.score)
            .attr("class", "rect")
            .attr("height", 0) // Set initial height to 0
            .attr("width", x.bandwidth())
            .transition() // Apply transition to the bars
            .duration(1000) // Set duration of the transition
            .delay((d, i) => i * 100) // Delay each bar based on its position
            .attr("y", d => y(d.score))
            .attr("height", d => height - margin.bottom - y(d.score)); // Animate the height of the bars

        function yAxis(g) {
            g.attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).ticks(null, data.format))
                .attr("font-size", '20px')
        }

        function xAxis(g) {
            g.attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat(i => data[i].name))
                .attr("font-size", '20px')
        }

        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);
    }, [datosSolve])
    return (
        <div id="contenedor-grafico" onClick={(e) => { e.stopPropagation() }}>
            {/* No necesitas un div adicional para el gráfico */}
        </div>
    )
}


export default Cronometro