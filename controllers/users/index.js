const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const subscriptionUpdate = require("./subscriptionUpdate");
const avatarsUpdate = require("./avatarsUpdate");
const veryfyEmail = require("./veryfyEmail");
const resendEmail = require("./resendEmail");

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  subscriptionUpdate,
  avatarsUpdate,
  veryfyEmail,
  resendEmail,
};
