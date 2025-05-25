import {getConnection} from '../database/connection.js'
import mssql from 'mssql'
import jwt from 'jsonwebtoken'
import {
    validarLogin,
    validarNewUser
} from '../schemas/session.schema.js'

export const postLogin= async (req, res) => {
    try {
        const validacion= await validarLogin(req.body)

        if(validacion.error){
            return res.status(400).json({error: JSON.parse(validacion.error.message)})
        }

        const pool= await getConnection();
        const password= req.body.Contraseña;
        const result= await pool.request()
        .input('Nombre', mssql.VarChar, req.body.Usuario)
        .query('SELECT id_usuario, nombre_usuario, contraseña FROM Usuarios WHERE nombre_usuario= @Nombre');

        if(result.rowsAffected[0]===0){
            return res.json({message: "La usuario no coincide"})
        }

        if(password === result.recordset[0].contraseña){
            const user = {
                id_usuario: result.recordset[0].id_usuario,
                usuario: result.recordset[0].nombre_usuario,
            };

            const token = jwt.sign(user, process.env.CLAVEWT, { expiresIn: '2h' });
            
            res.cookie('token', token, {
                httpOnly: true, // Impide acceso desde JS en el frontend
                secure: true,   // Solo se envía en HTTPS
                sameSite: 'Strict' // Previene CSRF
            });

            return res.json({
                message:"Bienvenido",
                usuario: result.recordset,
            });

        }
        return res.json({message: "La contraseña no coincide"})
    } catch (error) {
        console.log(error)
    }
}

export const postNewUser= async (req, res) =>{
    try {
        const validacion= await validarNewUser(req.body)

        if(validacion.error){
            return res.status(400).json({error: JSON.parse(validacion.error.message)})
        }
            const pool= await getConnection();
            const result= await pool.request()
            .input('Nombre', mssql.VarChar, req.body.Nombre)
            .input('Apellidos', mssql.VarChar, req.body.Apellidos)
            .input('NombreUsuario', mssql.VarChar, req.body.NombreUsuario)
            .input('Email', mssql.VarChar, req.body.Email)
            .input('Password', mssql.VarChar, req.body.Password)
            .query('INSERT INTO Usuarios (nombre, apellido, nombre_usuario, correo, contraseña)VALUES(@Nombre, @Apellidos, @NombreUsuario, @Email, @Password)');
            return res.json({message: "Usuario creado", result: result.rowsAffected})
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: "No se ha creado el jugador"})
        }
}

export const authSession= (req,res) =>{
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No autenticado" });

    jwt.verify(token, process.env.CLAVEWT, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token inválido" });
        res.json({ id_usuario: decoded.id_usuario, usuario: decoded.usuario });
    });
}

export const logout= (req, res) =>{
    res.clearCookie("token");
    res.json({ message: "Sesión cerrada" });
}