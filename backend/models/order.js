// 구매 내역
module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "order",
    {
      code: {
        type: Datatypes.STRING(100),
        allowNull: false,
      },
      approve: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      phone: {
        type: Datatypes.STRING(50),
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
