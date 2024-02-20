require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function detectText(path, type) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = `This is an FIR or First Information report at a police station. Extract & translate the text to english if it is in another language.`;

    const imageParts = [fileToGenerativePart(path, type)];

    const result = await model.generateContent([prompt, ...imageParts]);
    return result;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function generateJSON(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `This is an FIR or First Information report at a police station. FIR: ${text}. Your job is to read this and extract the following outputs in JSON format:
    {
      "action_taken_description": "",
      "action_taken_section": "",
      "address": "",
      "date_of_action_taken": "",
      "date_of_birth": "",
      "details_of_properties_stolen_involved": "",
      "diary_reference_entry_no": "",
      "father_or_husband_name": "",
      "gd_no": "",
      "information_received_date": "",
      "inquest_report_ud_case_no": "",
      "investigator_name": "",
      "known_suspected_unknown_accused": "",
      "name": "",
      "nationality": "",
      "occurrence_of_offence_day": "",
      "other_acts_sections": "",
      "place_of_occurrence_direction_distance": "",
      "reasons_for_delay_in_reporting": "",
      "sections": "",
      "time_of_occurrence": "",
      "total_value_of_properties": "",
      "type_of_information": ""
  }`;

    const result = await model.generateContent(prompt);
    return result;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function generateIpcAndTags(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `This is an FIR or First Information report at a police station. FIR: ${text}. Your job is to read this and recommend the top 3 IPC sections and relevant tags in the following JSON format:
    {
      "ipc_sections" : [],
      "relevant_tags" : []
  }`;

    const result = await model.generateContent(prompt);
    return result;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

module.exports = { detectText, generateJSON, generateIpcAndTags };
