const constants = require("../constants/constants");
const sequelize = require("sequelize");

module.exports = {
  getCurrentTimeStamp() {
    return sequelize.fn("NOW");
  },

  isValidObject(obj) {
    if (Array.isArray(obj) && obj.length > constants.INDEX_ZERO) {
      return true;
    }
    if (obj === undefined) {
      return false;
    }
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
  },

  generateOtp() {
    return parseInt(
      Math.floor(
        constants.OTP_LENGTH + Math.random() * constants.RANDOM_MULTIPLIER
      )
    );
  },
  mobileNoFetch(mobileNo) {
    return mobileNo.slice(mobileNo.length - 10);
  },
  generateErrorMessage(err) {
    var finaError = [];
    if (err) {
      for (field in err.errors) {
        if (!finaError.includes(err.errors[field].msg)) {
          finaError.push(err.errors[field].msg);
        }
      }
    }

    return finaError.join("\n");
  },
  generateEmailOptions(email, otp) {
    return {
      from: "HACKATHON@RAJPOLICE.GOV.IN",
      to: email,
      subject: "Rajasthan Police | OTP to Verify Email",
      message: `Your OTP is: ${otp}`,
    };
  },
};
