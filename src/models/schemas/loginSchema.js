const { z } = require("zod");
const logInSchema = z
  .object({
    username: z
      .string()
      .max(30)
      .regex(/^[a-zA-Z0-9\s.,'-]*$/),
    password: z.string().max(20),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

module.exports = { logInSchema };
