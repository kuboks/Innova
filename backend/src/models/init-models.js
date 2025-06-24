import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _favoritos from  "./favoritos.js";
import _info_videos from  "./info_videos.js";
import _password_reset_tokens from  "./password_reset_tokens.js";
import _usuarios from  "./usuarios.js";

export default function initModels(sequelize) {
  const favoritos = _favoritos.init(sequelize, DataTypes);
  const info_videos = _info_videos.init(sequelize, DataTypes);
  const password_reset_tokens = _password_reset_tokens.init(sequelize, DataTypes);
  const usuarios = _usuarios.init(sequelize, DataTypes);

  favoritos.belongsTo(info_videos, { as: "id_info_video_info_video", foreignKey: "id_info_video"});
  info_videos.hasMany(favoritos, { as: "favoritos", foreignKey: "id_info_video"});
  favoritos.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(favoritos, { as: "favoritos", foreignKey: "id_usuario"});
  password_reset_tokens.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuarios.hasMany(password_reset_tokens, { as: "password_reset_tokens", foreignKey: "id_usuario"});

  return {
    favoritos,
    info_videos,
    password_reset_tokens,
    usuarios,
  };
}
