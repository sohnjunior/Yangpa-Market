const jwt = require('./jwt-strategy');
const local = require('./local-strategy');

module.exports = (passport) => {
  local(passport);
  jwt(passport);
};
