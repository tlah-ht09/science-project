const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  charset: "utf8mb4",
});

conn.connect((err) => {
  if (err) {
    console.error("❌ MySQL 연결 실패:", err.message);
    return;
  }
  conn.query("SET NAMES utf8mb4", (err) => {
    if (err) console.error("❌ SET NAMES utf8mb4 실패:", err);
    else console.log("✅ SET NAMES utf8mb4 적용 완료");
  });
  console.log("✅ MySQL 연결 성공!");
});

module.exports = conn;
