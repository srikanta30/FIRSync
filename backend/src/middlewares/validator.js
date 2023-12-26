const { check, param, query } = require("express-validator");
const enums = require("../constants/enums");
const Errors = {
  USERS: {
    SIGN_IN: [
      check("phone", "phone must be a valid phone number.")
        .notEmpty()
        .isMobilePhone("en-IN"),
    ],
    VERIFY_OTP: [
      check("phone", "phone must be a valid phone number.")
        .notEmpty()
        .isMobilePhone("en-IN"),
      check("otp", "otp must be integer & present.").notEmpty().isInt(),
    ],
    REGISTER: [
      check("phone", "phone must be a valid phone number.")
        .notEmpty()
        .isMobilePhone("en-IN"),
      check("name", "name must be present.").notEmpty().isString(),
    ],
  },
};
module.exports = Errors;
