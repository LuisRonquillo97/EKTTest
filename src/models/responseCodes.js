class ResponseCodes {
  code;
  statusCode;
  message;
  data;

  constructor(code, statusCode, message, data) {
    this.code = code;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data ?? {};
  }
  // #region OK Responses
  static userCreated(data) {
    return new ResponseCodes(
      201,
      "OK-UC-001",
      "User was created successfully.",
      data
    );
  }
  static loggedIn(data) {
    return new ResponseCodes(
      200,
      "OK-LI-001",
      "the user logged in successfully.",
      data
    );
  }
  static usersGetted(data) {
    return new ResponseCodes(
      200,
      "OK-UC-001",
      "the list of users was obtained correctly",
      data
    );
  }
  static loggedOut(data) {
    return new ResponseCodes(
      200,
      "OK-UC-001",
      "the user was logged out successfully.",
      data
    );
  }
  //#endregion
  //#region Bad responses
  static userCreatedError(data) {
    return new ResponseCodes(
      400,
      "ERR-UC-001",
      "An error occurred while creating the user.",
      data
    );
  }
  static loggedInError(data) {
    return new ResponseCodes(
      400,
      "ERR-LI-001",
      "An error occurred while logging in.",
      data
    );
  }
  static loggedInCredentialsError(data) {
    return new ResponseCodes(
      400,
      "ERR-LI-001",
      "The user or password provided was invalid.",
      data
    );
  }
  static usersGettedError(data) {
    return new ResponseCodes(
      400,
      "ERR-UC-001",
      "an error occurred when obtaining the list of users was obtained correctly.",
      data
    );
  }
  static loggedOutError(data) {
    return new ResponseCodes(
      400,
      "ERR-UC-001",
      "An error occurred while logging out.",
      data
    );
  }
  static middlewareValidationFailed(data) {
    return new ResponseCodes(
      401,
      "ERR-MVF-001",
      "An error occurred while validating the information submitted.",
      data
    );
  }
  static unauthorized(data) {
    return new ResponseCodes(
      401,
      "ERR-BRF-001",
      "You're not authorized to perform this call.",
      data
    );
  }

  static badResponse(data) {
    return new ResponseCodes(
      500,
      "ERR-BRF-001",
      "An unexpected error occurred.",
      data
    );
  }
  // #endregion
}
module.exports = { ResponseCodes };
