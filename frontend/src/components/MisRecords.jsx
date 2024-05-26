import { useEffect, useState } from "react";

function MisRecords({setPopUpActivo}) {
    const [datosUsuario,setDatosUsuario] = useState({})
    useEffect(()=>{
        let id = window.sessionStorage.getItem("id_usuario")
        fetch("http://localhost:8081/getPerfilID?id="+id)
        .then(res => res.json())
        .then(data =>{
            console.log(data[0])
            setDatosUsuario(data[0])
        })
    },[])
    return(
        <>
        {datosUsuario?.nick && <div className="fondo-popup" onClick={()=>{setPopUpActivo("");}}>
            <div className="contenido-mis-records" onClick={(e)=>{e.stopPropagation()}}>
                <img id="imgRecords" src={"../../public/imagenesPerfil/"+ datosUsuario.imagen} alt="" />
                <h1 id="nick">{datosUsuario.nick}</h1>
                <div id="statsRecords">
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Mejor tiempo</h2>
                            <span className="rango">#{datosUsuario.mejor_tiempo == null ? "?" : datosUsuario.rank_tiempo + 1}</span>
                        </div>
                        <p className="valor">
                            {datosUsuario.mejor_tiempo == null ? "?" : datosUsuario.mejor_tiempo + "s"}
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Mejor media de 5</h2>
                            <span className="rango">#{datosUsuario.mejor_media == 0 ? "?" : datosUsuario.rank_media + 1}</span>
                        </div>
                        <p className="valor">
                            {datosUsuario.mejor_media == 0 ? "?" : datosUsuario.mejor_media + "s"}
                        </p>
                    </div>
                    {/* <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Victorias</h2>
                            <span className="rango">#{datosUsuario.rank_victorias + 1}</span>
                        </div>
                        <p className="valor">
                            {datosUsuario.victorias}
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Derrotas</h2>
                            <span className="rango">#{datosUsuario.rank_derrotas}</span> //esta linea estaba comentada
                        </div>
                        <p className="valor">
                            {datosUsuario.derrotas}
                        </p>
                    </div> */}
                </div>
            </div>
        </div>}
        </>
    )
}
export default MisRecords