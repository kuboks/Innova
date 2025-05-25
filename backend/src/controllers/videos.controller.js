import { getConnection } from '../database/connection.js'
import mssql from 'mssql'

import axios from 'axios'
//Estandarizacion de respuesta a peticiones http
import { mensajeRes } from '../utils/respuesta.js'


export const getVideos = async (req, res) => {
    try {
        let data={}
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: req.query.key,
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
                key: req.query.key,
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
        console.error("Error al agregar a favoritos:", error);
        res.status(500).json({ error: "Error en favoritos" });
    }
}

export const postAgregarFavorito = async (req, res) => {

}