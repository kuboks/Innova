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

export const login = async (body) => {
    try {
        const validacion = await validarLogin(body);

        if (validacion.error) {
            const mensaje = JSON.parse(validacion.error.message);
            throw { statusCode: 400, message: mensaje[0].message };
        }

        const criterio_busqueda = body.UsuarioEmail
        const bodyContraseña = body.Contraseña

        const usuario = await models.usuarios.findOne({
            where: {
                [Op.or]: [
                    { nombre_usuario: criterio_busqueda },
                    { correo: criterio_busqueda }
                ]
            },
            attributes: ["nombre_usuario", "correo", "contraseña"]
        });
        if (!usuario) {
            throw { statusCode: 400, message: 'No hay una cuenta con el usuario o correo ingresado' };
        }

        const passwordMatch = await bcrypt.compare(bodyContraseña, usuario.contraseña);
        if (!passwordMatch) {
            throw { statusCode: 401, message: 'La contraseña no coincide' };

        }
        const user = {
            id_usuario: usuario.id_usuario,
            usuario: usuario.nombre_usuario,
        };

        const token = jwt.sign(user, process.env.CLAVEWT, { expiresIn: '2h' });


        return {
            token: token,
            respuesta: mensajeRes(true, 'Login Correcto', null, null)
        }
    } catch (error) {
        throw error;
    }
}