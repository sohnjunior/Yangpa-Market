// 유저 Scheme
module.exports = (sequelize, Datatypes) => {
  return sequelize.define('user', {
    email: {
      type: Datatypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Datatypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: Datatypes.STRING(30),
      allowNull: false,
    },
    phone: {
      type: Datatypes.STRING(30),
      allowNull: true,
    },
    sex: {
      type: Datatypes.STRING(10),
      allowNull: true,
    },
    birthday: {
      type: Datatypes.DATE,
      allowNull: true,
    },
    admin: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
};