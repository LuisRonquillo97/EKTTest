const {ResponseCodes} = require("../models/responseCodes");

const responseInterceptor = (req, res, next) => {
  console.log(
    `===  Request type ${req.method} getted to endpoint ${
      req.originalUrl
    } ===\n Body: \n${JSON.stringify(req.body)} `
  );
  const oldSend = res.send;
  res.send = function (oldData) {
    const {
      code = 200,
      statusCode = "GEN-ERR-99",
      message = "Generic Response",
      data = {},
    } = JSON.parse(oldData);
    const newResponse = new ResponseCodes(code, statusCode, message, data);
    res.send = oldSend;
    return res.status(code).json(newResponse);
  };
  next();
};

module.exports = { responseInterceptor };
