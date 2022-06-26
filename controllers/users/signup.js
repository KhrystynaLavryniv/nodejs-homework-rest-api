const { User } = require("../../models");
// const { Conflict } = require("http-errors");
const createError = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendEmail = require("../../services/emailService");

const signup = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    //   throw new Conflict("Email in use");
    throw new createError.Conflict("Email in use");
  }
  const verificationToken = v4();
  const avatarURL = gravatar.url(email);

  const newUser = await new User({
    email,
    password,
    subscription,
    avatarURL,
    verificationToken,
  });

  newUser.setPassword(password);
  await newUser.save();
  // const link = `http://localhost:3000/api/users/verify/:${verificationToken},`;

  const confirmEmail = {
    to: email,
    subject: "Confirm email",
    html: `<p>Follow the link to confirm your email - localhost:3000/api/users/verify/${verificationToken}</p>`,
  };

  await sendEmail(confirmEmail);

  return res.status(201).json({
    data: {
      user: { email, subscription, avatarURL, verificationToken },
    },
  });
};
module.exports = signup;
