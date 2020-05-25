module.exports = (sequelize, Datatypes) => {
  return sequelize.define('post', {
    title: {
      type: Datatypes.STRING(100),
      allowNull: false,
    },
    body: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
    hit: {
      type: Datatypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
        timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
};