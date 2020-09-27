// 상품 후기글 Scheme
module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "review",
    {
      title: {
        type: Datatypes.STRING(100),
        allowNull: false,
      },
      body: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      image: {
        type: Datatypes.STRING(200),
        allowNull: true,
      },
      rating: {
        type: Datatypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
      hit: {
        type: Datatypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
      like: {
        type: Datatypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
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
