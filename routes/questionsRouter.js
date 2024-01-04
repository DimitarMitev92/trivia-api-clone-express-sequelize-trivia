const express = require("express");
const questionsRouter = express.Router();
const questionsController = require("../controllers/questionsController");

questionsRouter.get("/questions", questionsController.getAllQuestions);

module.exports = questionsRouter;
