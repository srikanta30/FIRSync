const response = require("../lib/response");
const constant = require("../constants/constants");
const fs = require("fs");
const upload = require("../middlewares/image");
const Image = upload.single("image");
const util = require("util");
const {detectText} = require("../lib/vertexai");
const unlinkFile = util.promisify(fs.unlink);
require("dotenv").config();

exports.create = (req, res, next) => {
  Image(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return response.sendResponse(
          constant.response_code.BAD_REQUEST,
          "The file size should not exceed 2MB.",
          null,
          res,
          { errors: { err: { msg: "The file size should not exceed 2MB." } } }
        );
      } else if (err) {
        return response.sendResponse(
          constant.response_code.BAD_REQUEST,
          "Non-supporting file types - JPEG, PNG, BMP, and PDF are acceptable.",
          null,
          res,
          {
            errors: {
              err: {
                msg: "Non-supporting file types - JPEG, PNG, BMP, and PDF are acceptable.",
              },
            },
          }
        );
      }
    }
    next();
  });
};

exports.createNext = async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        { errors: { err: { msg: "Please choose file" } } }
      );
    }

    const result = await detectText(file.path, file.mimetype);
    const text = await result?.response?.text();

    await unlinkFile(file.path);
    
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      text,
      res,
      null
    );
  } catch (err) {
    if (file) {
      await unlinkFile(file.path);
    }
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.string_constants.SOME_ERROR_OCCURED,
      null,
      res,
      err
    );
  }
};
