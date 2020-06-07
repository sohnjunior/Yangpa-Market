var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();
const passport = require('passport');

const { User } = require('../models');

require("dotenv").config();

const { verifyToken, tokenLimiter, destroyToken } = require("./middlewares");//Limiter from middleware.js

//Create new User to Table 'yangpa.user'
const createUser = async({ email, password, nickname, admin}) => {
  return await User.create({ email, password, nickname, admin});
};

const updateUser = async ({ email, password, nickname }) => {
  return await User.update({ password, nickname }, { where : email });
};
//Get All user from table
const getAllUser = async()=>{
  return await User.findAll();
}

//Get User matched
const getUser = async obj => {
  return await User.findOne({
    where:obj,
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
router.post('/register',async function(req,res,next){
  //필수 값들만 임시로 넣은상태, 나머지도 추가하면됨
  const { email, password, nickname ,admin } = req.body;
  try {
    const exUser = await getUser( email );
    if(exUser){             
      req.flash('registerError','이미 가입된 이메일');
      return res.redirect('/register');
    }
  }
  catch(error){
    console.error(error);
    return next(error);
  } 
  createUser({ email, password, nickname, admin }).then((user) =>
    res.json({ user, msg: "account created successfully" })
  );
});

//Login
router.post('/login',tokenLimiter, async function(req,res,next){  
  passport.authenticate('local',(authError,user,info)=>{
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      req.flash('loginError',info.message);
      return res.redirect('/');
    }
    return req.login(user,{ session : false }, (loginError)=>{
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      const body = { id : user.id, email : user.email };
      const token = jwt.sign({ user : body }, process.env.JWT_SECRET);
      
      res.json({ msg: "ok", token: token });
      return res.redirect('/');
    });
    (req,res,next);
  });

  /* without passport..
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
  }*/
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

router.post("/logout", destroyToken, (req, res) => {
  res.json(req.decoded);
  return res.redirect('/');
});

module.exports = router;
