const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Manisha@123",
  database: "portfolio"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
    return;
  }

  console.log("✅ MySQL Connected");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql =
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false
      });
    }

    res.json({
      success: true,
      message: "Message saved successfully"
    });
  });
});

app.get("/messages", (req, res) => {
  db.query("SELECT * FROM contacts", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});