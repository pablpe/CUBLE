/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function Perfil({ setPopUpActivo }) {
    const [datosUsuario, setDatosUsuario] = useState({});
    const [edicionNombre, setEdicionNombre] = useState(false);
    const [edicionPrimerApellido, setEdicionPrimerApellido] = useState(false);
    const [edicionSegundoApellido, setEdicionSegundoApellido] = useState(false);
    const [edicionNick, setEdicionNick] = useState(false);
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

    let id = window.sessionStorage.getItem("id_usuario");

    function handleEditarImagen(event) {
        const file = event.currentTarget.files[0]; // Obtener el archivo seleccionado
    
        const fileParts = file.name.split('.');
        const fileExtension = fileParts[fileParts.length - 1];
        console.log(fileExtension);
        
        // Suponiendo que la ID del usuario está disponible en alguna parte de tu código
        const id = window.sessionStorage.getItem("id_usuario");
    
        // Crear un objeto FormData y agregar la imagen con la extensión
        const formData = new FormData();
        formData.append('imagen', file, `${id}.${fileExtension}`);
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
            let data = {
                imagen : `${id}.${fileExtension}`,
                id : id
            }
            fetch('http://localhost:8081/usarioModImg', { // Ruta en el servidor para manejar la subida de imágenes
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al modificar la imagen');
                }
                return response.text()
            })
            .then(data => {console.log(data);window.location.reload()})
            .catch(err => console.error(err))
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function modificarDato(peticion,dato) {
        let data = {
            dato : dato,
            id : id
        }
        fetch('http://localhost:8081/'+peticion, { // Ruta en el servidor para manejar la subida de imágenes
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al modificar dato');
                }
                return response.text()
            })
            .catch(err => console.error(err))
    }
    return (
        <>
        {datosUsuario?.id_usuario && <div className="fondo-popup" onClick={() => { setPopUpActivo(""); }}>
            <div className="contenido-perfil" onClick={(e) => { e.stopPropagation();  }}>
                <div id="contenedorIMGperfil">
                    <img id="imgPerfil" src={"../../public/imagenesPerfil/" + datosUsuario.imagen} alt="" />
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
                        {edicionNombre ? 
                            <button className="botonEditarPerfil" onClick={()=>{modificarDato("usarioModNombre", datosUsuario.nombre);handleNombreEdit()}}> Guardar </button> :
                            <button className="botonEditarPerfil" onClick={handleNombreEdit}> Editar </button>
                        }
                    </div>
                        <div className="elementoPerfil">
                            <div className="infoElementoPerfil">
                                <p className="nombreElementoPerfil">Primer apellido:</p>
                                {edicionPrimerApellido ? (
                                    <input type="text" className="input-editable" value={datosUsuario.primer_apellido} onChange={(e) => { setDatosUsuario({ ...datosUsuario, primer_apellido: e.target.value }) }} />
                                ) : (
                                    <p className="valorElementoPerfil">{datosUsuario.primer_apellido}</p>
                                )}
                            </div>
                            {edicionPrimerApellido ? 
                                <button className="botonEditarPerfil" onClick={()=>{modificarDato("usarioModApellido1", datosUsuario.primer_apellido);handlePrimerApellidoEdit()}}> Guardar </button> :
                                <button className="botonEditarPerfil" onClick={handlePrimerApellidoEdit}> Editar </button>
                            }
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
                        {edicionSegundoApellido ? 
                            <button className="botonEditarPerfil" onClick={()=>{modificarDato("usarioModApellido2", datosUsuario.segundo_apellido);handleSegundoApellidoEdit()}}> Guardar </button> :
                            <button className="botonEditarPerfil" onClick={handleSegundoApellidoEdit}> Editar </button>
                        }
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
                                    <input type="text" className="input-editable" value={datosUsuario.nick} onChange={(e) => { setDatosUsuario({ ...datosUsuario, nick: e.target.value }) }} />
                                ) : (
                                    <p className="valorElementoPerfil">{datosUsuario.nick}</p>
                                )}
                            </div>
                            {edicionNick ? 
                            <button className="botonEditarPerfil" onClick={()=>{modificarDato("usarioModNick", datosUsuario.nick);handleNickEdit()}}> Guardar </button> :
                            <button className="botonEditarPerfil" onClick={handleNickEdit}> Editar </button>
                        }
                        </div>
                        
                    </div>
                </div>
                </div>}
        </>
    );
}

export default Perfil