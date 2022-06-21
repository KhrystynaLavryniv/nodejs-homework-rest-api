const { User } = require("../../models");
// const { Unauthorized } = require("http-errors");
const createError = require("http-errors");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    // throw new Unauthorized("Email or password is wrong");
    throw createError(404, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;