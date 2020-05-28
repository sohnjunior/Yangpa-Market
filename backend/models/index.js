const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델 정의
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Cart = require('./cart')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);

// User와 Post의 1:N 관계
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

// User와 Review의 1:N 관계
db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

// User와 Comment의 1:N 관계
db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

// User와 Order의 1:N 관계
db.User.hasMany(db.Order);
db.Order.belongsTo(db.User);

// Post와 Comment의 1:N 관계
db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);

// Product와 Category의 1:N 관계
db.Category.hasMany(db.Product);
db.Product.belongsTo(db.Category);

// Product와 Order의 1:1 관계
db.Order.hasOne(db.Product);
db.Product.belongsTo(db.Order);

// Post와 Product의 1:1 관계
db.Post.hasOne(db.Product);
db.Product.belongsTo(db.Post);

// Cart와 User의 1:1 관계
db.User.hasOne(db.Cart);
db.Cart.belongsTo(db.User);

// Cart와 Product의 N:M 관계
db.Cart.belongsToMany(db.Product, { through: 'CartProduct' });
db.Product.belongsToMany(db.Cart, { through: 'CartProduct' });


module.exports = db;
