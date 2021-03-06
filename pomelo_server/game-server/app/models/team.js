/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('team', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    tableName: 'team',
    timestamps: false
  });
};
