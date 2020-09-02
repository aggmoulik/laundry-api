const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/SettingController");

router.get("/", (req, res) => controller.getSettings(req, res));

router.post("/", (req, res) => controller.createSettings(req, res));

module.exports = router;
