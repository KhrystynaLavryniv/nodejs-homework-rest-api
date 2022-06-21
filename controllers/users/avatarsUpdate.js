const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatartsDir = path.join(__dirname, "../../", "public", "avatars");

const avatarsUpdate = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const imageName = `${_id}${originalname}`;

  try {
    await Jimp.read(tempUpload).then((image) => {
      return image.resize(250, 250).write(tempUpload);
    });
    const resultUpload = path.join(avatartsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", originalname);

    await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: avatarURL },
      { new: true }
    );
    res.json({ avatarURL: avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = avatarsUpdate;
