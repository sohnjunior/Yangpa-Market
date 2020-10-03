const { Product, Category, User, Post } = require('../models');
const { readImageToBase64 } = require('./common');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const createProduct = async (
  userID,
  category,
  title,
  body,
  price,
  filename
) => {
  // user, category 찾기
  const targetCategory = await Category.findOne({
    where: { title: category },
  });

  // post 생성 (주문번호를 현재 시간을 통해 생성한다)
  const post = await Post.create({
    title: String(Date.now()),
    body: body,
    userId: userID,
  });

  // product 생성
  await Product.create({
    title: title,
    price: Number(price),
    sold: false,
    image: filename,
    categoryId: targetCategory.id,
    postId: post.id,
  });
};

const updateProductInfo = async (orderHash, title, price, body) => {
  const productData = {
    title: title,
    price: price,
  };
  const postData = {
    body: body,
  };

  // 본문 게시글 변경
  await Post.update(postData, { where: { title: orderHash } });

  // 상품 정보 변경
  const post = await Post.findOne({ where: { title: orderHash } });
  await Product.update(productData, { where: { postId: post.id } });
};

const deleteProduct = async (orderHash) => {
  const post = await Post.findOne({ where: { title: orderHash } });
  await Product.destroy({ where: { postId: post.dataValues.id } });
  await Post.destroy({ where: { id: post.dataValues.id } });
};

const getAllProducts = async () => {
  const posts = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['email', 'nickname'],
      },
      {
        model: Product,
        attributes: ['title', 'image', 'price', 'like'],
        include: {
          model: Category,
          attributes: ['title'],
        },
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  // 이미지 파일을 읽어 바이너리 형태로 전송해줌
  posts.forEach((post) => {
    const filename = post.product.dataValues.image;
    const base64Encode = readImageToBase64('product', filename);
    post.product.dataValues.image = base64Encode;
  });

  return posts;
};

const getProduct = async (orderHash) => {
  const post = await Post.findOne({
    where: { title: orderHash },
    include: [
      {
        model: User,
        attributes: ['email', 'nickname'],
      },
      {
        model: Product,
        attributes: ['title', 'image', 'price', 'like', 'sold'],
      },
    ],
  });

  // 이미지 파일을 읽어 바이너리 형태로 전송해줌
  const filename = post.product.dataValues.image;
  const base64Encode = readImageToBase64('product', filename);
  post.product.dataValues.image = base64Encode;

  // 조회수 증가
  const currentHit = post.hit;
  await Post.update({ hit: currentHit + 1 }, { where: { title: orderHash } });

  return post;
};

const searchProductsWithKeyword = async (keywords) => {
  const memo = []; // 중복된 상품 검색 방지
  const productData = [];
  for (let keyword of keywords) {
    const result = await Product.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`,
        },
      },
      include: {
        model: Post,
        attributes: ['title', 'hit'],
      },
    });

    for (let product of result) {
      if (!memo.includes(product.dataValues.id)) {
        memo.push(product.dataValues.id);
        productData.push(product);
      }
    }
  }

  // 이미지 파일을 읽어 바이너리 형태로 전송해줌
  productData.forEach((result) => {
    const filename = result.dataValues.image;
    const base64Encode = readImageToBase64('product', filename);
    result.dataValues.image = base64Encode;
  });

  return productData;
};

const increaseLikeOfProduct = async (orderHash) => {
  // 상품 찾기
  const post = await Post.findOne({
    where: { title: orderHash },
  });

  const product = await Product.findOne({
    where: { postId: post.id },
  });

  // like 증가시키기
  await Product.update(
    { like: product.dataValues.like + 1 },
    { where: { postId: post.id } }
  );
};

module.exports = {
  createProduct,
  updateProductInfo,
  deleteProduct,
  getAllProducts,
  getProduct,
  searchProductsWithKeyword,
  increaseLikeOfProduct,
};
