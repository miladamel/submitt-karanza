const Joi = require("joi");

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .email()
      .replace(/\s/g, "")
      .trim()
      .required()
      .label("Email"),
    number: Joi.string().replace(/\s/g, "").trim().required().label("Number"),
  });
  return schema.validate(data);
};

module.exports = { validate };
