function Perfil({setPopUpActivo}) {
    
    return(
        <div className="fondo-popup" onClick={()=>{setPopUpActivo("");}}>
            <div className="contenido-perfil" onClick={(e)=>{e.stopPropagation()}}>
                <div id="contenedorIMGperfil">
                <img id="imgPerfil" src="https://64.media.tumblr.com/abc53e11a41ec4d895cb9f41712b595e/3cf5d0bf006b077a-41/s540x810/dedf82d88c9b79291f063feaded278673a3c8d25.jpg" alt="" />
                <button id="boton-editar-imagen"><i className="fa-solid fa-pen" style={{color : "white"}}></i></button>
                </div>
                <div id="contenedorInfoPerfil">
                    <div className="elementoPerfil">
                        <div className="infoElementoPerfil">
                            <p className="nombreElementoPerfil">Nombre:</p>
                            <p className="valorElementoPerfil">Pablo</p>
                        </div>
                        <button className="botonEditarPerfil">Editar</button>
                    </div>
                    <div className="elementoPerfil">
                        <div className="infoElementoPerfil">
                            <p className="nombreElementoPerfil">Apellidos:</p>
                            <p className="valorElementoPerfil">Pérez Colls</p>
                        </div>
                        <button className="botonEditarPerfil">Editar</button>
                    </div>
                    <div className="elementoPerfil">
                        <div className="infoElementoPerfil">
                            <p className="nombreElementoPerfil">Email:</p>
                            <p className="valorElementoPerfil">pablo.perez.colls@gmail.com</p>
                        </div>
                    </div>
                    <div className="elementoPerfil">
                        <div className="infoElementoPerfil">
                            <p className="nombreElementoPerfil">Nick:</p>
                            <p className="valorElementoPerfil">Krodwon</p>
                        </div>
                        <button className="botonEditarPerfil">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Perfil