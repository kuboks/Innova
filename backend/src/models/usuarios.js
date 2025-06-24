import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class usuarios extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nombre_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "UQ__usuarios__D4D22D741047A618"
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__usuarios__2A586E0BBDF4E5B3"
    },
    'contraseña': {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__usuarios__4E3E04AD0E57146C",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "UQ__usuarios__2A586E0BBDF4E5B3",
        unique: true,
        fields: [
          { name: "correo" },
        ]
      },
      {
        name: "UQ__usuarios__D4D22D741047A618",
        unique: true,
        fields: [
          { name: "nombre_usuario" },
        ]
      },
    ]
  });
  }
}
