const path = require("path");

const getDotEnvPath = require("./env");

require("dotenv").config({ path: path.resolve(getDotEnvPath(process.env.NODE_ENV)) })

module.exports = {
  browser: process.env.BROWSER,
  mode: process.env.NODE_ENV === "dev" ? "dev" : "qa",
}