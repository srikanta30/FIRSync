const db = require("../../models");
const constants = require("../../constants/constants");

createReport = async function (body) {
  try {
    return await db[constants.DB.table.FIR_MASTER].create(body);
  } catch (err) {
    throw new Error(err);
  }
};

updateReport = async function (obj, query) {
  try {
    return await db[constants.DB.table.FIR_MASTER].update(obj, {
      where: query,
    });
  } catch (err) {
    throw new Error(err);
  }
};

getReportById = async function (id) {
  try {
    return await db[constants.DB.table.FIR_MASTER].findOne({
      where: { id },
    });
  } catch (err) {
    throw new Error(err);
  }
};

getAllReports = async function (query) {
    return await db[constants.DB.table.FIR_MASTER].findAndCountAll(query);
};

module.exports = {
  createReport,
  updateReport,
  getReportById,
  getAllReports
};
