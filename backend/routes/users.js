var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();
const passport = require('passport');

const { User } = require('../models');

require("dotenv").config();

const { verifyToken, tokenLimiter, destroyToken } = require("./middlewares");//Limiter from middleware.js

//Create new User to Table 'yangpa.user'
const createUser = async ({ email, password, nickname, phone, sex, birthday, admin}) => {
  return await User.create({ email, password, nickname, phone, sex, birthday, admin});
};

const updateUser = async ({ email, password, nickname, phone, sex, birthday }) => {
  return await User.update({ email, password, nickname, phone, sex, birthday }, { where : email });
};
//Get All user from table
const getAllUser = async()=>{
  return await User.findAll();
}

const getUser = async obj => {
  return await User.findOne({
    where: obj,
  });
};

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Get all user
router.get('/users' ,function(req,res,next){
  getAllUser().then(user => res.json(user));
});

//Register new User. Create new User by 'createUser'
router.post('/register', async function(req,res,next){
  const { email, password, nickname , phone, sex, birthday, admin } = req.body;
  console.log(req.body.email);
  console.log('====');
  console.log(email);

  let exUser = await User.findOne({ where: {email: email} });
  if(exUser){
    console.log('존재하는 이메일');
    return res.redirect('/');  // <-- 에러 코드 반환하는 거로 수정
  }

  await createUser({ email, password, nickname, phone, sex, birthday, admin }).then((user) =>
    res.json({ user, msg: "account created successfully" })
  );
});

//Login
router.post('/login',tokenLimiter, async function(req,res,next){  
  const{ email, password } = req.body;
  if(email && password){ // If request's email and password is exist...
    let user = await getUser({email}); // Get User by email
    if(!user){
      res.status(401).json({msg : "No User found", user});
      return res.redirect('/login'); //되돌아갈 페이지
    }

    if(user.password === password){ // If request's email and password is correct...
      let payload = { id : user.id };
      let token = jwt.sign(payload,process.env.JWT_SECRET);
      
      res.json({msg:'ok',token : token});
    }
    else{
      res.status(401).json({ msg: "Password is incorrect" });
      return res.redirect('/login'); //되돌아갈 페이지
    }
  }
});

router.get("/protected", verifyToken, (req, res) => {
  res.json(req.decoded);
});

router.post("/update",verifyToken, async function(req,res,next){
  //필수 값들만 임시로 넣은상태, 나머지도 추가하면됨
  const { email, password, nickname } = req.body;
  
  updateUser({ email, password, nickname }).then((user) =>
    res.json({ user, msg: "account created successfully" })
  );  
})

router.get("/logout", destroyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
