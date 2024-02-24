import { useEffect, useState } from "react";

function Rankings({setPopUpActivo}) {
    const [mejoresTiempos,setMejoresTiempos] = useState([])
    const [mejoresMedias,setMejoresMedias] = useState([])
    const [masVictorias,setMasVictorias] = useState([])
    useEffect(()=>{
        fetch("http://localhost:8081/mejoresTiempos")
        .then(res => res.json())
        .then(data =>{setMejoresTiempos(data)})

        fetch("http://localhost:8081/mejoresMedias")
        .then(res => res.json())
        .then(data =>{setMejoresMedias(data)})

        fetch("http://localhost:8081/masVictorias")
        .then(res => res.json())
        .then(data =>{setMasVictorias(data)})
    },[])
    return (
        <div className="fondo-popup" onClick={()=>{setPopUpActivo("");}}>
            <MejoresTiempos mejoresTiempos={mejoresTiempos}/>
            <MejoresMedias mejoresMedias={mejoresMedias}/>
            <MasVictorias masVictorias={masVictorias}/>
        </div>
    )
}
function MejoresTiempos({mejoresTiempos}) {
    return(
        <div className="contenedor-rankings" onClick={(e)=>{e.stopPropagation()}}>
                <h1 className="tituloRanking">Mejor Tiempo</h1>
                {mejoresTiempos.length > 0 && <div className="contenedor-personas-ranking">
                <div className="persona-ranking primero">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">{mejoresTiempos[0].nick}</p>
                    <h1 className="valor-ranking">{mejoresTiempos[0].tiempo}s</h1>
                </div>
                <div className="persona-ranking segundo">
                    <h1 className="puesto-ranking">#2</h1>
                    <p className="nombre-ranking">{mejoresTiempos[1].nick}</p>
                    <h1 className="valor-ranking">{mejoresTiempos[1].tiempo}s</h1>
                </div>
                <div className="persona-ranking tercero">
                    <h1 className="puesto-ranking">#3</h1>
                    <p className="nombre-ranking">{mejoresTiempos[2].nick}</p>
                    <h1 className="valor-ranking">{mejoresTiempos[2].tiempo}s</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#4</h1>
                    <p className="nombre-ranking">{mejoresTiempos[3].nick}</p>
                    <h1 className="valor-ranking">{mejoresTiempos[3].tiempo}s</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#5</h1>
                    <p className="nombre-ranking">{mejoresTiempos[4].nick}</p>
                    <h1 className="valor-ranking">{mejoresTiempos[4].tiempo}s</h1>
                </div>
                </div>}
            </div>
    )
}
function MejoresMedias({mejoresMedias}) {
    return(
        <div className="contenedor-rankings" onClick={(e)=>{e.stopPropagation()}}>
                <h1 className="tituloRanking">Mejor Media</h1>
                {mejoresMedias.length > 0 && <div className="contenedor-personas-ranking">
                <div className="persona-ranking primero">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">{mejoresMedias[0].nick}</p>
                    <h1 className="valor-ranking">{mejoresMedias[0].mejor_media}s</h1>
                </div>
                <div className="persona-ranking segundo">
                    <h1 className="puesto-ranking">#2</h1>
                    <p className="nombre-ranking">{mejoresMedias[1].nick}</p>
                    <h1 className="valor-ranking">{mejoresMedias[1].mejor_media}s</h1>
                </div>
                <div className="persona-ranking tercero">
                    <h1 className="puesto-ranking">#3</h1>
                    <p className="nombre-ranking">{mejoresMedias[2].nick}</p>
                    <h1 className="valor-ranking">{mejoresMedias[2].mejor_media}s</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#4</h1>
                    <p className="nombre-ranking">{mejoresMedias[3].nick}</p>
                    <h1 className="valor-ranking">{mejoresMedias[3].mejor_media}s</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#5</h1>
                    <p className="nombre-ranking">{mejoresMedias[4].nick}</p>
                    <h1 className="valor-ranking">{mejoresMedias[4].mejor_media}s</h1>
                </div>
                </div>}
            </div>
    )
}
function MasVictorias({masVictorias}) {
    return(
        <div className="contenedor-rankings" onClick={(e)=>{e.stopPropagation()}}>
                <h1 className="tituloRanking">Mas Victorias</h1>
                {masVictorias.length > 0 && <div className="contenedor-personas-ranking">
                <div className="persona-ranking primero">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">{masVictorias[0].nick}</p>
                    <h1 className="valor-ranking">{masVictorias[0].victorias}</h1>
                </div>
                <div className="persona-ranking segundo">
                    <h1 className="puesto-ranking">#2</h1>
                    <p className="nombre-ranking">{masVictorias[1].nick}</p>
                    <h1 className="valor-ranking">{masVictorias[1].victorias}</h1>
                </div>
                <div className="persona-ranking tercero">
                    <h1 className="puesto-ranking">#3</h1>
                    <p className="nombre-ranking">{masVictorias[2].nick}</p>
                    <h1 className="valor-ranking">{masVictorias[2].victorias}</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#4</h1>
                    <p className="nombre-ranking">{masVictorias[3].nick}</p>
                    <h1 className="valor-ranking">{masVictorias[3].victorias}</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#5</h1>
                    <p className="nombre-ranking">{masVictorias[4].nick}</p>
                    <h1 className="valor-ranking">{masVictorias[4].victorias}</h1>
                </div>
                </div>}
            </div>
    )
}
export default Rankings