const { User } = require("../../models");
const { sendEmail } = require("../../services/emailService");
const createError = require("http-errors");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const { verificationToken } = req.params;
  // const link = `http://localhost:3000/api/users/verify/:${verificationToken},`;

  const user = await User.findOne({ email });
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const confirmEmail = {
    to: email,
    subject: "Confirm email",
    html: `<p>Follow the link to confirm your email - localhost:3000/api/users/verify/${verificationToken}</p>`,
  };

  await sendEmail(confirmEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
