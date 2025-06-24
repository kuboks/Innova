import bcrypt from 'bcrypt'
import crypto from 'crypto'
import mailer from 'nodemailer'
import dotenv from 'dotenv';

import jwt from 'jsonwebtoken'
import {
    validarLogin,
    validarNewUser,
    validarReqBodyParcial
} from '../schemas/session.schema.js'
import { Op } from "sequelize";
import { mensajeRes } from '../utils/respuesta.js'
import { models, sequelize } from '../database/sequelizeConnection.js'
import {login} from '../services/usuario.services.js'

dotenv.config();

export const postLogin = async (req, res, next) => {
    try {
        const {token, respuesta}= await login(req.body);

            res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            path: '/'
        });
        return res.json(respuesta)
    } catch (error) {
        next(error)
    }
}

export const postNewUser = async (req, res, next) => {
    try {
        const validacion = await validarNewUser(req.body)
        if (validacion.error) {
            const mensaje = JSON.parse(validacion.error.message);
            throw { statusCode: 400, message: mensaje[0].message };
        }
        const {Nombre, Apellidos, NombreUsuario, Email, Contraseña} = req.body
        const rondas = 10;
        const hashedContraseña = await bcrypt.hash(Contraseña, rondas);

        const usuario = await models.usuarios.findOne({
            where: {
                [Op.or]: [
                    { nombre_usuario: NombreUsuario },
                    { correo: Email }
                ]
            },
            attributes: ["nombre_usuario", "correo"]
        });

        if(usuario){
            throw { statusCode: 400, message: 'El nombre de usuario o correo ingresado ya existen' };
        }

        const nuevoUsuario = await models.usuarios.create({
            nombre: Nombre,
            apellido: Apellidos,
            nombre_usuario: NombreUsuario,
            correo: Email,
            contraseña: hashedContraseña
        });

        if (nuevoUsuario) {
            return res.json(mensajeRes(true, 'Usuario creado', null, null))
        }
        return res.status(400).json(mensajeRes(false, 'No se ha creado el jugador', null, null))
    } catch (error) {
        next(error)
    }
}

export const authSession = (req, res, next) => {
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
        next(error)
    }
}

export const logout = (req, res, next) => {
    try {
        const token = req.cookies.token;
        return !token
        ? res.status(400).json(mensajeRes(false, 'No hay sesion activa', null, null))
        : res.clearCookie("token", {path: '/'}) && res.json(mensajeRes(true, 'Sesión cerrada exitosamente', null, null))
    } catch (error) {
        next(error)
    }
}

export const postForgotPassword = async (req, res, next) => {
    try {
        const validacion = await validarReqBodyParcial(req.body);

        if (validacion.error) {
            const mensaje = JSON.parse(validacion.error.message);
            throw { statusCode: 400, message: mensaje[0].message };
        }

        const email = req.body.Email;

        const usuario = await models.usuarios.findOne({
            where: { correo: email },
            attributes: ['id_usuario', 'correo']
        });

        if (!usuario) {
            throw { statusCode: 404, message: 'No se encontró una cuenta con ese correo' };
        }

        const tokenRecuperacion = crypto.randomBytes(32).toString('hex');
        const expiracion = new Date(Date.now() + 3600000); // 1 hora

        const registrarTokenRecuperacion= await models.password_reset_tokens.create({
            id_usuario: usuario.id_usuario,
            token: tokenRecuperacion,
            expires_at: expiracion
        });

        if (!registrarTokenRecuperacion) {
            return res.json(mensajeRes(false, 'Token no registrado', null, null))
        }

        // Configurar el servicio de correo
        const envio = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'brayanaguilar.ks88@gmail.com',
                pass: process.env.PASSWORD_NODEMAILER
            }
        });

        const resetLink = `https://lucid-elegance-production.up.railway.app/newpassword?token=${tokenRecuperacion}`;

        const infoEnvioCorreo= await envio.sendMail({
            from: '"Soporte" <brayanaguilar.ks88@gmail.com>',
            to: email,
            subject: 'Recupera tu contraseña',
            html: `<p>Recibimos una solicitud para recuperar tu contraseña. Ingresa al siguiente enlace para restablecerla:</p>
                   <a href="${resetLink}">Restablecer contraseña</a>
                   <p>Si no solicitaste este cambio, ignora este correo.</p>`
        });

        if (!infoEnvioCorreo.messageId) {
        throw { statusCode: 500, message: 'Error al enviar el correo de recuperación' };
    }
        return res.json(mensajeRes(true, 'Correo enviado', null, null));
    } catch (error) {
        next(error)
    }
}

export const postNewPassword = async (req, res, next) =>{
    const transaction = await sequelize.transaction();
    try {      
        const {token, contraseña} = req.body
        const saltRounds = 10;
        const hashedContraseña= await bcrypt.hash(contraseña, saltRounds)

        const consultaToken = await models.password_reset_tokens.findOne({
            where: {
                token: token
            },
            attributes:["id_token", "id_usuario", "expires_at", "used"]
        })

        const tokenInvalido= (new Date(consultaToken.expires_at) <= new Date()) || Boolean(consultaToken.used)
        if(!consultaToken || tokenInvalido){
            throw { statusCode: 401, message: 'No se puede cambiar de contraseña' };
        }

        const updateContraseña= await models.usuarios.update({contraseña: hashedContraseña},{
            where: {id_usuario: consultaToken.id_usuario},
            transaction,
        })

        const updateTokenUsed= await models.password_reset_tokens.update({used: 1},{
                where: {id_token: consultaToken.id_token},
                transaction
            })

        if (updateContraseña[0] === 0 || updateTokenUsed[0] === 0) {
            throw { statusCode: 401, message: 'Ocurrió un error al cambiar la contraseña' };
        }

        await transaction.commit();
        return res.json(mensajeRes(true, 'Contraseña cambiada exitosamente', null, null))
    } catch (error) {
        await transaction.rollback();
        next(error)
    }
}
