const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const reports = sequelize.define(
    constant.DB.table.FIR_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      action_taken_description: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      action_taken_section: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      address: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      date_of_action_taken: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      date_of_birth: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      details_of_properties_stolen_involved: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      diary_reference_entry_no: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      father_or_husband_name: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      gd_no: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      information_received_date: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      inquest_report_ud_case_no: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      investigator_name: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      known_suspected_unknown_accused: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      name: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      nationality: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      occurrence_of_offence_day: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      other_acts_sections: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      place_of_occurrence_direction_distance: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      reasons_for_delay_in_reporting: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      sections: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      time_of_occurrence: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      total_value_of_properties: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      type_of_information: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
      updatedAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
    },
    {
      hooks: {
        beforeCreate: (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeUpdate: (record, options) => {
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeBulkUpdate: (record, options) => {
          record.attributes.updatedAt = Math.floor(Date.now());
        },
        beforeBulkCreate: (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
      },
    }
  );

  return reports;
};
