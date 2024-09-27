const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const frameguard = require('frameguard');
const { requireJwtMiddleware } = require('../middlewares/requireJwtMiddleware');
const { userRouter } = require('../routes/userRoute');
const {responseInterceptor} = require('../middlewares/responseInterceptorMiddleware');

class Server {
  constructor() {
    // deepcode ignore UseCsurfForExpress: <This is not a MVC>
    this.app = express();
    this.middlewares();
    this.routes();
    this.srv = serverless(this.app);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    //X-Frame-Options Header es con frameguard.
    this.app.use(frameguard({ action: "deny" }));
    this.app.use(function (req, res, next) {
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("Content-Security-Policy", 'frame-ancestors "none"');
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains;"
      );
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
      res.setHeader("Permissions-Policy", "()");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

      next();
    });
    this.app.use(express.json());
    this.app.use(responseInterceptor);
  }

  routes() {
    const usersRoutePath = "/api/users/";
    this.app.use(usersRoutePath, userRouter);
  }

  returnSrv() {
    return this.srv;
  }

  listen() {
    this.app.listen(3000, () =>
      console.log(`Servidor corriendo en puerto`, 3000)
    );
  }
}

module.exports = Server;