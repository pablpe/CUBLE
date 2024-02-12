function Amigos({setPopUpActivo}) {
    
    return(
        <div className="fondo-popup amigos" onClick={()=>{setPopUpActivo("");}}>
                <div id="contenedorAmigos" onClick={(e)=>{e.stopPropagation()}}>
                    <nav>
                    <i className="fa-solid fa-users icono-amigos" tabindex="0" role="button" autoFocus></i>
                    <h1 className="h1Amigos">Amigos</h1>
                    <i className="fa-solid fa-plus icono-amigos" tabindex="0" role="button"></i>
                    </nav>
                    <div id="listado-amigos">
                        <Amigo img={"https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg"} nombre={"Josito"}/>
                    </div>
                </div>

                <div className="contenido-mis-records" onClick={(e)=>{e.stopPropagation()}}>
                <img id="imgRecords" src="https://i.pinimg.com/originals/f3/14/42/f31442167086a53453feafa6d64492e3.jpg" alt="" />
                <h1 id="nick">Josito</h1>
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
function Amigo({img, nombre}) {
    return(
        <div className="info-amigo">
            <img src={img} alt="" />
            <h3 style={{fontWeight : "200", fontSize : "larger"}}>{nombre}</h3>
            <button className="botonEditarPerfil">Perfil</button>
        </div>
    )
}
export default Amigos