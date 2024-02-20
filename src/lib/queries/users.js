const db = require("../../models");
const constants = require("../../constants/constants");

createUser = async function (body) {
  try {
    return await db[constants.DB.table.USER_MASTER].create(body);
  } catch (err) {
    throw new Error(err);
  }
};

updateUser = async function (obj, query) {
  try {
    return await db[constants.DB.table.USER_MASTER].update(obj, {
      where: query,
    });
  } catch (err) {
    throw new Error(err);
  }
};

getUserByEmail = async function (email) {
  try {
    return await db[constants.DB.table.USER_MASTER].findOne({
      where: { email },
    });
  } catch (err) {
    throw new Error(err);
  }
};

countUserByEmail = async function (email) {
  try {
    return await db[constants.DB.table.USER_MASTER].findAndCountAll({
      where: { email },
      limit: 1,
    });
  } catch (err) {
    throw new Error(err);
  }
};

createOtp = async function (body) {
  try {
    return await db[constants.DB.table.OTP_MASTER].create(body);
  } catch (err) {
    throw new Error(err);
  }
};

getOtpByEmail = async function (email) {
  try {
    return await db[constants.DB.table.OTP_MASTER].findOne({
      where: {
        email,
      },
      order: [["createdAt", "DESC"]],
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserByEmail,
  countUserByEmail,
  createOtp,
  getOtpByEmail
};
