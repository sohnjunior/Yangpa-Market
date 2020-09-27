// 장바구니 Scheme
module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "cart",
    {
      title: {
        type: Datatypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
