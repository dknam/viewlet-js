
const express = require("express");
const app = express();
const port = 30002;
const path = require("path");

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/static", express.static("./public"));
app.use("/packages", express.static("./packages"));

app.listen(port, () => {
    console.log("start test sever - ", `http://localhost:${port}`);
});