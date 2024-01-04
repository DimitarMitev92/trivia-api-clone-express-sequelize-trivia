const express = require("express");
const difficultiesRouter = express.Router();
const difficultiesController = require("../controllers/difficultiesController");

difficultiesRouter.get(
  "/difficulties",
  difficultiesController.getAllDifficulties
);

module.exports = difficultiesRouter;
