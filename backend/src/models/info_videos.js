import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class info_videos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_info_video: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_vid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "UQ__info_vid__6DAC052F3AC383B3"
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    channel_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    thumbnail_default: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    thumbnail_medium: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    thumbnail_high: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    channel_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    live_broadcast_content: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    publish_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'info_videos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__info_vid__10A8546D6F3854A4",
        unique: true,
        fields: [
          { name: "id_info_video" },
        ]
      },
      {
        name: "UQ__info_vid__6DAC052F3AC383B3",
        unique: true,
        fields: [
          { name: "id_vid" },
        ]
      },
    ]
  });
  }
}
