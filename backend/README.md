## Endpoints y cuerpo de pericion

# Enpoits de session
Endpoint
POST http://localhost:8880/api/login

Body de peticion
{
    "UsuarioEmail": "example@gmail.com",
    "Contraseña": "example"
}
#

# 
Endpoint
POST http://localhost:8880/api/signup

Body de peticion
{
    "Nombre": "Juan",
    "Apellidos": "Perez Perez",
    "NombreUsuario": "user",
    "Email": "example@gmail.com",
    "Contraseña": "example"
}
#

# 
Endpoint
GET http://localhost:8880/api/session

Body de peticion
No requiere body, pero si la cookie token
#

# 
Endpoint
POST http://localhost:8880/api/logout

Body de peticion
No requiere body
#

# 
Endpoint (Incompleto 26/05/2025)
POST http://localhost:8880/api/forgot-password

Body de peticion
{
    "Email": "example08@gmail.com"
}
#

# ##################################################

# Enpoits de videos
Endpoint
GET http://localhost:8880/api/videoshome

Params de peticion
part = snippet
type = video
chart = mostPopular
regionCode = MX
maxResults = 16
#

# 
Endpoint
GET http://localhost:8880/api/search

Params de peticion
part = snippet
q = criterio de busqueda
type= video
maxResults = 16
#

# 
Endpoint
POST http://localhost:8880/api/agregarvideo

Body de peticion
{
    "id_vid": "bnVUHWCynig",
    "published_at": "2009-10-03T20:59:40Z",
    "channel_id": "UC9zX2xZIJ4cnwRsgBpHGvMg",
    "title": "Beyoncé - Halo",
    "description": "Beyoncé's official music video for “Halo” Listen to Beyoncé: https://Beyonce.lnk.to/listenYD Subscribe to the official Beyoncé ...",
    "thumbnail_default": "https://i.ytimg.com/vi/bnVUHWCynig/default.jpg",
    "thumbnail_medium": "https://i.ytimg.com/vi/bnVUHWCynig/mqdefault.jpg",
    "thumbnail_high": "https://i.ytimg.com/vi/bnVUHWCynig/hqdefault.jpg",
    "channel_title": "BeyoncéVEVO",
    "live_broadcast_content": "none",
    "publish_time": "2009-10-03T20:59:40Z"
}
#

# 
Endpoint
POST http://localhost:8880/api/agregarfavorito

Body de peticion
{
    "id_usuario" : 1,
    "id_info_video": 1
}
#

# 
Endpoint
POST http://localhost:8880/api/getFavoritos

Body de peticion
{
    "id_usuario": 1
}
#

