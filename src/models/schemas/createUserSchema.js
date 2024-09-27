const { z } = require("zod");

const createUserSchema = z
  .object({
    name: z
      .string()
      .max(40)
      .regex(/^[A-Za-z0-9 ]+$/)
      .min(1),
    firstLastName: z
      .string()
      .max(40)
      .regex(/^[A-Za-z0-9 ]+$/)
      .min(1),
    secondLastName: z.union([
      z
        .string()
        .max(40)
        .regex(/^[A-Za-z0-9 ]+$/),
      z.string().max(0),
      z.null(),
      z.undefined(),
    ]),

    phoneNumber: z.string().max(10).regex(/^\d+$/).min(1),
    email: z.union([
      z.string().email().max(40),
      z.string().max(0),
      z.null(),
      z.undefined(),
    ]),
    username: z
      .string()
      .max(30)
      .regex(/^[A-Za-z0-9 ]+$/)
      .min(1),
    password: z.string().max(20).min(1),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

module.exports = { createUserSchema };
