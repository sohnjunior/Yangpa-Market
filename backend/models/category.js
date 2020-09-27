module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "category",
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
