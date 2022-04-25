const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error, result) => {
  if (error) {
    console.log("mysql connection failed");
  } else {
    console.log("mysql connected");
  }
});

module.exports = {
  db,
};
