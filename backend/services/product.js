const { Product, Category, User, Post } = require('../models');
const fs = require('fs');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const createProduct = async (email, category, title, body, price, filename) => {
  // user, category 찾기
  const targetUser = await User.findOne({ where: { email: email } });
  const targetCategory = await Category.findOne({
    where: { title: category },
  });

  // post 생성 (주문번호를 현재 시간을 통해 생성한다)
  const post = await Post.create({
    title: String(Date.now()),
    body: body,
    userId: targetUser.id,
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

const updateProductInfo = async (productId, title, price, body) => {
  const postTitle = productId;
  const productData = {
    title: title,
    price: price,
  };
  const postData = {
    body: body,
  };

  // 본문 게시글 변경
  await Post.update(postData, { where: { title: postTitle } });

  // 상품 정보 변경
  const post = await Post.findOne({ where: { title: postTitle } });
  await Product.update(productData, { where: { postId: post.id } });
};

const deleteProduct = async (productID) => {
  const post = await Post.findOne({ where: { title: productID } });
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
    const imagePath = post.product.dataValues.image;
    const data = fs.readFileSync('public/images/product/' + imagePath);
    let base64 = Buffer.from(data).toString('base64');
    base64 = `data:image/png;base64,${base64}`;
    post.product.dataValues.image = base64;
  });

  return posts;
};

const getProduct = async (orderHash) => {
  let post = await Post.findOne({
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

  let currentHit = post.hit;

  // 이미지 파일을 읽어 바이너리 형태로 전송해줌
  const imagePath = post.product.dataValues.image;
  const data = fs.readFileSync('public/images/product/' + imagePath);
  let base64 = Buffer.from(data).toString('base64');
  base64 = `data:image/png;base64,${base64}`;
  post.product.dataValues.image = base64;
  post.hit = currentHit + 1;

  // 조회수 증가
  await Post.update({ hit: currentHit + 1 }, { where: { title: post.title } });

  return post;
};

const searchProductsWithKeyword = async (keywords) => {
  const idLog = []; // 중복된 상품 검색 방지
  const resultArr = [];
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
      if (!idLog.includes(product.dataValues.id)) {
        idLog.push(product.dataValues.id);
        resultArr.push(product);
      }
    }
  }

  // 이미지 파일을 읽어 바이너리 형태로 전송해줌
  resultArr.forEach((result) => {
    const imagePath = result.dataValues.image;
    const data = fs.readFileSync('public/images/product/' + imagePath);
    let base64 = Buffer.from(data).toString('base64');
    base64 = `data:image/png;base64,${base64}`;
    result.dataValues.image = base64;
  });

  return resultArr;
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
