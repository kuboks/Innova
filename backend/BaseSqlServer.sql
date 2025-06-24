CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nombre_usuario VARCHAR(50) COLLATE SQL_Latin1_General_CP1_CS_AS UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE password_reset_tokens (
    id_token INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME2 NOT NULL,
    used BIT DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE info_videos (
    id_info_video INT PRIMARY KEY IDENTITY(1,1),
    id_vid VARCHAR(50) UNIQUE NOT NULL,
    published_at DATETIME2 NOT NULL,
    channel_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail_default VARCHAR(255) NOT NULL,
    thumbnail_medium VARCHAR(255) NOT NULL,
    thumbnail_high VARCHAR(255) NOT NULL,
    channel_title VARCHAR(100) NOT NULL,
    live_broadcast_content VARCHAR(50) NOT NULL,
    publish_time DATETIME2 NOT NULL
);

CREATE TABLE favoritos (
    id_video_favorito INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    id_info_video INT NOT NULL,
    fecha_guardado DATETIME2 DEFAULT SYSDATETIME(),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_info_video) REFERENCES info_videos(id_info_video)
);