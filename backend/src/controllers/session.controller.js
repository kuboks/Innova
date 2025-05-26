import { getConnection } from '../database/connection.js'
import mssql from 'mssql'
import jwt from 'jsonwebtoken'
import { logger } from '../config/logger.js'
import mailer from 'nodemailer'
import crypto from 'crypto'
import {
    validarLogin,
    validarNewUser
} from '../schemas/session.schema.js'
//Estandarizacion de respuesta a peticiones http
import { mensajeRes } from '../utils/respuesta.js'

export const postLogin = async (req, res) => {
    try {
        const validacion = await validarLogin(req.body);
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (validacion.error) {
            const mensaje = JSON.parse(validacion.error.message)
            return res.status(400).json(mensajeRes(false, mensaje[0].message, null, null))
        }

        const pool = await getConnection();
        let result=null;
        const password = crypto.createHash('sha256').update(req.body.Contraseña).digest('hex');
        const usuarioEmail= req.body.UsuarioEmail;

        if(regex.test(usuarioEmail)){
            result = await pool.request()
            .input('UsuarioEmail', mssql.VarChar, usuarioEmail)
            .query('SELECT id_usuario, nombre_usuario, contraseña FROM Usuarios WHERE correo= @UsuarioEmail');
        }else{
            result = await pool.request()
            .input('UsuarioEmail', mssql.VarChar, usuarioEmail)
            .query('SELECT id_usuario, nombre_usuario, contraseña FROM Usuarios WHERE nombre_usuario= @UsuarioEmail');
        }

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json(mensajeRes(false, 'No hay una cuenta con el usuario o correo ingresado', null, null))
        }

        if (password === result.recordset[0].contraseña) {
            const user = {
                id_usuario: result.recordset[0].id_usuario,
                usuario: result.recordset[0].nombre_usuario,
            };

            const token = jwt.sign(user, process.env.CLAVEWT, { expiresIn: '2h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });

            return res.json(mensajeRes(true, 'Login Correcto', result.recordset, null))
        }
        return res.status(401).json(mensajeRes(false, 'La contraseña no coincide', null, null))
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        logger.error({
            message: 'Error en postLogin',
            error: error.message, // Mensaje del error
            stack: error.stack,  // Pila del error para depuración
            route: req.originalUrl // Ruta donde ocurrió el error
        });
        return res.status(statusCode).json(mensajeRes(false, 'Error al inciar sesion', false, error.message))
    }
}

export const postNewUser = async (req, res) => {
    try {
        const validacion = await validarNewUser(req.body)
        if (validacion.error) {
            const mensaje = JSON.parse(validacion.error.message)
            return res.status(400).json(mensajeRes(false, mensaje[0].message, null, null))
        }
        const password= crypto.createHash('sha256').update(req.body.Contraseña).digest('hex')

        const pool = await getConnection();
        const checkUser = await pool.request()
            .input('Email', mssql.VarChar, req.body.Email)
            .query('SELECT * FROM Usuarios WHERE correo = @Email');

        if (checkUser.recordset.length > 0) {
            return res.status(409).json(
                mensajeRes(false, 'Ya existe una cuenta con el correo ingresado', null, null)
            )
        }

        const result = await pool.request()
            .input('Nombre', mssql.VarChar, req.body.Nombre)
            .input('Apellidos', mssql.VarChar, req.body.Apellidos)
            .input('NombreUsuario', mssql.VarChar, req.body.NombreUsuario)
            .input('Email', mssql.VarChar, req.body.Email)
            .input('Password', mssql.VarChar, password)
            .query('INSERT INTO Usuarios (nombre, apellido, nombre_usuario, correo, contraseña)VALUES(@Nombre, @Apellidos, @NombreUsuario, @Email, @Password)');

        if (result.rowsAffected) {
            return res.json(mensajeRes(true, 'Usuario creado', { Nombreusuario: req.body.NombreUsuario }, null))
        }
        return res.status(400).json(mensajeRes(false, 'No se ha creado el jugador', null, null))
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        logger.error({
            message: 'Error en postNewUser',
            error: error.message, // Mensaje del error
            stack: error.stack,  // Pila del error para depuración
            route: req.originalUrl // Ruta donde ocurrió el error
        });
        return res.status(statusCode).json(mensajeRes(false, 'No se ha creado el jugador', null, error.message))
    }
}

export const authSession = (req, res) => {
    try {
        const token = req.cookies.token;
        let data= {};

        if (!token) {
            return res.status(401).json(mensajeRes(false, 'No hay session activa', null, null))
        }

        jwt.verify(token, process.env.CLAVEWT, (err, decoded) => {
            if (err) {
                return res.status(403).json(mensajeRes(false, 'Token inválido', null, null))
            }
            data = { id_usuario: decoded.id_usuario, usuario: decoded.usuario }
            return res.json(mensajeRes(true, 'Autenticado', data, null))
        });
        
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        logger.error({
            message: 'Error en authSession',
            error: error.message, // Mensaje del error
            stack: error.stack,  // Pila del error para depuración
            route: req.originalUrl // Ruta donde ocurrió el error
        });
        return res.status(statusCode).json(mensajeRes(false, 'Error al autenticar', null, error.message))
    }
}

export const logout = (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json(mensajeRes(false, 'No hay sesion activa', null, null))
        }
        res.clearCookie("token", {path: '/'});
        return res.json(mensajeRes(true, 'Sesión cerrada exitosamente', null, null))
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        return res.status(statusCode).json(mensajeRes(false, 'Error al cerrar sesion', null, error.message))
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const pool = await getConnection();
        result = await pool.request()
            .input('Email', mssql.VarChar, req.body.Email)
            .query('SELECT correo FROM Usuarios WHERE correo= @Email');
        if(result.rowsAffected[0] === 0){
            return res.json(mensajeRes(true, 'Correo enviado', result.recordset, null))
        }

        
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        return res.status(statusCode).json(mensajeRes(false, 'Error al cerrar sesion', null, error.message))
    }
}