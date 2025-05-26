import { getConnection } from '../database/connection.js'
import mssql from 'mssql'
import axios from 'axios'
//Estandarizacion de respuesta a peticiones http
import { mensajeRes } from '../utils/respuesta.js'
import dotenv from 'dotenv';

dotenv.config();

export const getVideos = async (req, res) => {
    try {
        let data={}
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: process.env.KEY_YOUTUBE,
                part: req.query.part,
                q: req.query.q,
                type: req.query.type,
                maxResults: req.query.maxResults
            }
        });
        data= response.data;
        return res.json(mensajeRes(true, 'Videos encontrados', data, null))
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        return res.status(statusCode).json(mensajeRes(false, 'Error al obtener los videos', null, error.message));
    }
};

export const getVideosHome = async (req, res) => {
    try {
        let data={}
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: process.env.KEY_YOUTUBE,
                part: req.query.part,
                type: req.query.type,
                chart: req.query.chart,
                regionCode: req.query.regionCode,
                maxResults: req.query.maxResults
            }
        });
        data= response.data;
        return res.json(mensajeRes(true, 'Videos encontrados', data, null))
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        return res.status(statusCode).json(mensajeRes(false, 'Error al obtener los videos', null, error.message));
    }
};

export const postAgregarVideo = async (req, res) => {
    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input('id_vid', mssql.VarChar, req.body.id_vid)
            .input('published_at', mssql.DateTime, req.body.published_at)
            .input('channel_id', mssql.VarChar, req.body.channel_id)
            .input('title', mssql.VarChar, req.body.title)
            .input('description', mssql.Text, req.body.description)
            .input('thumbnail_default', mssql.VarChar, req.body.thumbnail_default)
            .input('thumbnail_medium', mssql.VarChar, req.body.thumbnail_medium)
            .input('thumbnail_high', mssql.VarChar, req.body.thumbnail_high)
            .input('channel_title', mssql.VarChar, req.body.channel_title)
            .input('live_broadcast_content', mssql.VarChar, req.body.live_broadcast_content)
            .input('publish_time', mssql.DateTime, req.body.publish_time)
            .query(`
            INSERT INTO Info_Videos (id_vid, published_at, channel_id, title, description, thumbnail_default, thumbnail_medium, thumbnail_high, channel_title, live_broadcast_content, publish_time)
            VALUES (@id_vid, @published_at, @channel_id, @title, @description, @thumbnail_default, @thumbnail_medium, @thumbnail_high, @channel_title, @live_broadcast_content, @publish_time);
            SELECT SCOPE_IDENTITY() AS id_info_video;
            `);

        if (result.rowsAffected) {
            return res.json({ message: "Video agregado", result: result.rowsAffected })
        }

    } catch (error) {

        const statusCode = error.response ? error.response.status : 500;
        return res.status(statusCode).json(mensajeRes(false, 'Error', false, error.message))
    }
}

export const postAgregarFavorito = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_usuario', mssql.Int, req.body.id_usuario)
            .input('id_info_video', mssql.Int, req.body.id_info_video)
            .query(`
                INSERT INTO Favoritos (id_usuario, id_info_video)
                VALUES (@id_usuario, @id_info_video)
            `);
        if (result.rowsAffected) {
            return res.json(mensajeRes(true, 'Se agrego a Favoritos', null, null))
        }
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        return res.status(statusCode).json(mensajeRes(false, 'Error al agregar a favoritos', false, error.message))
    }
}

export const getFavoritos = async (req, res) =>{
    try {
        let data= {}
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_usuario', req.body.id_usuario)
            .query(`
                SELECT 
                    iv.id_vid,
                    iv.published_at,
                    iv.channel_id,
                    iv.title,
                    iv.description,
                    iv.thumbnail_default,
                    iv.thumbnail_medium,
                    iv.thumbnail_high,
                    iv.channel_title,
                    iv.live_broadcast_content,
                    iv.publish_time
                FROM Info_Videos iv
                JOIN Favoritos f ON iv.id_info_video = f.id_info_video
                WHERE f.id_usuario = @id_usuario
            `);
        if(result.recordset.length > 0){
            data= result.recordset;
            return res.json(mensajeRes(true, 'Videos encontrados', data, null))
        }
        return res.status(200).json(mensajeRes(true, 'No se encontraron videos', data, null))
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        return res.status(statusCode).json(mensajeRes(false, 'Error al recuperar videos', false, error.message))
    }
}