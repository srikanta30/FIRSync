const axios = require("axios");

const getRequest = async function (opts) {
  try {
    const res = await axios.get(opts.uri, {
      headers: { Authorization: opts.header },
      params: opts.qs,
      data: opts.body,
    });
    return res.data;
  } catch (err) {
    let error = JSON.parse(err.response.data);
    error.ishttp = 1;
    throw Error(JSON.stringify(error));
  }
};

const postRequest = async function (opts) {
  try {
    const res = await axios.post(opts.uri, opts.body, {
      headers: { Authorization: opts.header },
      params: opts.qs,
    });
    return { body: res.data, headers: res.headers };
  } catch (err) {
    let error = JSON.parse(err.response.data);
    error.ishttp = 1;
    throw Error(JSON.stringify(error));
  }
};

const putRequest = async function (opts) {
  try {
    const res = await axios.put(opts.uri, opts.body, {
      headers: { Authorization: opts.header },
      params: opts.qs,
    });
    return { body: res.data, headers: res.headers };
  } catch (err) {
    let error = JSON.parse(err.response.data);
    error.ishttp = 1;
    throw Error(JSON.stringify(error));
  }
};

const deleteRequest = async function (opts) {
  try {
    const res = await axios.delete(opts.uri, {
      headers: { Authorization: opts.header },
      params: opts.qs,
      data: opts.body,
    });
    return res.data;
  } catch (err) {
    let error = JSON.parse(err.response.data);
    error.ishttp = 1;
    throw Error(JSON.stringify(error));
  }
};

module.exports = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
