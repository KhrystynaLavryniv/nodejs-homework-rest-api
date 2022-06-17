const { User } = require("../../models");
// const { Conflict } = require("http-errors");
const createError = require("http-errors");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    //   throw new Conflict("Email in use");
    throw new createError.Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    email,
    password,
    subscription,
    avatarURL,
  });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    data: {
      user: { email, subscription, avatarURL },
    },
  });
};

module.exports = signup;
