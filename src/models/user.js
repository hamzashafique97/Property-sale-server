const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userType: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const validateSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  userType: Joi.string().required(),
  password: Joi.string().required(),
  isActive: Joi.boolean().default(true),
}).options({ allowUnknown: true });
const User = mongoose.model("user", userSchema);

module.exports = { User, validateSchema };
