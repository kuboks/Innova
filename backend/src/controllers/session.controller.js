import {getConnection} from '../database/connection.js'
import mssql from 'mssql'

export const postLogin= async (req, res) => {
    try {
        const pool= await getConnection();
        const result= await pool.request()
        .input('Nombre', mssql.VarChar, req.body.Nombre)
        .query('SELECT id_usuario as Id, nombre_usuario as Usuario, contraseña as Password FROM Usuarios WHERE nombre_usuario COLLATE SQL_Latin1_General_CP1_CS_AS= @Nombre');

        if(result.rowsAffected[0]===0){
            return res.json({message: "La usuario no coincide"})
        }

        return res.json({
            message:"Bienvenido",
            usuario: req.body.Usuario,
        });
    } catch (error) {
        console.log(error)
    }
}
export const postNewUser= async (req, res) =>{
    try {
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
