const { Router } = require("express");
const { UserController } = require("../controllers/userController");
const {
  validateSchema,
} = require("../middlewares/zodSchemaValidationMiddleware");
const { logInSchema } = require("../models/schemas/loginSchema");
const { createUserSchema } = require("../models/schemas/createUserSchema");
const { requireJwtMiddleware } = require("../middlewares/requireJwtMiddleware");

const userRouter = Router();
const ticketController = new UserController();

userRouter.post(
  "/create",
  validateSchema(createUserSchema),
  ticketController.createUser
);
userRouter.post("/login", validateSchema(logInSchema), ticketController.logIn);
userRouter.post("/logout", requireJwtMiddleware, ticketController.logOut);
userRouter.post("/getAll", requireJwtMiddleware, ticketController.getUsers);

module.exports = { userRouter };
