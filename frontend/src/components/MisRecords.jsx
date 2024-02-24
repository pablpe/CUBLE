import { useEffect, useState } from "react";

function MisRecords({setPopUpActivo}) {
    const [datosUsuario,setDatosUsuario] = useState({})
    useEffect(()=>{
        let id = window.sessionStorage.getItem("id_usuario")
        fetch("http://localhost:8081/getPerfilID?id="+id)
        .then(res => res.json())
        .then(data =>{
            setDatosUsuario(data[0])
        })
    },[])
    return(
        <div className="fondo-popup" onClick={()=>{setPopUpActivo("");}}>
            <div className="contenido-mis-records" onClick={(e)=>{e.stopPropagation()}}>
                <img id="imgRecords" src={"../../public/imagenesPerfil/"+ datosUsuario.imagen +".jpg"} alt="" />
                <h1 id="nick">{datosUsuario.nick}</h1>
                <div id="statsRecords">
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Mejor tiempo</h2>
                            <span className="rango">#{datosUsuario.rank_tiempo}</span>
                        </div>
                        <p className="valor">
                            {datosUsuario.mejor_tiempo}s
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Mejor media de 5</h2>
                            <span className="rango">#{datosUsuario.rank_media}</span>
                        </div>
                        <p className="valor">
                            {datosUsuario.mejor_media}s
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Victorias</h2>
                            <span className="rango">#{datosUsuario.rank_victorias}</span>
                        </div>
                        <p className="valor">
                            {datosUsuario.victorias}
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Derrotas</h2>
                            <span className="rango">#{datosUsuario.rank_derrotas}</span>
                        </div>
                        <p className="valor">
                            {datosUsuario.derrotas}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MisRecords