const {
  decodeSession,
  checkExpirationStatus,
} = require("../services/jwtService");
const { ResponseCodes } = require("../models/responseCodes");
const prisma = require("../../client");

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";
/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
async function requireJwtMiddleware(req, res, next) {
  const requestHeader = "x-token";
  const header = req.header(requestHeader);
  if (!header) {
    ResponseCodes.middlewareValidationFailed(
      `Required ${requestHeader} header not found.`
    );
    return;
  }
  const token = req.header("x-token") ?? "";
  if (token.length <= 0) {
    res.json(ResponseCodes.loggedOutError(`The x-token doesn't exists.`));
    return;
  }
  const blacklistedToken = await prisma.blackListToken.findFirst({
    where: { token: token },
  });
  if (blacklistedToken != null) {
    res.json(ResponseCodes.unauthorized({}));
    return;
  }
  const decodedSession = decodeSession(SECRET_KEY, header);

  if (
    decodedSession.type === "integrity-error" ||
    decodedSession.type === "invalid-token"
  ) {
    ResponseCodes.middlewareValidationFailed(
      `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`
    );
    return;
  }

  const expiration = checkExpirationStatus(decodedSession.session);

  if (expiration === "expired") {
    ResponseCodes.middlewareValidationFailed(
      `Authorization token has expired. Please create a new authorization token.`
    );
    return;
  }
  next();
}

module.exports = { requireJwtMiddleware };
