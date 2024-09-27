const { ResponseCodes } = require("../models/responseCodes");

// Validation middleware
const validateSchema = (schema) => (req, res, next) => {
  // parse request body
  const { success, error } = schema.safeParse(req.body);

  // handle non-compliant request body
  if (!success) {
    return res.json(
      ResponseCodes.middlewareValidationFailed({
        message: error.errors
          .map((t) => `${t.path[0] ?? ""}: ${t.message}`)
          .join(", "),
      })
    );
  }

  next();
};

module.exports = {
  validateSchema,
};
