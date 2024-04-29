const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const paymentRouter = require("./payment.js");
const lessonRoute = require("./lessonRoute.js");
const initWebRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/payment", paymentRouter);
  app.use("/api/lesson", lessonRoute);
  return app.use("/", router);
};

module.exports = initWebRoutes;
