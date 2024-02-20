const response = require("../lib/response");
const constant = require("../constants/constants");
const links = require("../constants/links");
const axios = require("axios");
const { validationResult } = require("express-validator");
const fs = require("fs");
const util = require("util");
const db = require("../models");
const sequelize = db.sequelize;
const unlinkFile = util.promisify(fs.unlink);
const utils = require("../lib/utils");
const queryReports = require("../lib/queries/reports");
const logger = require("../lib/logger");
const { generateJSON, generateIpcAndTags } = require("../lib/vertexai");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPaginatedData = (data, page, limit) => {
  const { count: totalItems, rows: reports } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, reports };
};

exports.findAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    let reports = await queryReports.getAllReports({
      where: {},
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
    });

    const result = getPaginatedData(reports, page, limit);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      result,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }
    let reports = await queryReports.getReportById(id);

    if (!reports) {
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        `Cannot find FIR with id=${id}.`,
        null,
        res
      );
    } else {
      return response.sendResponse(
        constant.response_code.SUCCESS,
        "FIR found successfully.",
        reports,
        res
      );
    }
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error finding FIR with id=" + id,
      null,
      res,
      err
    );
  }
};

exports.createReport = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const {
      action_taken_description,
      action_taken_section,
      address,
      date_of_action_taken,
      date_of_birth,
      details_of_properties_stolen_involved,
      diary_reference_entry_no,
      father_or_husband_name,
      gd_no,
      information_received_date,
      inquest_report_ud_case_no,
      investigator_name,
      known_suspected_unknown_accused,
      name,
      nationality,
      occurrence_of_offence_day,
      other_acts_sections,
      place_of_occurrence_direction_distance,
      reasons_for_delay_in_reporting,
      sections,
      time_of_occurrence,
      total_value_of_properties,
      type_of_information,
    } = req.body;

    let data = await queryReports.createReport({
      action_taken_description,
      action_taken_section,
      address,
      date_of_action_taken,
      date_of_birth,
      details_of_properties_stolen_involved,
      diary_reference_entry_no,
      father_or_husband_name,
      gd_no,
      information_received_date,
      inquest_report_ud_case_no,
      investigator_name,
      known_suspected_unknown_accused,
      name,
      nationality,
      occurrence_of_offence_day,
      other_acts_sections,
      place_of_occurrence_direction_distance,
      reasons_for_delay_in_reporting,
      sections,
      time_of_occurrence,
      total_value_of_properties,
      type_of_information,
    });

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "FIR created successfully.",
      data,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error in creating FIR",
      null,
      res,
      err
    );
  }
};

exports.updateReport = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const {
      action_taken_description,
      action_taken_section,
      address,
      date_of_action_taken,
      date_of_birth,
      details_of_properties_stolen_involved,
      diary_reference_entry_no,
      father_or_husband_name,
      gd_no,
      information_received_date,
      inquest_report_ud_case_no,
      investigator_name,
      known_suspected_unknown_accused,
      name,
      nationality,
      occurrence_of_offence_day,
      other_acts_sections,
      place_of_occurrence_direction_distance,
      reasons_for_delay_in_reporting,
      sections,
      time_of_occurrence,
      total_value_of_properties,
      type_of_information,
    } = req.body;
    const { id } = req.params;

    let data = await queryReports.updateReport(
      {
        action_taken_description,
        action_taken_section,
        address,
        date_of_action_taken,
        date_of_birth,
        details_of_properties_stolen_involved,
        diary_reference_entry_no,
        father_or_husband_name,
        gd_no,
        information_received_date,
        inquest_report_ud_case_no,
        investigator_name,
        known_suspected_unknown_accused,
        name,
        nationality,
        occurrence_of_offence_day,
        other_acts_sections,
        place_of_occurrence_direction_distance,
        reasons_for_delay_in_reporting,
        sections,
        time_of_occurrence,
        total_value_of_properties,
        type_of_information,
      },
      { id }
    );

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "FIR updated successfully.",
      data,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error in updating FIR",
      null,
      res,
      err
    );
  }
};

exports.generateReport = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const { text } = req.body;

    const result = await generateJSON(text);
    const output = await result?.response?.text();

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success.",
      output,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Sorry, something went wrong.",
      null,
      res,
      err
    );
  }
};

exports.getIpcRecommendations = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const { text } = req.body;

    const result = await generateIpcAndTags(text);
    const output = await result?.response?.text();

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success.",
      output,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Sorry, something went wrong.",
      null,
      res,
      err
    );
  }
};
