// 댓글 Scheme (비밀 댓글 지원)
module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    "comment",
    {
      comment: {
        type: Datatypes.STRING(200),
        allowNull: false,
      },
      secret: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
