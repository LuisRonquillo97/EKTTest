const { request, response } = require("express");
const prisma = require("../../client");
const { ResponseCodes } = require("../models/responseCodes");
const { encodeSession } = require("../services/jwtService");

class UserController {
  // Creating a user
  async createUser(req = request, res = response) {
    try {
      const previousUsers = await prisma.users.findFirst({
        where: {
          OR: [
            { phoneNumber: req.body.phoneNumber },
            { username: req.body.username },
          ],
        },
      });
      if (previousUsers != null) {
        res.json(
          ResponseCodes.userCreatedError(
            `You cannot create multiple users with the same phone number or username.`
          )
        );
        return;
      }
      const user = await prisma.users.create({
        data: req.body,
      });
      res.json(ResponseCodes.userCreated(user));
      return;
    } catch (error) {
      console.log(error);
      res.json(ResponseCodes.userCreatedError(error.message ?? error));
      return;
    }
  }
  async logIn(req = request, res = response) {
    const body = req.body;
    const user = await prisma.users.findFirst({
      where: {
        OR: [{ username: body.username }, { phoneNumber: body.username }],
        password: body.password,
      },
    });
    if (user != null) {
      const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";
      let date = new Date();

      const session = encodeSession(SECRET_KEY, {
        id: user.id,
        username: body.username,
        dateCreated: date.valueOf(),
      });
      res.json(
        ResponseCodes.loggedIn({
          user: user,
          session: session,
        })
      );
      return;
    }
  }
  async getUsers(req = request, res = response) {
    const users = await prisma.users.findMany();
    res.json({
      message: "Users Retrieved",
      data: users,
    });
    return;
  }
  async logOut(req = request, res = response) {
    const token = req.header("x-token") ?? "";
    await prisma.blackListToken.create({
      data: {
        token: token,
      },
    });
    res.json({
      message: "Logout Successful",
    });
    return;
  }
}

module.exports = { UserController };
