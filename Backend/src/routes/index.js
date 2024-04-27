const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const paymentRouter = require("./payment.js");
const middleware = require("../utils/middleware.js");
const initWebRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/payment", paymentRouter);
  return app.use("/", router);
};

module.exports = initWebRoutes;
