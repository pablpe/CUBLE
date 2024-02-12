
function Rankings({setPopUpActivo}) {
    
    return (
        <div className="fondo-popup" onClick={()=>{setPopUpActivo("");}}>
            <div className="contenedor-rankings" onClick={(e)=>{e.stopPropagation()}}>
                <h1 className="tituloRanking">Mejor Tiempo</h1>
                <div className="contenedor-personas-ranking">
                <div className="persona-ranking primero">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                <div className="persona-ranking segundo">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                <div className="persona-ranking tercero">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                </div>
            </div>
            <div className="contenedor-rankings" onClick={(e)=>{e.stopPropagation()}}>
                <h1 className="tituloRanking">Mejor Media</h1>
                <div className="contenedor-personas-ranking">
                <div className="persona-ranking primero">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                <div className="persona-ranking segundo">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                <div className="persona-ranking tercero">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11.2s</h1>
                </div>
                </div>
            </div>
            <div className="contenedor-rankings" onClick={(e)=>{e.stopPropagation()}}>
                <h1 className="tituloRanking">Mas Victorias</h1>
                <div className="contenedor-personas-ranking">
                <div className="persona-ranking primero">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11</h1>
                </div>
                <div className="persona-ranking segundo">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11</h1>
                </div>
                <div className="persona-ranking tercero">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11</h1>
                </div>
                <div className="persona-ranking cuartoquinto">
                    <h1 className="puesto-ranking">#1</h1>
                    <p className="nombre-ranking">Xx_Josito_xX</p>
                    <h1 className="valor-ranking">11</h1>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Rankings