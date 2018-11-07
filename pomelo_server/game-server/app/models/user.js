/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    exp: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'user',
    timestamps: false
  });
};
