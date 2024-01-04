const express = require("express");
require("dotenv").config();

const categoriesRouter = require("./routes/categoriesRouter");
const difficultiesRouter = require("./routes/difficultiesRouter");
const questionsRouter = require("./routes/questionsRouter");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Mitache!");
});

app.use(categoriesRouter);
app.use(difficultiesRouter);
app.use(questionsRouter);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
