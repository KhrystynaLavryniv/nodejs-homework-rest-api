const { User } = require("../../models");
const createError = require("http-errors");

const subscriptionUpdate = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw createError(404, `User with id=${_id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: {
        email,
        subscription,
      },
    },
  });
};

module.exports = subscriptionUpdate;
