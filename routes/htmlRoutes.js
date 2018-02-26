// remember we use path to get the right file paths

var path = require("path");

module.exports = function(app) {
  // get route to the survey
  app.get("/survey", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
  app.get("*", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
