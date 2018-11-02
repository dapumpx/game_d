/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guaji', {
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    start_time: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    stage_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    chapter_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'guaji',
    timestamps: false
  });
};
