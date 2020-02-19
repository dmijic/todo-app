const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const todos = require("./routes/api/todos");

app.use("/api/todos", todos);

const port = process.envPORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
