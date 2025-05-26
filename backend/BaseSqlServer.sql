-- Crear la base de datos Innovatube
CREATE DATABASE innovatube;
GO

-- Usar la base de datos
USE innovatube;
GO

-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nombre_usuario VARCHAR(50) COLLATE SQL_Latin1_General_CP1_CS_AS UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);
GO

-- Crear la tabla PasswordResetTokens
CREATE TABLE PasswordResetTokens (
    id_token INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BIT DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
GO

-- Crear la tabla Info_Videos
CREATE TABLE Info_Videos (
    id_info_video INT PRIMARY KEY IDENTITY(1,1),
    id_vid VARCHAR(50) UNIQUE NOT NULL,
    published_at DATETIME NOT NULL,
    channel_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail_default VARCHAR(255) NOT NULL,
    thumbnail_medium VARCHAR(255) NOT NULL,
    thumbnail_high VARCHAR(255) NOT NULL,
    channel_title VARCHAR(100) NOT NULL,
    live_broadcast_content VARCHAR(50) NOT NULL,
    publish_time DATETIME NOT NULL
);
GO

-- Crear la tabla Favoritos
CREATE TABLE Favoritos (
    id_video_favorito INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT NOT NULL,
    id_info_video INT NOT NULL,
    fecha_guardado DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_info_video) REFERENCES Info_Videos(id_info_video)
);
GO