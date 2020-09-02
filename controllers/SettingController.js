const Model = require("../shared/TYPES").SETTINGS,
  CRUD = require("../shared/CRUD");

module.exports.createSettings = function (req, res) {
  CRUD.create(req.body, Model, res);
};

module.exports.getSettings = function(req, res) {
    CRUD.getAll(req, Model, res);
}
