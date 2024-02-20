var router = require("express").Router();
const ocr = require("../../controllers/ocr");
const authorization = require("../../middlewares/authorization");
const errors = require("../../middlewares/validator");

router.post("/ocr/upload", authorization, ocr.create);
router.post("/ocr/upload", authorization, ocr.createNext);

module.exports = router;