import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class password_reset_tokens extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_token: {
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
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'password_reset_tokens',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__password__3C2FA9C451E6AFED",
        unique: true,
        fields: [
          { name: "id_token" },
        ]
      },
    ]
  });
  }
}
