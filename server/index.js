require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const conn = require("./mysql.js");

const app = express();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      console.log(file),
        fs.existsSync("./uploads/") ||
          fs.mkdirSync("./uploads/", { recursive: !0 }),
        callback(null, "./uploads/");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  }),
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set("port", process.env.PORT); // 포트
app.set("host", process.env.HOST); // 아이피

app.get("/api/hello", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded!");
});

app.get("/api/users", (req, res) => {
  conn.query("select * from user;", (err, rows) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: rows });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server on ${process.env.PORT}`);
});
