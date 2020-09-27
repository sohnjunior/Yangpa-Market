const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            //const result = await bcrypt.compare(password,exUser.password); 'bcrypt' 모듈 설치 불가..왜?

            if (password === User.password) {
              //정상적이라면 if(result)
              done(null, exUser);
            } else {
              done(null, false, { message: "잘못된 비밀번호" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원" });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
