const { check, param, query } = require("express-validator");
const enums = require("../constants/enums");
const Errors = {
  USERS: {
    SIGN_IN: [
      check("email", "email must be a valid email.").notEmpty().isEmail(),
    ],
    VERIFY_OTP: [
      check("email", "email must be a valid email.").notEmpty().isEmail(),
      check("otp", "otp must be integer & present.").notEmpty().isInt(),
    ],
    REGISTER: [
      check("email", "email must be a valid email.").notEmpty().isEmail(),
      check("name", "name must be present.").notEmpty().isString(),
      check("phone", "phone must be valid.").notEmpty().isMobilePhone("en-IN"),
      check("aadhar", "aadhar must be valid.")
        .notEmpty()
        .custom((aadhar) => {
          const regexp = /^\d{12}$/;
          return regexp.test(aadhar);
        }),
    ],
  },
  REPORTS: {
    FIND_ALL: [
      query("page", "page must be a numeric & >= 0.")
        .optional()
        .isNumeric()
        .isInt({ min: 0 }),
      query("size", "size must be a numeric & >= 1.")
        .optional()
        .isNumeric()
        .isInt({ min: 1 }),
    ],
    FIND_ONE: [
      param("id", "id must be present & integer greater than 0")
        .notEmpty()
        .isInt({ min: 0 }),
    ],
    CREATE_REPORT: [
      check("action_taken_description").optional().isString(),
      check("action_taken_section").optional().isString(),
      check("address").optional().isString(),
      check("date_of_action_taken").optional().isString(),
      check("date_of_birth").optional().isString(),
      check("details_of_properties_stolen_involved").optional().isString(),
      check("diary_reference_entry_no").optional().isString(),
      check("father_or_husband_name").optional().isString(),
      check("gd_no").optional().isString(),
      check("information_received_date").optional().isString(),
      check("inquest_report_ud_case_no").optional().isString(),
      check("investigator_name").optional().isString(),
      check("known_suspected_unknown_accused").optional().isString(),
      check("name").optional().isString(),
      check("nationality").optional().isString(),
      check("occurrence_of_offence_day").optional().isString(),
      check("other_acts_sections").optional().isString(),
      check("place_of_occurrence_direction_distance").optional().isString(),
      check("reasons_for_delay_in_reporting").optional().isString(),
      check("sections").optional().isString(),
      check("time_of_occurrence").optional().isString(),
      check("total_value_of_properties").optional().isString(),
      check("type_of_information").optional().isString(),
    ],
    UPDATE_REPORT: [
      param("id", "id must be present & integer greater than 0")
        .notEmpty()
        .isInt({ min: 0 }),
      check("action_taken_description").optional().isString(),
      check("action_taken_section").optional().isString(),
      check("address").optional().isString(),
      check("date_of_action_taken").optional().isString(),
      check("date_of_birth").optional().isString(),
      check("details_of_properties_stolen_involved").optional().isString(),
      check("diary_reference_entry_no").optional().isString(),
      check("father_or_husband_name").optional().isString(),
      check("gd_no").optional().isString(),
      check("information_received_date").optional().isString(),
      check("inquest_report_ud_case_no").optional().isString(),
      check("investigator_name").optional().isString(),
      check("known_suspected_unknown_accused").optional().isString(),
      check("name").optional().isString(),
      check("nationality").optional().isString(),
      check("occurrence_of_offence_day").optional().isString(),
      check("other_acts_sections").optional().isString(),
      check("place_of_occurrence_direction_distance").optional().isString(),
      check("reasons_for_delay_in_reporting").optional().isString(),
      check("sections").optional().isString(),
      check("time_of_occurrence").optional().isString(),
      check("total_value_of_properties").optional().isString(),
      check("type_of_information").optional().isString(),
    ],
    GENERATE_REPORT: [
      check("text").notEmpty().isString(),
    ]
  },
};
module.exports = Errors;
