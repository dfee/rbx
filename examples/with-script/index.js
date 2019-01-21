const path = require("path");

const express = require("express");
const app = express();
const port = 3000;

const serveScript = (app, relpath, publicName = undefined) => {
  const abspath = path.resolve(relpath);
  const filename = path.basename(abspath);
  app.get(`/scripts/${publicName || filename}`, (req, res) =>
    res.sendFile(abspath),
  );
};

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.use("/dist", express.static("../../dist"));
app.use("/public", express.static("./src"));

serveScript(app, "./node_modules/react/umd/react.development.js");
serveScript(app, "./node_modules/react-dom/umd/react-dom.development.js");
serveScript(app, "./node_modules/classnames/index.js", "classnames.js");
serveScript(app, "./node_modules/prop-types/prop-types.min.js");

app.listen(port, () => console.log(`listening on port ${port}!`));
