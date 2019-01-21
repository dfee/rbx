const path = require("path");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
// If replicating, you won't need the line below
app.use("/dist", express.static("../../dist"));
app.use("/public", express.static("./public"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
