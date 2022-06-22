const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "khrystynalav@meta.ua",
    pass: META_PASSWORD,
  },
};

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);
  const email = { ...data, from: "khrystynalav@meta.ua" };
  try {
    await transporter.sendMail(email);
    return true;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};

module.exports = sendEmail;
