
function MisRecords({setPopUpActivo}) {
    return(
        <div className="fondo-popup" onClick={()=>{setPopUpActivo("");}}>
            <div className="contenido-mis-records" onClick={(e)=>{e.stopPropagation()}}>
                <img id="imgRecords" src="https://64.media.tumblr.com/abc53e11a41ec4d895cb9f41712b595e/3cf5d0bf006b077a-41/s540x810/dedf82d88c9b79291f063feaded278673a3c8d25.jpg" alt="" />
                <h1 id="nick">Krodwon</h1>
                <div id="statsRecords">
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Mejor tiempo</h2>
                            <span className="rango">#2</span>
                        </div>
                        <p className="valor">
                            11.2s
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Mejor media de 5</h2>
                            <span className="rango">#2</span>
                        </div>
                        <p className="valor">
                            14.7s
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Victorias</h2>
                            <span className="rango">#5</span>
                        </div>
                        <p className="valor">
                            15
                        </p>
                    </div>
                    <div className="stat">
                        <div className="contTituloRango">
                            <h2 className="titulo">Derrotas</h2>
                            <span className="rango">#2</span>
                        </div>
                        <p className="valor">
                            4
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MisRecords