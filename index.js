const express = require("express");
require("dotenv").config();
const { db } = require("./db/index");

const categoriesRouter = require("./routes/categoriesRouter");
const difficultiesRouter = require("./routes/difficultiesRouter");
const questionsRouter = require("./routes/questionsRouter");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello Mitak!" });
});

app.use(categoriesRouter);
app.use(difficultiesRouter);
app.use(questionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
