require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const conn = require("./mysql.js");

const app = express();
app.use(cors());
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

//로그인 후 정보 저장
app.post("/api/users", (req, res) => {
  const email = req.body.user_email;
  const name = req.body.user_name;
  if (!email) {
    return res.status(400).json({ message: "email not provided" });
  }
  conn.query(
    "insert ignore into user(email, name) VALUES(?, ?)",
    [email, name],
    (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).json({ message: "db error" });
      }

      if (result.affectedRows === 0) {
        return res.status(409).json({ message: "email already exists" });
      }

      res.json({ message: "success", user_id: result.insertId });
    }
  );
});

//이미지 저장
app.post("/api/users/imgs", (req, res) => {
  const user_id = req.body.user_id;
  const img_path = req.body.img_path;
  if (!user_id) {
    return res.status(400).json({ message: "userId is not exist" });
  }
  conn.query(
    `insert into image(user_id, uploaded_at, image_path) values(${user_id},NOW(),${img_path})`
  );
  res.json({ message: "success", img_path: result.img_path });
});

//생물 이미지를 넣은 유저를 블랙리스트에 추가
app.post("/api/users/blacklist", (req, res) => {
  const { user_email } = req.body.user_email;

  if (!user_email) {
    return res.status(400).json({ message: "user_email is not exist" });
  }

  const sql = `INSERT INTO black_list(user_email, date) VALUES (?, NOW())`;

  conn.query(sql, [user_email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: "blacklisted" });
  });
});

//최근 이미지 불러오기
app.get("/api/users/imgs", (req, res) => {
  const user_id = req.body.user_id;

  if (!user_id) {
    return res.status(400).json({ message: "userId is not exist" });
  }
  conn.query(
    `select image_path from image where user_id = ${user_id} and uploaded_at = (select max(uploaded_at) from image group by user_id);`
  );
});

//이미지 데이터 가져오기

app.post("/api/images/url", async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).send("이미지 주소가 비어있습니다.");
  }
  const response = await fetch(url);
  if (!response.ok) {
    return res.status(500).send("이미지 가져오기 실패");
  }

  const contentType =
    response.headers.get("content-type") || "application/octet-stream";
  const arrayBuffer = await response.arrayBuffer();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", contentType);

  res.send(Buffer.from(arrayBuffer));
});

app.listen(process.env.PORT, () => {
  console.log(`Server on ${process.env.PORT}`);
});
