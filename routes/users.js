const router = require("express").Router();
const { number } = require("joi");
const { db } = require("../db");
const { validate } = require("../models/user");

router.post("/", async (req, response) => {

  const handleNumber = () => {
    var persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ],
      fixNumbers = function (str) {
        if (typeof str === "string") {
          for (let i = 0; i < 10; i++) {
            str = str.replace(persianNumbers[i], i);
          }
        }
        return str;
      };
    var mystr = req.body.number;
    numValue = fixNumbers(mystr);
    return numValue;
  };

  const number = handleNumber();
  console.log(number);
  const { firstName, lastName, email } = req.body;

  const { error } = validate(req.body);
  if (error)
    return response.status(400).send({ message: error.details[0].message });

  db.query(
    "SELECT * FROM User WHERE phno =? OR email =?",
    [number, email],
    (error, rows, res) => {
      if (res) {
        if (rows.length > 0) {
          if (rows[0].phno == number) {
            response.status(404).send({ message: "number exist" });
          } else if (rows[0].email == email) {
            response.status(404).send({ message: "mail exist" });
          }
        } else {
          db.query(
            "INSERT INTO User (first, last, phno, email)  VALUES (?)",
            [[firstName, lastName, number, email]],
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                response.status(200).send({ message: "Succesfull" });
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
