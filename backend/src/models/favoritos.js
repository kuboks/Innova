import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class favoritos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_video_favorito: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    id_info_video: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'info_videos',
        key: 'id_info_video'
      }
    },
    fecha_guardado: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('sysdatetime')
    }
  }, {
    sequelize,
    tableName: 'favoritos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__favorito__0F67D60D3FE517A5",
        unique: true,
        fields: [
          { name: "id_video_favorito" },
        ]
      },
    ]
  });
  }
}
