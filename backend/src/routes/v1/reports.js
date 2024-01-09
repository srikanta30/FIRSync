var router = require("express").Router();
const reports = require("../../controllers/reports");
const authorization = require("../../middlewares/authorization");
const errors = require("../../middlewares/validator");

router.get("/reports", authorization, errors.REPORTS.FIND_ALL, reports.findAll);
router.get("/reports/:id", authorization, errors.REPORTS.FIND_ONE, reports.findOne);
router.post("/reports", authorization, errors.REPORTS.CREATE_REPORT, reports.createReport);
router.patch("/reports/:id", authorization, errors.REPORTS.UPDATE_REPORT, reports.updateReport);

module.exports = router;
