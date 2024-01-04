const express = require("express");
const categoriesRouter = express.Router();
const categoriesController = require("../controllers/categoriesController");

categoriesRouter.get("/categories", categoriesController.getAllCategories);

module.exports = categoriesRouter;
