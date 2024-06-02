const error = require("../middlewares/error");
const messages = require("../routes/messages");

module.exports = function (app) {
  app.use("/api", messages);
  app.use(error);
};
