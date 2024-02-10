const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const bodyParser = require("body-parser");

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password :"",
    database : "cuble"
})
db.query("SET autocommit = 1");

app.get("/",(req, res)=>{
    return res.json("From backend side")
})

app.post("/usuarioAlta", (req, res) => {
    let sql = "INSERT INTO `usuario`(`nombre`, `primer_apellido`, `segundo_apellido`, `email`, `nick`, `contrasena`) VALUES (?,?,?,?,?,?)";

    const { nombre, apellido1, apellido2, email, nick, contrasena } = req.body;
    let values = [nombre, apellido1, apellido2, email, nick, contrasena]
    
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.send("Usuario insertado");
    });
});
app.post("/usuarioBaja",(req,res)=>{
    let sql = "DELETE FROM `usuario` WHERE `id_usuario` = ?"
    const { id } = req.body
    let values = [id]
    db.query(sql, values, (err,data)=>{
        if (err) return res.json(err);
        return res.send("Usuario eliminado");
    })
})
app.post("/usarioModNick",(req,res)=>{
    let sql = "UPDATE `usuario` SET `nick`= ? WHERE `id_usuario` = ?"
    let { id, nick } = req.body
    let values = [nick,id]
    db.query(sql,values,(err,data)=>{
        if (err) return res.json(err)
        return res.send("Usuario modificado")
    })
})
app.post("/usarioModNombre",(req,res)=>{
    let sql = "UPDATE `usuario` SET `nombre`= ? WHERE `id_usuario` = ?"
    let { id, nombre } = req.body
    let values = [nombre,id]
    db.query(sql,values,(err,data)=>{
        if (err) return res.json(err)
        return res.send("Usuario modificado")
    })
})
app.post("/usarioModApellido1",(req,res)=>{
    let sql = "UPDATE `usuario` SET `primer_apellido`= ? WHERE `id_usuario` = ?"
    let { id, apellido1 } = req.body
    let values = [apellido1,id]
    db.query(sql,values,(err,data)=>{
        if (err) return res.json(err)
        return res.send("Usuario modificado")
    })
})
app.post("/usarioModApellido2",(req,res)=>{
    let sql = "UPDATE `usuario` SET `segundo_apellido`= ? WHERE `id_usuario` = ?"
    let { id, apellido2 } = req.body
    let values = [apellido2,id]
    db.query(sql,values,(err,data)=>{
        if (err) return res.json(err)
        return res.send("Usuario modificado")
    })
})
app.get("/getAmigosId",(req,res)=>{
    let sql = "SELECT id_usuario,imagen,nick FROM `usuario` WHERE (`id_usuario` in (SELECT `id_usuario1` FROM `amigos` WHERE `id_usuario2` = ?)) or (`id_usuario` in (SELECT `id_usuario2` FROM `amigos` WHERE `id_usuario1` = ?));"
    const { id } = req.query
    let values = [id,id]
    db.query(sql,values,(err,data)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data)
    })
})

app.get("/getPerfilID",(req,res)=>{
    let sql = "SELECT usuario.imagen, usuario.nick, (SELECT solves.tiempo FROM solves WHERE solves.id_solve in (SELECT id_mejor_tiempo FROM perfil WHERE id_usuario = ?)) as mejor_tiempo,perfil.mejor_media, perfil.victorias, perfil.derrotas,(SELECT count(*) FROM solves WHERE tiempo <= (SELECT tiempo from solves where id_solve = id_mejor_tiempo) ) as rank_tiempo, (SELECT COUNT(*) FROM perfil where mejor_media <= (SELECT mejor_media FROM perfil WHERE id_usuario = ?)) as rank_media, (SELECT COUNT(*) FROM perfil where victorias >= (SELECT victorias FROM perfil WHERE id_usuario = ?)) as rank_victorias, (SELECT COUNT(*) FROM perfil where derrotas <= (SELECT derrotas FROM perfil WHERE id_usuario = ?)) as rank_derrotas FROM perfil,solves,usuario WHERE perfil.id_mejor_tiempo = solves.id_solve and usuario.id_usuario = perfil.id_usuario and perfil.id_usuario = ?;"
    const { id } = req.query
    console.log("object");
    let values = [id,id,id,id,id]
    db.query(sql,values,(err,data)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data)
    })
})
app.post("/actualizaDatoPerfil",(req,res)=>{
    const { id_usuario, id_mejor_tiempo, mejor_media, victorias, derrotas } = req.body
    let consulta = ""
    let values = []
    if (id_mejor_tiempo) {
        consulta = "id_mejor_tiempo = ?"
        values.push(id_mejor_tiempo)
    }
    if (mejor_media) {
        consulta = "mejor_media = ?"
        values.push(mejor_media)
    }
    if (victorias) {
        consulta = "victorias = victorias + 1"
    }
    if (derrotas) {
        consulta = "derrotas = derrotas + 1"
    }
    values.push(id_usuario)
    let sql = "UPDATE `perfil` SET "+consulta+" WHERE `id_usuario` = ?"
    db.query(sql,values,(err,data)=>{
        if (err) return res.json(err)
        return res.send("Perfil modificado")
    })
})
app.get("/mejoresTiempos",(req,res)=>{
    let sql = "SELECT usuario.id_usuario, usuario.nick, solves.tiempo FROM perfil JOIN usuario ON perfil.id_usuario = usuario.id_usuario JOIN solves on perfil.id_mejor_tiempo = solves.id_solve ORDER by solves.tiempo LIMIT 5"
    db.query(sql,[],(err,data)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data)
    })
})
app.get("/mejoresMedias",(req,res)=>{
    let sql = "SELECT usuario.id_usuario, usuario.nick, perfil.mejor_media FROM perfil, usuario WHERE perfil.id_usuario = usuario.id_usuario ORDER BY perfil.mejor_media LIMIT 5;"
    db.query(sql,[],(err,data)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data)
    })
})
app.get("/masVictorias",(req,res)=>{
    let sql = "SELECT usuario.id_usuario, usuario.nick, perfil.victorias FROM perfil, usuario WHERE perfil.id_usuario = usuario.id_usuario ORDER BY perfil.victorias DESC LIMIT 5;"
    db.query(sql,[],(err,data)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data)
    })
})
app.get("/solves",(req,res)=>{ // devuelve los 50 solves del usuario con ID, a partir de el registro numero ACTUAL 
    let sql = "SELECT * FROM solves WHERE id_usuario = ? LIMIT ?,50"
    const {id,actual} = req.query
    db.query(sql,[id,actual],(err,data)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data)
    })
})
app.get("/algset",(req,res)=>{
    let sql = "SELECT * FROM algoritmos WHERE alg_set = ?"
    const {alg_set} = req.query
    db.query(sql,[alg_set],(err,data)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data)
    })
})
app.listen(8081, ()=>{
    console.log("listening");
})

/*
    alta de usuario
    baja de usuario
    modificacion de usuario (nombre, apellido1, apellido2, nick)
    obtener amigos por id
    obtener perfil por id
    obtener perfil por nick (para pulsar el nick en rankings)
    actualizar dato en perfil
    ranking{
        obtener mejores tiempos (con nick de usuario)
        obtener mejores medias (con nick de usuario)
        obtener mas victorias (con nick de usuario)
    }
    cronómetro{
        obtener tiempos de usuario por id
    }
    practica{
        obtener algset (por nombre de set)
    }
*/