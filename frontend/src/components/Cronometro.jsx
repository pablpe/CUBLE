/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react"
import "../assets/Cronometro.css"
import * as d3 from "d3";
import axios from 'axios';

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
    let [timeStart,setTimeStart] = useState(null)

    let movements = ["U","D","F","B","L","R"]
    let moveSpec = ["","'"]
    function genScramble() { //version provisional, no tiene que devolver valores opuestos
        let scr = []
        for (let i = 0; i < 10; i++) {
            scr.push(movements[Math.floor(Math.random() * movements.length)] + moveSpec[Math.floor(Math.random()*moveSpec.length)])
        }
        return scr
    }
    function getReverseMove(move) {
        if (move.includes("'")) {
            return move[0]
        }else{
            return `${move}'`
        }
    }
    function gestionMovimientosCronometro(move) {
        if(inScrambleTime){
            if (wrongMoves.length == 0) {
                if (scramble.length == indexScramble + 1) { //ya está todo el scramble hecho
                    setSolutionMoves([])
                    setInScrambleTime(false)
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
            if(window.isSolved()) showTime()
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
            //aqui faltaria un displayScramble
        }
    }
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
                console.log(data.data[0])
                setTiempos([data.data[0],...tiempos])
            })
        })
    }
    useEffect(() => {
        setScramble(genScramble());
    }, []);
    return (
        <div id="pantalla-cronometro">
            <div id="seccion-izquierda">
                <Logo/>
                <HeaderTiempos/>
                <Tiempos setSolveSeleccionado={setSolveSeleccionado} tiempos={tiempos} setTiempos={setTiempos}/>
            </div>
            <div id="seccion-derecha">
                <DisplayScramble scramble={scramble} wrongMoves={wrongMoves} indexScramble={indexScramble} timeStarted={timeStarted}/>
                <DatosSesion/>
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
                setTiempos([...data]);
            });
    }, []);

    return (
        <div id="tiempos">
            {tiempos.reverse().map((tmp, index) => (
                <Tiempo key={index} setSolveSeleccionado={setSolveSeleccionado} tiempo={tmp.tiempo} id_solve={tmp.id_solve}/>
            ))}
        </div>
    );
}

function Tiempo({setSolveSeleccionado,tiempo,id_solve}) {
    return(
        <div className="tiempo" onClick={()=>{setSolveSeleccionado(id_solve)}}>
            <i className="fa-solid fa-circle-info eliminar-tiempo" style={{color : "rgba(255,255,255,0.2)",scale : "1.7"}}></i>
            <span className="valor-tiempo">{tiempo ? tiempo : 'No disponible'}</span>
            <span className="valor-media">17.5s</span>
        </div>
    )
}
function DisplayScramble({scramble,wrongMoves,indexScramble,timeStarted}) {
    
    return(
        <div id="displayScramble">
            {/* U2 L2 R2 U' L B2 D2 R D2 U2 R2 L U L2 F' D B' F' U2 */}
            {!timeStarted &&  wrongMoves.length == 0 ? 
                scramble.map((letra,index) =>{
                    return <span key={index} className={"letraScramble " + (indexScramble > index ? "resuelta" : "")}>{letra}</span>
                })
            :
                wrongMoves.map((letra,index) =>{
                    return <span key={index} className="letraScramble">{letra}</span>
                })
            }
            {
                timeStarted && "hola"
            }
        </div>
    )
}
function DatosSesion() {
    return(
        <div id="contenedor-datos-sesion">
            <h1 id="titulo-datos-sesion">Datos de la sesión</h1>
            <div id="datos-sesion">
                <span>media de movimientos : 58</span>
                <span>media TPS : 3.32</span>
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
    useEffect(() => {
        if(!Array.isArray(datosSolve.solucion) || !Array.isArray(datosSolve.scramble)) return
        const data = [
            { name: 'Cruz', score: 12 },
            { name: 'F2L', score: 80 },
            { name: 'OLL', score: 14 },
            { name: 'PLL', score: 18 }
        ];
        console.log(datosSolve.scramble,datosSolve.solucion);
        const infoSolve = window.analyzeROUX(datosSolve.scramble,datosSolve.solucion)
        console.log(infoSolve);
        data[0].score = infoSolve.cross
        data[1].score = infoSolve.f2l
        data[2].score = infoSolve.oll
        data[3].score = infoSolve.pll
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