import { useEffect, useState } from "react";

function Perfil({ setPopUpActivo }) {
    const [datosUsuario, setDatosUsuario] = useState({});
    const [edicionNombre, setEdicionNombre] = useState(false);
    const [edicionPrimerApellido, setEdicionPrimerApellido] = useState(false);
    const [edicionSegundoApellido, setEdicionSegundoApellido] = useState(false);
    const [edicionNick, setEdicionNick] = useState(false);
    let id = window.sessionStorage.getItem("id_usuario");

    useEffect(() => {
        fetch("http://localhost:8081/getUsuarioId?id_usuario=" + id)
            .then(res => res.json())
            .then(data => {
                console.log(data[0]);
                setDatosUsuario(data[0]);
            });
    }, []);

    const handleNombreEdit = () => {
        setEdicionNombre(!edicionNombre);
    };

    const handlePrimerApellidoEdit = () => {
        setEdicionPrimerApellido(!edicionPrimerApellido);
    };

    const handleSegundoApellidoEdit = () => {
        setEdicionSegundoApellido(!edicionSegundoApellido);
    };

    const handleNickEdit = () => {
        setEdicionNick(!edicionNick);
    };
    function handleEditarImagen(event) {
        const file = event.target.files[0];
        const nombreArchivo = id; // El nombre deseado para el archivo
        
        // Crear un objeto FormData y agregar la imagen
        const formData = new FormData();
        formData.append('imagen', file);
        
        // Enviar la imagen al servidor
        fetch('http://localhost:8081/subir-imagen', { // Ruta en el servidor para manejar la subida de imágenes
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }
            console.log('Imagen subida correctamente.');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
  
    return (
        <div className="fondo-popup" onClick={() => { setPopUpActivo(""); }}>
            <div className="contenido-perfil" onClick={(e) => { e.stopPropagation(); }}>
                <div id="contenedorIMGperfil">
                    <img id="imgPerfil" src={"../../public/imagenesPerfil/" + datosUsuario.imagen + ".jpg"} alt="" />
                    <label htmlFor="input-imagen" style={{ cursor: 'pointer' }} id="label-imagen">
                        <input id="input-imagen" type="file" style={{ display: 'none' }} accept="image/*" onChange={handleEditarImagen}/>
                        <i className="fas fa-pen" style={{ color: 'white' }}></i>
                    </label>
                </div>
                <div id="contenedorInfoPerfil">
                    <div className="elementoPerfil">
                        <div className="infoElementoPerfil">
                            <p className="nombreElementoPerfil">Nombre:</p>
                            {edicionNombre ? (
                                <input type="text" className="input-editable" value={datosUsuario.nombre} onChange={(e)=>{setDatosUsuario({...datosUsuario , nombre : e.target.value})}}/>
                            ) : (
                                <p className="valorElementoPerfil">{datosUsuario.nombre}</p>
                            )}
                        </div>
                        <button className="botonEditarPerfil" onClick={handleNombreEdit}>
                            {edicionNombre ? "Guardar" : "Editar"}
                        </button>
                    </div>
                    <div className="elementoPerfil">
                        <div className="infoElementoPerfil">
                            <p className="nombreElementoPerfil">Primer Apellido:</p>
                            {edicionPrimerApellido ? (
                                <input type="text" className="input-editable" value={datosUsuario.primer_apellido} onChange={(e)=>{setDatosUsuario({...datosUsuario , primer_apellido : e.target.value})}}/>
                            ) : (
                                <p className="valorElementoPerfil">{datosUsuario.primer_apellido}</p>
                            )}
                        </div>
                        <button className="botonEditarPerfil" onClick={handlePrimerApellidoEdit}>
                            {edicionPrimerApellido ? "Guardar" : "Editar"}
                        </button>
                    </div>
                    <div className="elementoPerfil">
                        <div className="infoElementoPerfil">
                            <p className="nombreElementoPerfil">Segundo Apellido:</p>
                            {edicionSegundoApellido ? (
                                <input type="text" className="input-editable" value={datosUsuario.segundo_apellido} onChange={(e)=>{setDatosUsuario({...datosUsuario , segundo_apellido : e.target.value})}}/>
                            ) : (
                                <p className="valorElementoPerfil">{datosUsuario.segundo_apellido}</p>
                            )}
                        </div>
                        <button className="botonEditarPerfil" onClick={handleSegundoApellidoEdit}>
                            {edicionSegundoApellido ? "Guardar" : "Editar"}
                        </button>
                    </div>
                    <div className="elementoPerfil">
                        <div className="infoElementoPerfil">
                            <p className="nombreElementoPerfil">Email:</p>
                            <p className="valorElementoPerfil">{datosUsuario.email}</p>
                        </div>
                    </div>
                    <div className="elementoPerfil">
                        <div className="infoElementoPerfil">
                            <p className="nombreElementoPerfil">Nick:</p>
                            {edicionNick ? (
                                <input type="text" className="input-editable" value={datosUsuario.nick} onChange={(e)=>{setDatosUsuario({...datosUsuario , nick : e.target.value})}} />
                            ) : (
                                <p className="valorElementoPerfil">{datosUsuario.nick}</p>
                            )}
                        </div>
                        <button className="botonEditarPerfil" onClick={handleNickEdit}>
                            {edicionNick ? "Guardar" : "Editar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil