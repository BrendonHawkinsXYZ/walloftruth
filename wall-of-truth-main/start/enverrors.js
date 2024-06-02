const winston = require("winston");

module.exports = function () {
  if (process.env.DB_URI === undefined) winston.error("DB is not defined");
};
