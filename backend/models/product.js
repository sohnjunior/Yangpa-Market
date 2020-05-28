// 상품 Scheme
module.exports = (sequelize, Datatypes) => {
  return sequelize.define('product', {
    title: {
      type: Datatypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: Datatypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    seller: {
      type: Datatypes.STRING(100),
      allowNull: false,
    },
    sold: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    like: {
      type: Datatypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: Datatypes.STRING(150),
      allowNull: true,
    }
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
};